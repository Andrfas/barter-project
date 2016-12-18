module.exports = {
  attributes: {
    // e.g., "Polly"
    url: {
      type: 'STRING'
    },

    name: {
      type: 'STRING'
    },

    users: {
      collection:'user',
      via: 'source_subscribtions'
    }
  }
}