module.exports = {
  tableName: 'user_tagged',
  attributes: {

    user: {
      model: 'user'
    },
    article: {
      model: 'article'
    },
    tag: {
      model: 'tag'
    }
  }
}