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
    },

    source_subscribtions: {
      collection:'source',
      via: 'users',
      dominant: true
    }
  }
}