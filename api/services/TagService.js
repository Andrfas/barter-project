var q = require('q');

module.exports = {

  createTag: function (data) {
    var deferred = q.defer();

    var tag = {
      name: (data.name+"").toLowerCase()
    }
    Tag.findOrCreate(tag).exec(function(err, createdTag){
        if (err) {
        console.log('err', err)
          return deferred.reject(new Error(err));
        } else {
          return deferred.resolve(createdTag);
        }
    });
    return deferred.promise;
  },
}