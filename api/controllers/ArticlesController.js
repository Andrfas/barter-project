var feed = require("feed-read");
var encoding = require("encoding");

module.exports = {
    set_latest: set_latest,
    list: list,
    test: test
}

function list(req, res) {
    var options = {
        user: req.options.is_authorized ? req.session.user_id : null
    }
    ArticleService.getArticles(options)
        .then(function(response) {
            return res.json(200, { success: 'Success', results: response });
        })
        .catch(function(err) {
            return res.json(200, { error: err });
        })
}

function set_latest(req, res) {
    ArticleService.setLatestArticles()
        .then(function(err, response) {
            return res.json(200, { success: 'Success', results: response });
        })
}

function test(req, res) {
    feed('http://football.ua/rss2.ashx', function(err, articles) {
        articles.map(function(article) {
            article.title = encoding.convert(JSON.parse( JSON.stringify(article.title)), 'UTF-8', 'utf8').toString('utf8');
            article.content = JSON.parse( JSON.stringify(article.content));
        })
        return res.json(200, { success: 'Success', results: articles });
    })
}


