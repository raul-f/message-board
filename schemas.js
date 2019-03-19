const mongoose = require('mongoose')

const Schema = mongoose.Schema

const replySchema = {
  text: String,
  reply_password: String,
  reported: Boolean,
  created_on: Date,
}

const threadSchema = {
  title: String,
  text: String,
  thread_password: String,
  created_on: Date,
  bumped_on: Date,
  reported: Boolean,
  replies: [replySchema],
}

const boardSchema = {
  name: String,
  board_password: String,
  created_on: Date,
  bumped_on: Date,
  threads: [threadSchema],
}

const Board = mongoose.model('Board', boardSchema)

module.exports = Board
