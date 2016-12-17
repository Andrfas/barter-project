var q = require('q');
var feed = require("feed-read");
var utf8 = require('utf8');

module.exports = {

  signupUser: function (user, credentials) { // create single news

    var deferred = q.defer();
    User.create(user).exec(function(err, createdUser){
        if (err) {
          return deferred.reject(new Error(err));
        } else {
          credentials['user'] = createdUser.id;
          Credentials.create(credentials)
            .exec(function(err, createdCredentials) {
              if (err) {
                return deferred.reject(new Error(err));
              }
              deferred.resolve(createdUser);
            })

        }
    });
    return deferred.promise;
  },
}