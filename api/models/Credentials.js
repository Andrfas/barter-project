var bcrypt = require('bcryptjs')

module.exports = {
  attributes: {
    email: {
      type: 'STRING'
    },

    password: {
      type: 'STRING'
    },

    token: {
      type: 'STRING'
    },

    user:{
      model:'user',
      unique: true
    }
  }
}