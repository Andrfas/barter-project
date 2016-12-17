// var _ = require('lodash');
// var async = require('async');
// var CommonFunctions = require('../../api/services/CommonFunctions.js');
module.exports = {
    create: create
}

function create(req, res) {
    console.log('AAAAAAAAAAAAAAAAA')
    var story = {
        name: 'up_general',
        url : 'http://www.pravda.com.ua/rss/'
    };
    Source.create(story).exec(function(err, result){
        if (err) {
            sails.log.debug('Some error occured ' + err);
            return res.json(500, { error: 'Some error occured' });
        }
        sails.log.debug('Success', JSON.stringify(result));
        return res.json(200, { success: 'Success' });
    });
}


