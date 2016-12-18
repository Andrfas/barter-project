var q = require('q');
var feed = require("feed-read");
var async = require('async');

// var utf8 = require('utf8');
// var encoding = require('encoding');
// var iconv = require('iconv');

module.exports = {

  getArticles: function(options) {
    var deferred = q.defer();
    Article
      .find()
      .exec(function(err, articles) {
        if (err) {
          return deferred.reject(err);
        }
        async.waterfall([

          // set tags
          function(cb) {
            if(options.tagsForUserId) {
              async.each(articles, function(article, eachCb) {              
                UserTagged.find({
                  user: options.tagsForUserId,
                  article: article.id
                }).exec(function(err, associations) {
                  if(!associations) {
                    article['tags'] = [];
                    return eachCb();
                  } 
                  var tagIds = [];
                  associations.map(function(assoc) {
                    tagIds.push(assoc.tag);
                  })
                  Tag.find({id: tagIds})
                    .exec(function(err, tags) {
                      article['tags'] = tags;
                      eachCb();
                    })
                })
              }, function finish(err) {
                cb(null, articles);
              })
            } else cb(null, articles);
          }
        ], function(err, articles) {
          deferred.resolve(articles);
        })
        
        
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
                title: encode(article.title ),
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


  alterTags: function (data) { // create single news
    var deferred = q.defer();
    var userId = data.userId;
    var articleId = data.articleId;

    var newTags = data.tags;

    async.parallel({
      createTags: function(callback) {
        var tagsToCreate = [];
        newTags.map(function(tag) {
          if(typeof tag.id == 'undefined') {
            tagsToCreate.push(tag);
          }
        })
        async.waterfall([
          function(waterfallCb) {
            async.each(tagsToCreate, function(tag, cb) {
              Tag.findOrCreate(tag)
                .exec(function(err, createdTag) {
                  console.log('createdTag', createdTag, err)
                  tag['id'] = createdTag.id;
                  cb(null);
                })
                
            }, function finish() {
              waterfallCb(null)
            })
          },
          function(waterfallCb) {
            async.each(newTags, function(tag, cb) {
              UserTagged.findOrCreate({
                user: userId,
                article: articleId,
                tag: tag.id
              }).exec(function(err, association) {
                cb(null)
              })                
            }, function finish() {
              waterfallCb(null)
            })   
          }
        ], function (err, result) {
            callback(null);
        });
        
      },

      deleteTagsFromArticle: function(callback) {
        async.waterfall([
          function(waterfallCb) {
            UserTagged.find({
              user: userId,
              article: articleId
            }).exec(function(err, associations) {
              waterfallCb(null, associations);
            })
          },
          function(associations, waterfallCb) {
              if(!associations) {
                return waterfallCb(null, null);
              }
              var newTagsObj = {};
              newTags.map(function(tag) {
                newTagsObj[tag.id] = true;
              })
              var associationIdsToDelete = [];
              associations.map(function(association) {
                if(!newTagsObj[association.tag]) {
                  associationIdsToDelete.push(association.id);
                }
              })
              waterfallCb(null, associationIdsToDelete);
          },
          function(associationIdsToDelete, waterfallCb) {
            if(!associationIdsToDelete) {
              return waterfallCb(null);
            }
            UserTagged.destroy({
              id: associationIdsToDelete
            }).exec(function(err, associations) {
              waterfallCb(null);
            })
          }
        ], function (err, result) {
            callback(null);
        });

      }
    }, function(err, results) {
        deferred.resolve(results);
    });


    return deferred.promise;
  },


  addTag: function (data) { // create single news
    var deferred = q.defer();
    var obj = {
      user: data.userId,
      tag: data.tagId,
      article: data.articleId,
    }
    UserTagged.findOrCreate(obj).exec(function(err, result){
        if (err) {
          deferred.reject(err);
        } else {
          deferred.resolve(result);
        }
    });
    return deferred.promise;
  },
}


/////////

function encode(str) {
  return JSON.parse(JSON.stringify(str));
  // return encoding.convert(str, 'UTF-8', 'CP1255').toString('UTF-8');
}