'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const helmet = require('helmet')
const dotenv = require('dotenv')
const bcrypt = require('bcrypt')

const Board = require('./schemas')
const aux = require('./helpers')

dotenv.config()
const app = express()
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: { defaultSrc: ["'self'"], scriptSrc: ["'self'", 'trusted-cdn.com'] },
    },
  })
)
app.use('/public', express.static(process.cwd() + '/public'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//Sample front-end
app.route('/b/:board/').get(function(req, res) {
  res.sendFile(process.cwd() + '/views/board.html')
})

app.route('/b/:board/:thread_id').get(function(req, res) {
  res.sendFile(process.cwd() + '/views/thread.html')
})

//Index page (static HTML)
app.route('/').get(function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html')
})

//Routing for API

app.route(`/api/boards/new-board`).post(async (req, res) => {
  const validity = aux.is_valid_board_input(req.body)

  if (validity.verdict) {
    const board_password = await bcrypt.hash(req.body.board_password, 12)

    const creationTime = new Date()

    const new_board = new Board({
      name: req.body.name,
      board_password,
      created_on: creationTime,
      bumped_on: creationTime,
    })

    const doc = await new_board.save()

    if (doc._id) {
      res.json({
        message: `New board named ${doc.name} has been created successfully`,
        new_board: doc,
      })
    } else {
      res.send(`Creation of new board has failed`)
    }
  } else {
    res.status(400).send(validity.message)
  }
})

app.route(`/api/boards`).get(async (req, res) => {
  let boards = await Board.find()

  for (const board of boards) {
    board.board_password = undefined
  }

  res.json(boards)
})

app
  .route(`/api/boards/:board_id`)
  .post(async (req, res) => {
    const validity = aux.is_valid_thread_input(req.body)

    if (validity.verdict) {
      const board = await Board.findById(req.params.board_id)

      if (board) {
        const thread_password = await bcrypt.hash(req.body.thread_password, 12)
        req.body.thread_password = thread_password

        const thread = { ...req.body }
        const creationTime = new Date()

        thread.created_on = creationTime
        thread.bumped_on = creationTime
        thread.reported = false
        thread.replies = []

        board.threads.push(thread)

        board.bumped_on = new Date()

        const doc = await board.save()

        if (doc._id) {
          res.json({
            message: `New thread named ${req.body.title} has been created successfully`,
            new_thread: doc.threads[doc.threads.length - 1],
          })
        } else {
          res.send(`Creation of new thread at board ${req.params.board_id} has failed`)
        }
      } else {
        res.status(404).send('Board Not Found')
      }
    } else {
      res.status(400).send(validity.message)
    }
  })
  .get(async (req, res) => {
    const board = await Board.findById(req.params.board_id)

    if (board) {
      let threads = []

      for (const thread of board.threads) {
        if (thread._id) {
          thread.thread_password = undefined
          thread.reported = undefined
          threads.push(thread)
        }
      }

      res.json(threads)
    } else {
      res.status(404).send('Board Not Found')
    }
  })
  .delete(async (req, res) => {
    const board = await Board.findById(req.params.board_id)

    if (board) {
      if (req.body.board_password) {
        const match = await bcrypt.compare(req.body.board_password, board.board_password)

        if (match) {
          const result = await Board.findByIdAndDelete(req.params.board_id)

          if (result._id) {
            res.send(`Successfully deleted board ${req.params.board_id}`)
          } else {
            res.send(`Unable to delete board ${req.params.board_id}`)
          }
        } else {
          res.send(`Incorrect board password`)
        }
      } else {
        res.send(`No password provided for deletion of board ${req.params.board_id}`)
      }
    } else {
      res.status(404).send('Board Not Found')
    }
  })

app
  .route(`/api/threads/:board_id`)
  .delete(async (req, res) => {
    const board = await Board.findById(req.params.board_id)

    if (board) {
      const thread = board.threads.id(req.body.thread_id)

      if (thread) {
        const match = await bcrypt.compare(req.body.thread_password, thread.thread_password)

        if (match) {
          board.threads = board.threads.filter(value => value._id != thread._id)

          const result = await board.save()

          if (result._id) {
            res.send(`Successfully deleted thread ${req.body.thread_id}`)
          } else {
            res.send(`Unable to delete thread ${req.body.thread_id}`)
          }
        } else {
          res.send(`Incorrect thread password`)
        }
      } else {
        res.status(404).send('Thread Not Found')
      }
    } else {
      res.status(404).send('Board Not Found')
    }
  })
  .put(async (req, res) => {
    const board = await Board.findById(req.params.board_id)

    if (board) {
      const thread = board.threads.id(req.body.thread_id)

      if (thread) {
        thread.reported = !thread.reported

        const doc = await board.save()

        if (thread.reported) {
          res.send('Thread has been successfully reported')
        } else {
          res.send('Thread has been successfully unreported')
        }
      } else {
        res.status(404).send('Thread Not Found')
      }
    } else {
      res.status(404).send('Board Not Found')
    }
  })

app
  .route(`/api/replies/:board_id`)
  .post(async (req, res) => {
    // console.log(req.params)
    // console.log(req.query)

    const validity = aux.is_valid_reply_input(req.body)

    if (validity.verdict) {
      const board = await Board.findById(req.params.board_id)

      if (board) {
        const thread = board.threads.id(req.query.thread_id)

        if (thread) {
          let reply = { ...req.body }

          const updateTime = new Date()
          reply.created_on = updateTime
          reply.reported = false
          reply.reply_password = await bcrypt.hash(reply.reply_password, 12)

          thread.replies.push(reply)
          thread.bumped_on = updateTime

          const doc = await board.save()

          const updated_thread = doc.threads.id(req.query.thread_id)

          res.json({
            message: `New reply has been created successfully`,
            new_reply: updated_thread.replies[updated_thread.replies.length - 1],
          })
        } else {
          res.status(404).send('Thread Not Found')
        }
      } else {
        res.status(404).send('Board Not Found')
      }
    } else {
      res.status(400).send(validity.message)
    }
  })
  .get(async (req, res) => {
    const board = await Board.findById(req.params.board_id)

    if (board) {
      const thread = board.threads.id(req.query.thread_id)

      if (thread) {
        thread.thread_password = undefined
        thread.reported = undefined

        for (const reply of thread.replies) {
          reply.reply_password = undefined
          reply.reported = undefined
        }

        res.json(thread)
      } else {
        res.status(404).send('Thread Not Found')
      }
    } else {
      res.status(404).send('Board Not Found')
    }
  })
  .put(async (req, res) => {
    const board = await Board.findById(req.params.board_id)

    if (board) {
      const thread = board.threads.id(req.query.thread_id)

      if (thread) {
        const reply = thread.replies.id(req.body.reply_id)

        if (reply) {
          reply.reported = !reply.reported

          const doc = await board.save()

          if (reply.reported) {
            res.send('Reply has been successfully reported')
          } else {
            res.send('Reply has been successfully unreported')
          }
        } else {
          res.status(404).send('Reply Not Found')
        }
      } else {
        res.status(404).send('Thread Not Found')
      }
    } else {
      res.status(404).send('Board Not Found')
    }
  })
  .delete(async (req, res) => {
    const board = await Board.findById(req.params.board_id)

    if (board) {
      let thread = board.threads.id(req.query.thread_id)

      if (thread) {
        const reply = thread.replies.id(req.body.reply_id)

        if (reply) {
          const match = await bcrypt.compare(req.body.reply_password, reply.reply_password)

          if (match) {
            thread.replies = thread.replies.filter(value => value._id != reply._id)

            const result = await board.save()

            if (result._id) {
              res.send(`Successfully deleted reply ${req.body.reply_id}`)
            } else {
              res.send(`Unable to delete reply ${req.boddy.reply_id}`)
            }
          } else {
            res.send(`Incorrect reply password`)
          }
          res.end()
        } else {
          res.status(404).send('Reply Not Found')
        }
      } else {
        res.status(404).send('Thread Not Found')
      }
    } else {
      res.status(404).send('Board Not Found')
    }
  })

//404 Not Found Middleware

app.use(function(req, res, next) {
  res
    .status(404)
    .type('text')
    .send('Route Not Found')
})

//Start our server and tests!
const listener = app.listen(process.env.PORT || 3000, function() {
  console.log(`Listening on port ${listener.address().port}`)
})

module.exports = app //for testing
