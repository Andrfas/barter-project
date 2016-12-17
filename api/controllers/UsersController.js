var feed = require("feed-read");
var encoding = require("encoding");

module.exports = {
    create: create
}

function create(req, res) {
	console.log('request')
    var user = {
    	firstName: req.body['firstName'],
    	lastName: req.body['lastName'],
    };
    var credentials = {
    	password: req.body['password'],
    	email: req.body['email']
    }
    UserService.signupUser(user, credentials)
        .then(function(response) {
            return res.json(200, { success: 'Success', results: response });
        }, function(err) {
            return res.json(200, { error: err });
        })
}


