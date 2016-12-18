var q = require('q');

module.exports = {

  subscribe: function (data) {
    var deferred = q.defer();

    var obj = {
      user: data.userId,
      source: data.sourceId
    }
    Subscribtion.findOrCreate(obj).exec(function(err, createdSubscr){
        if (err) {
          return deferred.reject(new Error(err));
        } else {
          return deferred.resolve(createdSubscr);
        }
    });
    return deferred.promise;
  },
}