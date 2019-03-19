const chaiHttp = require('chai-http')
const chai = require('chai')
const assert = chai.assert
const bcrypt = require('bcrypt')
const server = require('../server')

chai.use(chaiHttp)

const base = new Date().getTime()

let boards = {
  first: {
    seed: {
      name: `test_board#${base}`,
      board_password: `test_board_password#${base}`,
    },
    threads: {
      first: {
        seed: {
          title: `test_thread#${base * 2 + 100}`,
          text: `test_text#${base * 2 + 100}`,
          thread_password: `test_thread_password#${base * 2 + 100}`,
        },
        replies: {
          first: {
            seed: {
              text: `test_reply#${base * 3 + 100}`,
              reply_password: `test_reply_password#${base * 3 + 100}`,
            },
          },
          second: {
            seed: {
              text: `test_reply#${base * 3 + 100}`,
              reply_password: `test_reply_password#${base * 3 + 100}`,
            },
          },
        },
      },
      second: {
        seed: {
          title: `test_thread#${base * 2 + 200}`,
          text: `test_text#${base * 2 + 200}`,
          thread_password: `test_thread_password#${base * 2 + 200}`,
        },
        replies: {
          first: {
            seed: {
              text: `test_reply#${base * 3 + 200}`,
              reply_password: `test_reply_password#${base * 3 + 200}`,
            },
          },
          second: {
            seed: {
              text: `test_reply#${base * 3 + 200}`,
              reply_password: `test_reply_password#${base * 3 + 200}`,
            },
          },
        },
      },
      third: {
        seed: {
          title: `test_thread#${base * 2 + 300}`,
          text: `test_text#${base * 2 + 300}`,
          thread_password: `test_thread_password#${base * 2 + 300}`,
        },
        replies: {
          first: {
            seed: {
              text: `test_reply#${base * 3 + 300}`,
              reply_password: `test_reply_password#${base * 3 + 300}`,
            },
          },
          second: {
            seed: {
              text: `test_reply#${base * 3 + 300}`,
              reply_password: `test_reply_password#${base * 3 + 300}`,
            },
          },
        },
      },
    },
  },
  second: {
    seed: {
      name: `test_board#${base ** (1 / 2)}`,
      board_password: `test_board_password#${base ** (1 / 2)}`,
    },
    threads: {
      first: {
        seed: {
          title: `test_thread#${base ** (1 / 2) * 2 + 100}`,
          text: `test_text#${base ** (1 / 2) * 2 + 100}`,
          thread_password: `test_thread_password#${base ** (1 / 2) * 2 + 100}`,
        },
        replies: {
          first: {
            seed: {
              text: `test_reply#${base ** (1 / 2) * 3 + 100}`,
              reply_password: `test_reply_password#${base ** (1 / 2) * 3 + 100}`,
            },
          },
          second: {
            seed: {
              text: `test_reply#${base ** (1 / 2) * 3 + 100}`,
              reply_password: `test_reply_password#${base ** (1 / 2) * 3 + 100}`,
            },
          },
        },
      },
      second: {
        seed: {
          title: `test_thread#${base ** (1 / 2) * 2 + 200}`,
          text: `test_text#${base ** (1 / 2) * 2 + 200}`,
          thread_password: `test_thread_password#${base ** (1 / 2) * 2 + 200}`,
        },
        replies: {
          first: {
            seed: {
              text: `test_reply#${base ** (1 / 2) * 3 + 200}`,
              reply_password: `test_reply_password#${base ** (1 / 2) * 3 + 100}`,
            },
          },
          second: {
            seed: {
              text: `test_reply#${base ** (1 / 2) * 3 + 200}`,
              reply_password: `test_reply_password#${base ** (1 / 2) * 3 + 100}`,
            },
          },
        },
      },
      third: {
        seed: {
          title: `test_thread#${base ** (1 / 2) * 2 + 300}`,
          text: `test_text#${base ** (1 / 2) * 2 + 300}`,
          thread_password: `test_thread_password#${base ** (1 / 2) * 2 + 300}`,
        },
        replies: {
          first: {
            seed: {
              text: `test_reply#${base ** (1 / 2) * 3 + 300}`,
              reply_password: `test_reply_password#${base ** (1 / 2) * 3 + 100}`,
            },
          },
          second: {
            seed: {
              text: `test_reply#${base ** (1 / 2) * 3 + 300}`,
              reply_password: `test_reply_password#${base ** (1 / 2) * 3 + 100}`,
            },
          },
        },
      },
    },
  },
  third: {
    seed: {
      name: `test_board#${base ** (1 / 3)}`,
      board_password: `test_board_password#${base ** (1 / 3)}`,
    },
    threads: {
      first: {
        seed: {
          title: `test_thread#${base ** (1 / 3) * 2 + 100}`,
          text: `test_text#${base ** (1 / 3) * 2 + 100}`,
          thread_password: `test_thread_password#${base ** (1 / 3) * 2 + 100}`,
        },
        replies: {
          first: {
            seed: {
              text: `test_reply#${base ** (1 / 3) * 3 + 100}`,
              reply_password: `test_reply_password#${base ** (1 / 3) * 3 + 100}`,
            },
          },
          second: {
            seed: {
              text: `test_reply#${base ** (1 / 3) * 3 + 100}`,
              reply_password: `test_reply_password#${base ** (1 / 3) * 3 + 100}`,
            },
          },
        },
      },
      second: {
        seed: {
          title: `test_thread#${base ** (1 / 3) * 2 + 200}`,
          text: `test_text#${base ** (1 / 3) * 2 + 200}`,
          thread_password: `test_thread_password#${base ** (1 / 3) * 2 + 200}`,
        },
        replies: {
          first: {
            seed: {
              text: `test_reply#${base ** (1 / 3) * 3 + 200}`,
              reply_password: `test_reply_password#${base ** (1 / 3) * 3 + 200}`,
            },
          },
          second: {
            seed: {
              text: `test_reply#${base ** (1 / 3) * 3 + 200}`,
              reply_password: `test_reply_password#${base ** (1 / 3) * 3 + 200}`,
            },
          },
        },
      },
      third: {
        seed: {
          title: `test_thread#${base ** (1 / 3) * 2 + 300}`,
          text: `test_text#${base ** (1 / 3) * 2 + 300}`,
          thread_password: `test_thread_password#${base ** (1 / 3) * 2 + 300}`,
        },
        replies: {
          first: {
            seed: {
              text: `test_reply#${base ** (1 / 3) * 3 + 300}`,
              reply_password: `test_reply_password#${base ** (1 / 3) * 3 + 300}`,
            },
          },
          second: {
            seed: {
              text: `test_reply#${base ** (1 / 3) * 3 + 300}`,
              reply_password: `test_reply_password#${base ** (1 / 3) * 3 + 300}`,
            },
          },
        },
      },
    },
  },
}

suite('Functional Tests', function() {
  suite('API ROUTING FOR /api/boards/new-board', function() {
    suite('POST => object with board data', function() {
      test('No board name', function(done) {
        const board_seed = boards.first.seed

        chai
          .request(server)
          .post(`/api/boards/new-board`)
          .send({
            board_password: board_seed.board_password,
          })
          .end(function(err, res) {
            assert.equal(res.status, 400)
            assert.isOk(res.text)
            assert.equal(res.text, 'No name provided for board')
            done()
          })
      })

      test('No board password', function(done) {
        const board_seed = boards.first.seed

        chai
          .request(server)
          .post(`/api/boards/new-board`)
          .send({
            name: board_seed.name,
          })
          .end(function(err, res) {
            assert.equal(res.status, 400)
            assert.isOk(res.text)
            assert.equal(res.text, 'No board_password provided for board')
            done()
          })
      })

      test('Correct input, #1', function(done) {
        const board_seed = boards.first.seed

        chai
          .request(server)
          .post('/api/boards/new-board')
          .send(board_seed)
          .end(function(err, res) {
            assert.equal(res.status, 200)
            assert.isObject(res.body)
            assert.exists(res.body.message)
            assert.typeOf(res.body.message, 'string')
            assert.isOk(res.body.message)
            assert.equal(
              res.body.message,
              `New board named ${board_seed.name} has been created successfully`
            )
            assert.exists(res.body.new_board)
            assert.isObject(res.body.new_board)
            const board = res.body.new_board
            assert.property(board, 'name')
            assert.typeOf(board.name, 'string')
            assert.isOk(board.name)
            assert.equal(board.name, board_seed.name)
            assert.property(board, 'board_password')
            assert.typeOf(board.board_password, 'string')
            assert.isOk(board.board_password)
            const board_password_match = bcrypt.compareSync(
              board_seed.board_password,
              board.board_password
            )
            assert.isTrue(board_password_match)
            assert.property(board, 'threads')
            assert.isArray(board.threads)
            assert.lengthOf(board.threads, 0)
            assert.property(board, '_id')
            assert.typeOf(board._id, 'string')
            assert.isOk(board._id)
            boards.first._id = board._id
            assert.property(board, 'created_on')
            assert.typeOf(board.created_on, 'string')
            assert.isOk(board.created_on)
            assert.isNotNaN(new Date(board.created_on).getTime())
            assert.property(board, 'bumped_on')
            assert.typeOf(board.bumped_on, 'string')
            assert.isOk(board.bumped_on)
            assert.isNotNaN(new Date(board.bumped_on).getTime())
            done()
          })
      })

      test('Correct input, #2', function(done) {
        const board_seed = boards.second.seed

        chai
          .request(server)
          .post('/api/boards/new-board')
          .send(board_seed)
          .end(function(err, res) {
            assert.equal(res.status, 200)
            assert.isObject(res.body)
            assert.exists(res.body.message)
            assert.typeOf(res.body.message, 'string')
            assert.isOk(res.body.message)
            assert.equal(
              res.body.message,
              `New board named ${board_seed.name} has been created successfully`
            )
            assert.exists(res.body.new_board)
            assert.isObject(res.body.new_board)
            const board = res.body.new_board
            assert.property(board, 'name')
            assert.typeOf(board.name, 'string')
            assert.isOk(board.name)
            assert.equal(board.name, board_seed.name)
            assert.property(board, 'board_password')
            assert.typeOf(board.board_password, 'string')
            assert.isOk(board.board_password)
            const board_password_match = bcrypt.compareSync(
              board_seed.board_password,
              board.board_password
            )
            assert.isTrue(board_password_match)
            assert.property(board, 'threads')
            assert.isArray(board.threads)
            assert.lengthOf(board.threads, 0)
            assert.property(board, '_id')
            assert.typeOf(board._id, 'string')
            assert.isOk(board._id)
            boards.second._id = board._id
            assert.property(board, 'created_on')
            assert.typeOf(board.created_on, 'string')
            assert.isOk(board.created_on)
            assert.isNotNaN(new Date(board.created_on).getTime())
            assert.property(board, 'bumped_on')
            assert.typeOf(board.bumped_on, 'string')
            assert.isOk(board.bumped_on)
            assert.isNotNaN(new Date(board.bumped_on).getTime())
            done()
          })
      })

      test('Correct input, #3', function(done) {
        const board_seed = boards.third.seed

        chai
          .request(server)
          .post('/api/boards/new-board')
          .send(board_seed)
          .end(function(err, res) {
            assert.equal(res.status, 200)
            assert.isObject(res.body)
            assert.exists(res.body.message)
            assert.typeOf(res.body.message, 'string')
            assert.isOk(res.body.message)
            assert.equal(
              res.body.message,
              `New board named ${board_seed.name} has been created successfully`
            )
            assert.exists(res.body.new_board)
            assert.isObject(res.body.new_board)
            const board = res.body.new_board
            assert.property(board, 'name')
            assert.typeOf(board.name, 'string')
            assert.isOk(board.name)
            assert.equal(board.name, board_seed.name)
            assert.property(board, 'board_password')
            assert.typeOf(board.board_password, 'string')
            assert.isOk(board.board_password)
            const board_password_match = bcrypt.compareSync(
              board_seed.board_password,
              board.board_password
            )
            assert.isTrue(board_password_match)
            assert.property(board, 'threads')
            assert.isArray(board.threads)
            assert.lengthOf(board.threads, 0)
            assert.property(board, '_id')
            assert.typeOf(board._id, 'string')
            assert.isOk(board._id)
            boards.third._id = board._id
            assert.property(board, 'created_on')
            assert.typeOf(board.created_on, 'string')
            assert.isOk(board.created_on)
            assert.isNotNaN(new Date(board.created_on).getTime())
            assert.property(board, 'bumped_on')
            assert.typeOf(board.bumped_on, 'string')
            assert.isOk(board.bumped_on)
            assert.isNotNaN(new Date(board.bumped_on).getTime())
            done()
          })
      })
    })
  })

  suite('API ROUTING FOR /api/boards/', function() {
    suite('GET => Array of all boards', function() {
      test('No input, all boards returned', function(done) {
        chai
          .request(server)
          .get('/api/boards/')
          .end(function(err, res) {
            assert.equal(res.status, 200)
            assert.isArray(res.body)
            assert.isAtLeast(res.body.length, 2)
            for (const board of res.body) {
              assert.isObject(board)
              assert.property(board, 'name')
              assert.typeOf(board.name, 'string')
              assert.isOk(board.name)
              assert.notProperty(board, 'board_password')
              assert.property(board, 'threads')
              assert.isArray(board.threads)
              assert.lengthOf(board.threads, 0)
              assert.property(board, '_id')
              assert.typeOf(board._id, 'string')
              assert.isOk(board._id)
              assert.property(board, 'created_on')
              assert.typeOf(board.created_on, 'string')
              assert.isOk(board.created_on)
              assert.isNotNaN(new Date(board.created_on).getTime())
              assert.property(board, 'bumped_on')
              assert.typeOf(board.bumped_on, 'string')
              assert.isOk(board.bumped_on)
              assert.isNotNaN(new Date(board.bumped_on).getTime())
            }
            done()
          })
      })
    })
  })

  suite('API ROUTING FOR /api/boards/:board_id/', function() {
    suite('POST => object with thread data', function() {
      test('Inexistent board', function(done) {
        const board_id = '5c8851572b00b54f7ce65187'
        const thread_seed = boards.first.threads.first.seed

        chai
          .request(server)
          .post(`/api/boards/${encodeURIComponent(board_id)}`)
          .send(thread_seed)
          .end(function(err, res) {
            assert.equal(res.status, 404)
            assert.isOk(res.text)
            assert.equal(res.text, 'Board Not Found')
            done()
          })
      })

      test('Existing board, no title', function(done) {
        const board_id = boards.first._id
        const thread_seed = boards.first.threads.first.seed

        chai
          .request(server)
          .post(`/api/boards/${encodeURIComponent(board_id)}`)
          .send({
            text: thread_seed.text,
            thread_password: thread_seed.thread_password,
          })
          .end(function(err, res) {
            assert.equal(res.status, 400)
            assert.isOk(res.text)
            assert.equal(res.text, 'No title provided for thread')
            done()
          })
      })

      test('Existing board, no text', function(done) {
        const board_id = boards.first._id
        const thread_seed = boards.first.threads.first.seed

        chai
          .request(server)
          .post(`/api/boards/${encodeURIComponent(board_id)}`)
          .send({
            title: thread_seed.title,
            thread_password: thread_seed.thread_password,
          })
          .end(function(err, res) {
            assert.equal(res.status, 400)
            assert.isOk(res.text)
            assert.equal(res.text, 'No text provided for thread')
            done()
          })
      })

      test('Existing board, no thread password', function(done) {
        const board_id = boards.first._id
        const thread_seed = boards.first.threads.first.seed

        chai
          .request(server)
          .post(`/api/boards/${encodeURIComponent(board_id)}`)
          .send({
            title: thread_seed.title,
            text: thread_seed.text,
          })
          .end(function(err, res) {
            assert.equal(res.status, 400)
            assert.isOk(res.text)
            assert.equal(res.text, 'No thread_password provided for thread')
            done()
          })
      })

      test('Existing board, valid input, #1', function(done) {
        const board_id = boards.first._id
        const thread_seed = boards.first.threads.first.seed

        chai
          .request(server)
          .post(`/api/boards/${encodeURIComponent(board_id)}`)
          .send(thread_seed)
          .end(function(err, res) {
            assert.equal(res.status, 200)
            assert.isObject(res.body)
            assert.exists(res.body.message)
            assert.typeOf(res.body.message, 'string')
            assert.isOk(res.body.message)
            assert.equal(
              res.body.message,
              `New thread named ${thread_seed.title} has been created successfully`
            )
            assert.exists(res.body.new_thread)
            assert.isObject(res.body.new_thread)
            const thread = res.body.new_thread
            assert.property(thread, 'title')
            assert.typeOf(thread.title, 'string')
            assert.isOk(thread.title)
            assert.equal(thread.title, thread_seed.title)
            assert.property(thread, 'text')
            assert.typeOf(thread.text, 'string')
            assert.isOk(thread.text)
            assert.equal(thread.text, thread_seed.text)
            assert.property(thread, 'thread_password')
            assert.typeOf(thread.thread_password, 'string')
            assert.isOk(thread.thread_password)
            const thread_password_match = bcrypt.compareSync(
              thread_seed.thread_password,
              thread.thread_password
            )
            assert.isTrue(thread_password_match)
            assert.property(thread, '_id')
            assert.typeOf(thread._id, 'string')
            assert.isOk(thread._id)
            boards.first.threads.first._id = thread._id
            assert.property(thread, 'created_on')
            assert.typeOf(thread.created_on, 'string')
            assert.isOk(thread.created_on)
            assert.isNotNaN(new Date(thread.created_on).getTime())
            assert.property(thread, 'bumped_on')
            assert.typeOf(thread.bumped_on, 'string')
            assert.isOk(thread.bumped_on)
            assert.isNotNaN(new Date(thread.bumped_on).getTime())
            assert.property(thread, 'reported')
            assert.typeOf(thread.reported, 'boolean')
            assert.isFalse(thread.reported)
            assert.property(thread, 'replies')
            assert.isArray(thread.replies)
            assert.lengthOf(thread.replies, 0)
            done()
          })
      })

      test('Existing board, valid input, #2', function(done) {
        const board_id = boards.first._id
        const thread_seed = boards.first.threads.second.seed

        chai
          .request(server)
          .post(`/api/boards/${encodeURIComponent(board_id)}`)
          .send(thread_seed)
          .end(function(err, res) {
            assert.equal(res.status, 200)
            assert.isObject(res.body)
            assert.exists(res.body.message)
            assert.typeOf(res.body.message, 'string')
            assert.isOk(res.body.message)
            assert.equal(
              res.body.message,
              `New thread named ${thread_seed.title} has been created successfully`
            )
            assert.exists(res.body.new_thread)
            assert.isObject(res.body.new_thread)
            const thread = res.body.new_thread
            assert.property(thread, 'title')
            assert.typeOf(thread.title, 'string')
            assert.isOk(thread.title)
            assert.equal(thread.title, thread_seed.title)
            assert.property(thread, 'text')
            assert.typeOf(thread.text, 'string')
            assert.isOk(thread.text)
            assert.equal(thread.text, thread_seed.text)
            assert.property(thread, 'thread_password')
            assert.typeOf(thread.thread_password, 'string')
            assert.isOk(thread.thread_password)
            const thread_password_match = bcrypt.compareSync(
              thread_seed.thread_password,
              thread.thread_password
            )
            assert.isTrue(thread_password_match)
            assert.property(thread, '_id')
            assert.typeOf(thread._id, 'string')
            assert.isOk(thread._id)
            boards.first.threads.second._id = thread._id
            assert.property(thread, 'created_on')
            assert.typeOf(thread.created_on, 'string')
            assert.isOk(thread.created_on)
            assert.isNotNaN(new Date(thread.created_on).getTime())
            assert.property(thread, 'bumped_on')
            assert.typeOf(thread.bumped_on, 'string')
            assert.isOk(thread.bumped_on)
            assert.isNotNaN(new Date(thread.bumped_on).getTime())
            assert.property(thread, 'reported')
            assert.typeOf(thread.reported, 'boolean')
            assert.isFalse(thread.reported)
            assert.property(thread, 'replies')
            assert.isArray(thread.replies)
            assert.lengthOf(thread.replies, 0)
            done()
          })
      })

      test('Existing board, valid input, #3', function(done) {
        const board_id = boards.second._id
        const thread_seed = boards.second.threads.first.seed

        chai
          .request(server)
          .post(`/api/boards/${encodeURIComponent(board_id)}`)
          .send(thread_seed)
          .end(function(err, res) {
            assert.equal(res.status, 200)
            assert.isObject(res.body)
            assert.exists(res.body.message)
            assert.typeOf(res.body.message, 'string')
            assert.isOk(res.body.message)
            assert.equal(
              res.body.message,
              `New thread named ${thread_seed.title} has been created successfully`
            )
            assert.exists(res.body.new_thread)
            assert.isObject(res.body.new_thread)
            const thread = res.body.new_thread
            assert.property(thread, 'title')
            assert.typeOf(thread.title, 'string')
            assert.isOk(thread.title)
            assert.equal(thread.title, thread_seed.title)
            assert.property(thread, 'text')
            assert.typeOf(thread.text, 'string')
            assert.isOk(thread.text)
            assert.equal(thread.text, thread_seed.text)
            assert.property(thread, 'thread_password')
            assert.typeOf(thread.thread_password, 'string')
            assert.isOk(thread.thread_password)
            const thread_password_match = bcrypt.compareSync(
              thread_seed.thread_password,
              thread.thread_password
            )
            assert.isTrue(thread_password_match)
            assert.property(thread, '_id')
            assert.typeOf(thread._id, 'string')
            assert.isOk(thread._id)
            boards.second.threads.first._id = thread._id
            assert.property(thread, 'created_on')
            assert.typeOf(thread.created_on, 'string')
            assert.isOk(thread.created_on)
            assert.isNotNaN(new Date(thread.created_on).getTime())
            assert.property(thread, 'bumped_on')
            assert.typeOf(thread.bumped_on, 'string')
            assert.isOk(thread.bumped_on)
            assert.isNotNaN(new Date(thread.bumped_on).getTime())
            assert.property(thread, 'reported')
            assert.typeOf(thread.reported, 'boolean')
            assert.isFalse(thread.reported)
            assert.property(thread, 'replies')
            assert.isArray(thread.replies)
            assert.lengthOf(thread.replies, 0)
            done()
          })
      })

      test('Existing board, valid input, #4', function(done) {
        const board_id = boards.second._id
        const thread_seed = boards.second.threads.second.seed

        chai
          .request(server)
          .post(`/api/boards/${encodeURIComponent(board_id)}`)
          .send(thread_seed)
          .end(function(err, res) {
            assert.equal(res.status, 200)
            assert.isObject(res.body)
            assert.exists(res.body.message)
            assert.typeOf(res.body.message, 'string')
            assert.isOk(res.body.message)
            assert.equal(
              res.body.message,
              `New thread named ${thread_seed.title} has been created successfully`
            )
            assert.exists(res.body.new_thread)
            assert.isObject(res.body.new_thread)
            const thread = res.body.new_thread
            assert.property(thread, 'title')
            assert.typeOf(thread.title, 'string')
            assert.isOk(thread.title)
            assert.equal(thread.title, thread_seed.title)
            assert.property(thread, 'text')
            assert.typeOf(thread.text, 'string')
            assert.isOk(thread.text)
            assert.equal(thread.text, thread_seed.text)
            assert.property(thread, 'thread_password')
            assert.typeOf(thread.thread_password, 'string')
            assert.isOk(thread.thread_password)
            const thread_password_match = bcrypt.compareSync(
              thread_seed.thread_password,
              thread.thread_password
            )
            assert.isTrue(thread_password_match)
            assert.property(thread, '_id')
            assert.typeOf(thread._id, 'string')
            assert.isOk(thread._id)
            boards.second.threads.second._id = thread._id
            assert.property(thread, 'created_on')
            assert.typeOf(thread.created_on, 'string')
            assert.isOk(thread.created_on)
            assert.isNotNaN(new Date(thread.created_on).getTime())
            assert.property(thread, 'bumped_on')
            assert.typeOf(thread.bumped_on, 'string')
            assert.isOk(thread.bumped_on)
            assert.isNotNaN(new Date(thread.bumped_on).getTime())
            assert.property(thread, 'reported')
            assert.typeOf(thread.reported, 'boolean')
            assert.isFalse(thread.reported)
            assert.property(thread, 'replies')
            assert.isArray(thread.replies)
            assert.lengthOf(thread.replies, 0)
            done()
          })
      })

      test('Existing board, valid input, #5', function(done) {
        const board_id = boards.first._id
        const thread_seed = boards.first.threads.third.seed

        chai
          .request(server)
          .post(`/api/boards/${encodeURIComponent(board_id)}`)
          .send(thread_seed)
          .end(async function(err, res) {
            assert.equal(res.status, 200)
            assert.isObject(res.body)
            assert.exists(res.body.message)
            assert.typeOf(res.body.message, 'string')
            assert.isOk(res.body.message)
            assert.equal(
              res.body.message,
              `New thread named ${thread_seed.title} has been created successfully`
            )
            assert.exists(res.body.new_thread)
            assert.isObject(res.body.new_thread)
            const thread = res.body.new_thread
            assert.property(thread, 'title')
            assert.typeOf(thread.title, 'string')
            assert.isOk(thread.title)
            assert.equal(thread.title, thread_seed.title)
            assert.property(thread, 'text')
            assert.typeOf(thread.text, 'string')
            assert.isOk(thread.text)
            assert.equal(thread.text, thread_seed.text)
            assert.property(thread, 'thread_password')
            assert.typeOf(thread.thread_password, 'string')
            assert.isOk(thread.thread_password)
            const thread_password_match = bcrypt.compareSync(
              thread_seed.thread_password,
              thread.thread_password
            )
            assert.isTrue(thread_password_match)
            assert.property(thread, '_id')
            assert.typeOf(thread._id, 'string')
            assert.isOk(thread._id)
            boards.first.threads.third._id = thread._id
            assert.property(thread, 'created_on')
            assert.typeOf(thread.created_on, 'string')
            assert.isOk(thread.created_on)
            assert.isNotNaN(new Date(thread.created_on).getTime())
            assert.property(thread, 'bumped_on')
            assert.typeOf(thread.bumped_on, 'string')
            assert.isOk(thread.bumped_on)
            assert.isNotNaN(new Date(thread.bumped_on).getTime())
            assert.property(thread, 'reported')
            assert.typeOf(thread.reported, 'boolean')
            assert.isFalse(thread.reported)
            assert.property(thread, 'replies')
            assert.isArray(thread.replies)
            assert.lengthOf(thread.replies, 0)
            done()
          })
      })
    })

    suite('GET => array of all threads', function() {
      test('Inexistent board', function(done) {
        const board_id = '5c8851572b00b54f7ce65187'

        chai
          .request(server)
          .get(`/api/boards/${encodeURIComponent(board_id)}`)
          .end(function(err, res) {
            assert.equal(res.status, 404)
            assert.isOk(res.text)
            assert.equal(res.text, 'Board Not Found')
            done()
          })
      })

      test('Existing board', function(done) {
        const board_id = boards.first._id

        chai
          .request(server)
          .get(`/api/boards/${encodeURIComponent(board_id)}`)
          .end(function(err, res) {
            assert.equal(res.status, 200)
            assert.isArray(res.body)
            const threads = res.body
            for (const thread of threads) {
              assert.isObject(thread)
              assert.property(thread, 'title')
              assert.typeOf(thread.title, 'string')
              assert.isOk(thread.title)
              assert.property(thread, 'text')
              assert.typeOf(thread.text, 'string')
              assert.isOk(thread.text)
              assert.property(thread, '_id')
              assert.typeOf(thread._id, 'string')
              assert.isOk(thread._id)
              assert.property(thread, 'created_on')
              assert.typeOf(thread.created_on, 'string')
              assert.isOk(thread.created_on)
              assert.isNotNaN(new Date(thread.created_on).getTime())
              assert.property(thread, 'bumped_on')
              assert.typeOf(thread.bumped_on, 'string')
              assert.isOk(thread.bumped_on)
              assert.isNotNaN(new Date(thread.bumped_on).getTime())
              assert.notProperty(thread, 'thread_password')
              assert.notProperty(thread, 'reported')
              assert.property(thread, 'replies')
              assert.isArray(thread.replies)
              const replies = thread.replies
              for (const reply of replies) {
                assert.isObject(reply)
                assert.property(reply, 'text')
                assert.typeOf(reply.text, 'string')
                assert.isOk(reply.text)
                assert.property(reply, '_id')
                assert.typeOf(reply._id, 'string')
                assert.isOk(reply._id)
                assert.property(reply, 'created_on')
                assert.typeOf(reply.created_on, 'string')
                assert.isOk(reply.created_on)
                assert.isNotNaN(new Date(reply.created_on).getTime())
                assert.notProperty(reply, 'thread_password')
                assert.notProperty(reply, 'reported')
              }
            }
            done()
          })
      })
    })

    suite('DELETE => message with operation status', function() {
      test('Inexistent board', function(done) {
        const board_id = '5c8851572b00b54f7ce65187'
        const board_password = boards.third.seed.board_password

        chai
          .request(server)
          .delete(`/api/boards/${encodeURIComponent(board_id)}`)
          .send({ board_password })
          .end(function(err, res) {
            assert.equal(res.status, 404)
            assert.isOk(res.text)
            assert.equal(res.text, 'Board Not Found')
            done()
          })
      })

      test('Incorrect password', function(done) {
        const board_id = boards.first._id
        const board_password = '5c8851572b00b54f7ce65187'

        chai
          .request(server)
          .delete(`/api/boards/${encodeURIComponent(board_id)}`)
          .send({ board_password })
          .end(function(err, res) {
            assert.equal(res.status, 200)
            assert.isOk(res.text)
            assert.equal(res.text, `Incorrect board password`)
            done()
          })
      })

      test('Existing board, correct password', function(done) {
        const board_id = boards.third._id
        const board_password = boards.third.seed.board_password

        chai
          .request(server)
          .delete(`/api/boards/${encodeURIComponent(board_id)}`)
          .send({ board_password })
          .end(function(err, res) {
            assert.equal(res.status, 200)
            assert.isOk(res.text)
            assert.equal(res.text, `Successfully deleted board ${board_id}`)
            done()
          })
      })
    })
  })

  suite('API ROUTING FOR /api/threads/:board_id/', function() {
    suite('DELETE => message with operation status', function() {
      test('Inexistent board', function(done) {
        const board_id = '5c8851572b00b54f7ce65187'
        const thread_id = boards.first.threads.first._id
        const thread_password = boards.first.threads.first.seed.thread_password

        chai
          .request(server)
          .delete(`/api/threads/${encodeURIComponent(board_id)}`)
          .send({ thread_id, thread_password })
          .end(function(err, res) {
            assert.equal(res.status, 404)
            assert.isOk(res.text)
            assert.equal(res.text, 'Board Not Found')
            done()
          })
      })

      test('Inexistent thread', function(done) {
        const board_id = boards.first._id
        const thread_id = '5c8851572b00b54f7ce65187'
        const thread_password = boards.first.threads.first.seed.thread_password

        chai
          .request(server)
          .delete(`/api/threads/${encodeURIComponent(board_id)}`)
          .send({ thread_id, thread_password })
          .end(function(err, res) {
            assert.equal(res.status, 404)
            assert.isOk(res.text)
            assert.equal(res.text, 'Thread Not Found')
            done()
          })
      })

      test('Existing thread, incorrect password', function(done) {
        const board_id = boards.first._id
        const thread_id = boards.first.threads.first._id
        const thread_password = '5c8851572b00b54f7ce65187'

        chai
          .request(server)
          .delete(`/api/threads/${encodeURIComponent(board_id)}`)
          .send({ thread_id, thread_password })
          .end(function(err, res) {
            assert.equal(res.status, 200)
            assert.isOk(res.text)
            assert.equal(res.text, 'Incorrect thread password')
            done()
          })
      })

      test('Existing thread, correct password', function(done) {
        const board_id = boards.first._id
        const thread_id = boards.first.threads.third._id
        const thread_password = boards.first.threads.third.seed.thread_password

        chai
          .request(server)
          .delete(`/api/threads/${encodeURIComponent(board_id)}`)
          .send({ thread_id, thread_password })
          .end(function(err, res) {
            assert.equal(res.status, 200)
            assert.isOk(res.text)
            assert.equal(res.text, `Successfully deleted thread ${thread_id}`)
            done()
          })
      })
    })

    suite('PUT => message with operation status', function() {
      test('Inexistent board', function(done) {
        const board_id = '5c8851572b00b54f7ce65187'
        const thread_id = boards.first.threads.first._id

        chai
          .request(server)
          .put(`/api/threads/${encodeURIComponent(board_id)}`)
          .send({ thread_id })
          .end(function(err, res) {
            assert.equal(res.status, 404)
            assert.isOk(res.text)
            assert.equal(res.text, 'Board Not Found')
            done()
          })
      })

      test('Inexistent thread', function(done) {
        const board_id = boards.first._id
        const thread_id = '5c8851572b00b54f7ce65187'

        chai
          .request(server)
          .put(`/api/threads/${encodeURIComponent(board_id)}`)
          .send({ thread_id })
          .end(function(err, res) {
            assert.equal(res.status, 404)
            assert.isOk(res.text)
            assert.equal(res.text, 'Thread Not Found')
            done()
          })
      })

      test('Existing thread, not yet reported', function(done) {
        const board_id = boards.first._id
        const thread_id = boards.first.threads.first._id

        chai
          .request(server)
          .put(`/api/threads/${encodeURIComponent(board_id)}`)
          .send({ thread_id })
          .end(function(err, res) {
            assert.equal(res.status, 200)
            assert.isOk(res.text)
            assert.equal(res.text, 'Thread has been successfully reported')
            done()
          })
      })

      test('Existing thread, already reported', function(done) {
        const board_id = boards.first._id
        const thread_id = boards.first.threads.first._id

        chai
          .request(server)
          .put(`/api/threads/${encodeURIComponent(board_id)}`)
          .send({ thread_id })
          .end(function(err, res) {
            assert.equal(res.status, 200)
            assert.isOk(res.text)
            assert.equal(res.text, 'Thread has been successfully unreported')
            done()
          })
      })
    })
  })

  suite('API ROUTING FOR /api/replies/:board_id?thread_id={thread_id}', function() {
    suite('POST => object with saved reply data', function() {
      test('Inexistent board', function(done) {
        const board_id = '5c8851572b00b54f7ce65187'
        const thread_id = boards.first.threads.first._id
        const reply_seed = boards.first.threads.first.replies.first.seed

        chai
          .request(server)
          .post(`/api/replies/${encodeURIComponent(board_id)}`)
          .query({ thread_id })
          .send(reply_seed)
          .end(function(err, res) {
            assert.equal(res.status, 404)
            assert.isOk(res.text)
            assert.equal(res.text, 'Board Not Found')
            done()
          })
      })

      test('Inexistent thread', function(done) {
        const board_id = boards.first._id
        const thread_id = '5c8851572b00b54f7ce65187'
        const reply_seed = boards.first.threads.first.replies.first.seed

        chai
          .request(server)
          .post(`/api/replies/${encodeURIComponent(board_id)}`)
          .query({ thread_id })
          .send(reply_seed)
          .end(function(err, res) {
            assert.equal(res.status, 404)
            assert.isOk(res.text)
            assert.equal(res.text, 'Thread Not Found')
            done()
          })
      })

      test('Existing thread, no text', function(done) {
        const board_id = boards.first._id
        const thread_id = boards.first.threads.first._id
        const reply_seed = boards.first.threads.first.replies.first.seed

        chai
          .request(server)
          .post(`/api/replies/${encodeURIComponent(board_id)}`)
          .query({ thread_id })
          .send({
            reply_password: reply_seed.reply_password,
          })
          .end(function(err, res) {
            assert.equal(res.status, 400)
            assert.isOk(res.text)
            assert.equal(res.text, 'No text provided for reply')
            done()
          })
      })

      test('Existing thread, no password', function(done) {
        const board_id = boards.first._id
        const thread_id = boards.first.threads.first._id
        const reply_seed = boards.first.threads.first.replies.first.seed

        chai
          .request(server)
          .post(`/api/replies/${encodeURIComponent(board_id)}`)
          .query({ thread_id })
          .send({
            text: reply_seed.text,
          })
          .end(function(err, res) {
            assert.equal(res.status, 400)
            assert.isOk(res.text)
            assert.equal(res.text, 'No reply_password provided for reply')
            done()
          })
      })

      test('Existing thread, valid reply info, #1', function(done) {
        const board_id = boards.first._id
        const thread_id = boards.first.threads.first._id
        const reply_seed = boards.first.threads.first.replies.first.seed

        chai
          .request(server)
          .post(`/api/replies/${encodeURIComponent(board_id)}`)
          .query({ thread_id })
          .send(reply_seed)
          .end(async function(err, res) {
            try {
              assert.equal(res.status, 200)
              assert.isObject(res.body)
              assert.exists(res.body.message)
              assert.typeOf(res.body.message, 'string')
              assert.isOk(res.body.message)
              assert.equal(res.body.message, `New reply has been created successfully`)
              assert.exists(res.body.new_reply)
              assert.isObject(res.body.new_reply)
              const reply = res.body.new_reply
              assert.property(reply, '_id')
              assert.typeOf(reply._id, 'string')
              assert.isOk(reply._id)
              boards.first.threads.first.replies.first._id = reply._id
              assert.property(reply, 'text')
              assert.typeOf(reply.text, 'string')
              assert.isOk(reply.text)
              assert.property(reply, 'created_on')
              assert.typeOf(reply.created_on, 'string')
              assert.isNotNaN(new Date(reply.created_on).getTime())
              assert.property(reply, 'reply_password')
              assert.typeOf(reply.reply_password, 'string')
              assert.isOk(reply.reply_password)
              const reply_password_match = await bcrypt.compare(
                reply_seed.reply_password,
                reply.reply_password
              )
              assert.isTrue(reply_password_match)
              assert.property(reply, 'reported')
              assert.typeOf(reply.reported, 'boolean')
              assert.isFalse(reply.reported)
              done()
            } catch (error) {
              done(error)
            }
          })
      })

      test('Existing thread, valid reply info, #2', function(done) {
        const board_id = boards.first._id
        const thread_id = boards.first.threads.first._id
        const reply_seed = boards.first.threads.first.replies.second.seed

        chai
          .request(server)
          .post(`/api/replies/${encodeURIComponent(board_id)}`)
          .query({ thread_id })
          .send(reply_seed)
          .end(async function(err, res) {
            try {
              assert.equal(res.status, 200)
              assert.isObject(res.body)
              assert.exists(res.body.message)
              assert.typeOf(res.body.message, 'string')
              assert.isOk(res.body.message)
              assert.equal(res.body.message, `New reply has been created successfully`)
              assert.exists(res.body.new_reply)
              assert.isObject(res.body.new_reply)
              const reply = res.body.new_reply
              assert.property(reply, '_id')
              assert.typeOf(reply._id, 'string')
              assert.isOk(reply._id)
              boards.first.threads.first.replies.second._id = reply._id
              assert.property(reply, 'text')
              assert.typeOf(reply.text, 'string')
              assert.isOk(reply.text)
              assert.property(reply, 'created_on')
              assert.typeOf(reply.created_on, 'string')
              assert.isNotNaN(new Date(reply.created_on).getTime())
              assert.property(reply, 'reply_password')
              assert.typeOf(reply.reply_password, 'string')
              assert.isOk(reply.reply_password)
              const reply_password_match = await bcrypt.compare(
                reply_seed.reply_password,
                reply.reply_password
              )
              assert.isTrue(reply_password_match)
              assert.property(reply, 'reported')
              assert.typeOf(reply.reported, 'boolean')
              assert.isFalse(reply.reported)
              done()
            } catch (error) {
              done(error)
            }
          })
      })

      test('Existing thread, valid reply info, #3', function(done) {
        const board_id = boards.first._id
        const thread_id = boards.first.threads.second._id
        const reply_seed = boards.first.threads.second.replies.first.seed

        chai
          .request(server)
          .post(`/api/replies/${encodeURIComponent(board_id)}`)
          .query({ thread_id })
          .send(reply_seed)
          .end(async function(err, res) {
            try {
              assert.equal(res.status, 200)
              assert.isObject(res.body)
              assert.exists(res.body.message)
              assert.typeOf(res.body.message, 'string')
              assert.isOk(res.body.message)
              assert.equal(res.body.message, `New reply has been created successfully`)
              assert.exists(res.body.new_reply)
              assert.isObject(res.body.new_reply)
              const reply = res.body.new_reply
              assert.property(reply, '_id')
              assert.typeOf(reply._id, 'string')
              assert.isOk(reply._id)
              boards.first.threads.second.replies.first._id = reply._id
              assert.property(reply, 'text')
              assert.typeOf(reply.text, 'string')
              assert.isOk(reply.text)
              assert.property(reply, 'created_on')
              assert.typeOf(reply.created_on, 'string')
              assert.isNotNaN(new Date(reply.created_on).getTime())
              assert.property(reply, 'reply_password')
              assert.typeOf(reply.reply_password, 'string')
              assert.isOk(reply.reply_password)
              const reply_password_match = await bcrypt.compare(
                reply_seed.reply_password,
                reply.reply_password
              )
              assert.isTrue(reply_password_match)
              assert.property(reply, 'reported')
              assert.typeOf(reply.reported, 'boolean')
              assert.isFalse(reply.reported)
              done()
            } catch (error) {
              done(error)
            }
          })
      })

      test('Existing thread, valid reply info, #4', function(done) {
        const board_id = boards.second._id
        const thread_id = boards.second.threads.first._id
        const reply_seed = boards.second.threads.first.replies.first.seed

        chai
          .request(server)
          .post(`/api/replies/${encodeURIComponent(board_id)}`)
          .query({ thread_id })
          .send(reply_seed)
          .end(async function(err, res) {
            try {
              assert.equal(res.status, 200)
              assert.isObject(res.body)
              assert.exists(res.body.message)
              assert.typeOf(res.body.message, 'string')
              assert.isOk(res.body.message)
              assert.equal(res.body.message, `New reply has been created successfully`)
              assert.exists(res.body.new_reply)
              assert.isObject(res.body.new_reply)
              const reply = res.body.new_reply
              assert.property(reply, '_id')
              assert.typeOf(reply._id, 'string')
              assert.isOk(reply._id)
              boards.second.threads.first.replies.first._id = reply._id
              assert.property(reply, 'text')
              assert.typeOf(reply.text, 'string')
              assert.isOk(reply.text)
              assert.property(reply, 'created_on')
              assert.typeOf(reply.created_on, 'string')
              assert.isNotNaN(new Date(reply.created_on).getTime())
              assert.property(reply, 'reply_password')
              assert.typeOf(reply.reply_password, 'string')
              assert.isOk(reply.reply_password)
              const reply_password_match = await bcrypt.compare(
                reply_seed.reply_password,
                reply.reply_password
              )
              assert.isTrue(reply_password_match)
              assert.property(reply, 'reported')
              assert.typeOf(reply.reported, 'boolean')
              assert.isFalse(reply.reported)
              done()
            } catch (error) {
              done(error)
            }
          })
      })

      test('Existing thread, valid reply info, #5', function(done) {
        const board_id = boards.second._id
        const thread_id = boards.second.threads.first._id
        const reply_seed = boards.second.threads.first.replies.second.seed

        chai
          .request(server)
          .post(`/api/replies/${encodeURIComponent(board_id)}`)
          .query({ thread_id })
          .send(reply_seed)
          .end(async function(err, res) {
            try {
              assert.equal(res.status, 200)
              assert.isObject(res.body)
              assert.exists(res.body.message)
              assert.typeOf(res.body.message, 'string')
              assert.isOk(res.body.message)
              assert.equal(res.body.message, `New reply has been created successfully`)
              assert.exists(res.body.new_reply)
              assert.isObject(res.body.new_reply)
              const reply = res.body.new_reply
              assert.property(reply, '_id')
              assert.typeOf(reply._id, 'string')
              assert.isOk(reply._id)
              boards.second.threads.first.replies.second._id = reply._id
              assert.property(reply, 'text')
              assert.typeOf(reply.text, 'string')
              assert.isOk(reply.text)
              assert.property(reply, 'created_on')
              assert.typeOf(reply.created_on, 'string')
              assert.isNotNaN(new Date(reply.created_on).getTime())
              assert.property(reply, 'reply_password')
              assert.typeOf(reply.reply_password, 'string')
              assert.isOk(reply.reply_password)
              const reply_password_match = await bcrypt.compare(
                reply_seed.reply_password,
                reply.reply_password
              )
              assert.isTrue(reply_password_match)
              assert.property(reply, 'reported')
              assert.typeOf(reply.reported, 'boolean')
              assert.isFalse(reply.reported)
              done()
            } catch (error) {
              done(error)
            }
          })
      })

      test('Existing thread, valid reply info, #6', function(done) {
        const board_id = boards.second._id
        const thread_id = boards.second.threads.second._id
        const reply_seed = boards.second.threads.second.replies.first.seed

        chai
          .request(server)
          .post(`/api/replies/${encodeURIComponent(board_id)}`)
          .query({ thread_id })
          .send(reply_seed)
          .end(async function(err, res) {
            try {
              assert.equal(res.status, 200)
              assert.isObject(res.body)
              assert.exists(res.body.message)
              assert.typeOf(res.body.message, 'string')
              assert.isOk(res.body.message)
              assert.equal(res.body.message, `New reply has been created successfully`)
              assert.exists(res.body.new_reply)
              assert.isObject(res.body.new_reply)
              const reply = res.body.new_reply
              assert.property(reply, '_id')
              assert.typeOf(reply._id, 'string')
              assert.isOk(reply._id)
              boards.second.threads.second.replies.first._id = reply._id
              assert.property(reply, 'text')
              assert.typeOf(reply.text, 'string')
              assert.isOk(reply.text)
              assert.property(reply, 'created_on')
              assert.typeOf(reply.created_on, 'string')
              assert.isNotNaN(new Date(reply.created_on).getTime())
              assert.property(reply, 'reply_password')
              assert.typeOf(reply.reply_password, 'string')
              assert.isOk(reply.reply_password)
              const reply_password_match = await bcrypt.compare(
                reply_seed.reply_password,
                reply.reply_password
              )
              assert.isTrue(reply_password_match)
              assert.property(reply, 'reported')
              assert.typeOf(reply.reported, 'boolean')
              assert.isFalse(reply.reported)
              done()
            } catch (error) {
              done(error)
            }
          })
      })
    })

    suite('GET => object with thread data and all its replies', function() {
      test('Inexistent board', function(done) {
        const board_id = '5c8851572b00b54f7ce65187'
        const thread_id = boards.first.threads.first._id

        chai
          .request(server)
          .get(`/api/replies/${encodeURIComponent(board_id)}`)
          .query({ thread_id })
          .end(function(err, res) {
            assert.equal(res.status, 404)
            assert.isOk(res.text)
            assert.equal(res.text, 'Board Not Found')
            done()
          })
      })

      test('Inexistent thread', function(done) {
        const board_id = boards.first._id
        const thread_id = '5c8851572b00b54f7ce65187'

        chai
          .request(server)
          .get(`/api/replies/${encodeURIComponent(board_id)}`)
          .query({ thread_id })
          .end(function(err, res) {
            assert.equal(res.status, 404)
            assert.isOk(res.text)
            assert.equal(res.text, 'Thread Not Found')
            done()
          })
      })

      test('Existing thread', function(done) {
        const board_id = boards.first._id
        const thread_id = boards.first.threads.first._id

        chai
          .request(server)
          .get(`/api/replies/${encodeURIComponent(board_id)}`)
          .query({ thread_id })
          .end(function(err, res) {
            assert.equal(res.status, 200)
            assert.isObject(res.body)
            const thread = res.body
            assert.property(thread, 'title')
            assert.typeOf(thread.title, 'string')
            assert.isOk(thread.title)
            assert.property(thread, 'text')
            assert.typeOf(thread.text, 'string')
            assert.isOk(thread.text)
            assert.property(thread, '_id')
            assert.typeOf(thread._id, 'string')
            assert.isOk(thread._id)
            assert.property(thread, 'created_on')
            assert.typeOf(thread.created_on, 'string')
            assert.isOk(thread.created_on)
            assert.isNotNaN(new Date(thread.created_on).getTime())
            assert.property(thread, 'bumped_on')
            assert.typeOf(thread.bumped_on, 'string')
            assert.isOk(thread.bumped_on)
            assert.isNotNaN(new Date(thread.bumped_on).getTime())
            assert.notProperty(thread, 'thread_password')
            assert.notProperty(thread, 'reported')
            assert.property(thread, 'replies')
            assert.isArray(thread.replies)
            const replies = thread.replies
            for (const reply of replies) {
              assert.isObject(reply)
              assert.property(reply, 'text')
              assert.typeOf(reply.text, 'string')
              assert.isOk(reply.text)
              assert.property(reply, '_id')
              assert.typeOf(reply._id, 'string')
              assert.isOk(reply._id)
              assert.property(reply, 'created_on')
              assert.typeOf(reply.created_on, 'string')
              assert.isOk(reply.created_on)
              assert.isNotNaN(new Date(reply.created_on).getTime())
              assert.notProperty(reply, 'thread_password')
              assert.notProperty(reply, 'reported')
            }
            done()
          })
      })
    })

    suite('PUT => message with operation status', function() {
      test('Inexistent board', function(done) {
        const board_id = '5c8851572b00b54f7ce65187'
        const thread_id = boards.first.threads.first._id
        const reply_id = boards.first.threads.first.replies.first._id

        chai
          .request(server)
          .put(`/api/replies/${encodeURIComponent(board_id)}`)
          .query({ thread_id })
          .send({ reply_id })
          .end(function(err, res) {
            assert.equal(res.status, 404)
            assert.isOk(res.text)
            assert.equal(res.text, 'Board Not Found')
            done()
          })
      })

      test('Inexistent thread', function(done) {
        const board_id = boards.first._id
        const thread_id = '5c8851572b00b54f7ce65187'
        const reply_id = boards.first.threads.first.replies.first._id

        chai
          .request(server)
          .put(`/api/replies/${encodeURIComponent(board_id)}`)
          .query({ thread_id })
          .send({ reply_id })
          .end(function(err, res) {
            assert.equal(res.status, 404)
            assert.isOk(res.text)
            assert.equal(res.text, 'Thread Not Found')
            done()
          })
      })

      test('Inexistent reply', function(done) {
        const board_id = boards.first._id
        const thread_id = boards.first.threads.first._id
        const reply_id = '5c8851572b00b54f7ce65187'

        chai
          .request(server)
          .put(`/api/replies/${encodeURIComponent(board_id)}`)
          .query({ thread_id })
          .send({ reply_id })
          .end(function(err, res) {
            assert.equal(res.status, 404)
            assert.isOk(res.text)
            assert.equal(res.text, 'Reply Not Found')
            done()
          })
      })

      test('Existing reply, not yet reported', function(done) {
        const board_id = boards.first._id
        const thread_id = boards.first.threads.first._id
        const reply_id = boards.first.threads.first.replies.first._id

        chai
          .request(server)
          .put(`/api/replies/${encodeURIComponent(board_id)}`)
          .query({ thread_id })
          .send({ reply_id })
          .end(function(err, res) {
            assert.equal(res.status, 200)
            assert.isOk(res.text)
            assert.equal(res.text, 'Reply has been successfully reported')
            done()
          })
      })

      test('Existing reply, already reported', function(done) {
        const board_id = boards.first._id
        const thread_id = boards.first.threads.first._id
        const reply_id = boards.first.threads.first.replies.first._id

        chai
          .request(server)
          .put(`/api/replies/${encodeURIComponent(board_id)}`)
          .query({ thread_id })
          .send({ reply_id })
          .end(function(err, res) {
            assert.equal(res.status, 200)
            assert.isOk(res.text)
            assert.equal(res.text, 'Reply has been successfully unreported')
            done()
          })
      })
    })

    suite('DELETE => message with operation status', function() {
      test('Inexistent board', function(done) {
        const board_id = '5c8851572b00b54f7ce65187'
        const thread_id = boards.first.threads.first._id
        const reply_id = boards.first.threads.first.replies.first._id
        const reply_password = boards.first.threads.first.replies.first.seed.reply_password

        chai
          .request(server)
          .delete(`/api/replies/${encodeURIComponent(board_id)}`)
          .query({ thread_id })
          .send({
            reply_id,
            reply_password,
          })
          .end(function(err, res) {
            assert.equal(res.status, 404)
            assert.isOk(res.text)
            assert.equal(res.text, 'Board Not Found')
            done()
          })
      })

      test('Inexistent thread', function(done) {
        const board_id = boards.first._id
        const thread_id = '5c8851572b00b54f7ce65187'
        const reply_id = boards.first.threads.first.replies.first._id
        const reply_password = boards.first.threads.first.replies.first.seed.reply_password

        chai
          .request(server)
          .delete(`/api/replies/${encodeURIComponent(board_id)}`)
          .query({ thread_id })
          .send({
            reply_id,
            reply_password,
          })
          .end(function(err, res) {
            assert.equal(res.status, 404)
            assert.isOk(res.text)
            assert.equal(res.text, 'Thread Not Found')
            done()
          })
      })

      test('Inexistent reply', function(done) {
        const board_id = boards.first._id
        const thread_id = boards.first.threads.first._id
        const reply_id = '5c8851572b00b54f7ce65187'
        const reply_password = boards.first.threads.first.replies.first.seed.reply_password

        chai
          .request(server)
          .delete(`/api/replies/${encodeURIComponent(board_id)}`)
          .query({ thread_id })
          .send({
            reply_id,
            reply_password,
          })
          .end(function(err, res) {
            assert.equal(res.status, 404)
            assert.isOk(res.text)
            assert.equal(res.text, 'Reply Not Found')
            done()
          })
      })

      test('Existing reply, incorrect password', function(done) {
        const board_id = boards.first._id
        const thread_id = boards.first.threads.first._id
        const reply_id = boards.first.threads.first.replies.first._id
        const reply_password = '5c8851572b00b54f7ce65187'

        chai
          .request(server)
          .delete(`/api/replies/${encodeURIComponent(board_id)}`)
          .query({ thread_id })
          .send({
            reply_id,
            reply_password,
          })
          .end(function(err, res) {
            assert.equal(res.status, 200)
            assert.isOk(res.text)
            assert.equal(res.text, 'Incorrect reply password')
            done()
          })
      })

      test('Existing reply, correct password', function(done) {
        const board_id = boards.second._id
        const thread_id = boards.second.threads.first._id
        const reply_id = boards.second.threads.first.replies.second._id
        const reply_password = boards.second.threads.first.replies.second.seed.reply_password

        chai
          .request(server)
          .delete(`/api/replies/${encodeURIComponent(board_id)}`)
          .query({ thread_id })
          .send({
            reply_id,
            reply_password,
          })
          .end(function(err, res) {
            assert.equal(res.status, 200)
            assert.isOk(res.text)
            assert.equal(res.text, `Successfully deleted reply ${reply_id}`)
            done()
          })
      })
    })
  })
})
