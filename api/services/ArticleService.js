var q = require('q');
var feed = require("feed-read");
var utf8 = require('utf8');
var async = require('async');
var encoding = require('encoding');

module.exports = {

  getArticles: function(options) {
    var deferred = q.defer();
    Article
      .find()
      .exec(function(err, articles) {
        if (err) {
          deferred.reject(err);
        } else {
          deferred.resolve(articles);
        }
      })

    return deferred.promise;
  },


  // goes through all sources and creates articles if not yet created
  setLatestArticles: function(options) {
    var deferred = q.defer();
    var sourcesQueryObj = {};
    if(options && options.sources) {

    }

    Source
      .find()
      .where(sourcesQueryObj)
      .exec(function(err, sources) {
        if(err) {
          return deferred.reject(err);
        }
        var response = {
          results: []
        }
        sources.map(function(source) {
          feed(source.url, function(err, articles) {
            console.log('ARTICLE', articles[0])
            async.each(articles, function(article, callback) {
                var articleObj = {
                title: encode(article.title ),
                description: encode(article.content ),
                link: encode(article.link),
                publication_date: new Date(article.published),
              };

              Article.findOrCreate({
                title: myString = encode(article.title ),
                description: encode(article.content ),
                link: encode(article.link)
              }, articleObj, function(err, createdOrFoundObj) {
                if(err) {
                  console.log('ERROR', err)
                  return callback(err);
                }
                response.results.push(createdOrFoundObj);                
                callback();
              })
                
            }, function(err) {
                if( err ) {
                  deferred.reject(new Error('Some error occured'));
                } else {                  
                  deferred.resolve(response.results);
                }
            });
          })
        })
      })
    return deferred.promise;
  },


  createArticle: function (news) { // create single news
    var deferred = q.defer();
    Article.create(news).exec(function(err, result){
        if (err) {
          deferred.reject(err);
        } else {
          deferred.resolve(result);
        }
    });
    return deferred.promise;
  },
}

function encode(str) {
  return encoding.convert(JSON.parse( JSON.stringify(str)), 'UTF-8', 'utf8').toString('utf8');
}