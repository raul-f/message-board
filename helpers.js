module.exports = {
  is_valid_board_input: function(obj) {
    const fields = ['name', 'board_password']
    const invalidNameCharacters = /(\s|!|@|\$)/

    for (const field of fields) {
      if (!obj.hasOwnProperty(field)) {
        return { verdict: false, message: `No ${field} provided for board` }
      } else if (typeof obj[field] != 'string') {
        return { verdict: false, message: `The ${field} provided for the board is invalid` }
      } else if (!obj[field]) {
        return { verdict: false, message: `The ${field} provided for the board is invalid` }
      } else if (field == 'name' && invalidNameCharacters.test(obj[field])) {
        return { verdict: false, message: `The ${field} provided for the board is invalid` }
      } else if (field == 'board_password' && /\s/.test(obj[field])) {
        return { verdict: false, message: `The ${field} provided for the board is invalid` }
      }
    }

    return { verdict: true, message: 'Board input ok' }
  },
  is_valid_thread_input: function(obj) {
    const fields = ['title', 'text', 'thread_password']

    for (const field of fields) {
      if (!obj.hasOwnProperty(field)) {
        return { verdict: false, message: `No ${field} provided for thread` }
      } else if (typeof obj[field] != 'string') {
        return { verdict: false, message: `The ${field} provided for the thread is invalid` }
      } else if (field == 'thread_password' && /\s/.test(obj[field])) {
        return { verdict: false, message: `The ${field} provided for the thread is invalid` }
      } else if (!obj[field]) {
        return { verdict: false, message: `The ${field} provided for the thread is invalid` }
      }
    }
    return { verdict: true, message: 'Thread input ok' }
  },
  is_valid_reply_input: function(obj) {
    const fields = ['text', 'reply_password']

    for (const field of fields) {
      if (!obj.hasOwnProperty(field)) {
        return { verdict: false, message: `No ${field} provided for reply` }
      } else if (typeof obj[field] != 'string') {
        return { verdict: false, message: `The ${field} provided for the reply is invalid` }
      } else if (field == 'reply_password' && /\s/.test(obj[field])) {
        return { verdict: false, message: `The ${field} provided for the reply is invalid` }
      } else if (!obj[field]) {
        return { verdict: false, message: `The ${field} provided for the reply is invalid` }
      }
    }
    return { verdict: true, message: 'Reply input ok' }
  },
}
