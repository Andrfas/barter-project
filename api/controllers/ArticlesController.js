var feed = require("feed-read");
// var encoding = require("encoding");
var async = require('async');

module.exports = {
    set_latest: set_latest,
    list: list,
    update: update,
    test:test
}

function list(req, res) {
    var currentUserId = req.options.is_authorized ? req.session.user_id : null;
    var options = {
        tagsForUserId: currentUserId
    }
    ArticleService.getArticles(options)
        .then(function(response) {
            return res.json(200, { success: 'Success', results: response });
        })
        .catch(function(err) {
            return res.json(200, { error: err });
        })
}

function update(req, res) {
    var article = {};
    async.waterfall([
        function(cb) {
            if(req.body.tags) {
                ArticleService.alterTags({
                    userId: req.options.is_authorized ? req.session.user_id : null,
                    tags: req.body.tags,
                    articleId: req.params.articleId
                }).then(function(res) {
                    cb(null, res)
                }, function(err) {
                    cb(err);
                })
            }
        }
    ], function(err) {
        if(err) {
            return res.json(200, { error: err });
        }
        return res.json(200, { success: 'Success'});
    })
    
}

function set_latest(req, res) {
    ArticleService.setLatestArticles()
        .then(function(err, response) {
            return res.json(200, { success: 'Success', results: response });
        })
}




function test(req, res) {
    UserTagged.findOrCreate({
        user: 1,
        article: 1,
        tag: 1
      }).exec(function(err, association) {
        console.log('err', err)
        return res.json(200, { success: 'Success', results: association});
      }) 
}


