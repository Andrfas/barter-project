module.exports = {
  attributes: {
    firstName: {
      type: 'STRING'
    },

    lastName: {
      type: 'STRING'
    },

    credentials: {
      collection:'credentials',
      via: 'user'
    }
  }
}