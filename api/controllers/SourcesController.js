// var _ = require('lodash');
// var async = require('async');
// var CommonFunctions = require('../../api/services/CommonFunctions.js');
module.exports = {
    create: create,
    subscribeToSource: subscribeToSource
}

function create(req, res) {
    var story = {
        name: req.body.name,
        url : req.body.url
    };
    Source.create(story).exec(function(err, result){
        if (err) {
            sails.log.debug('Some error occured ' + err);
            return res.json(500, { error: 'Some error occured' });
        }
        return res.json(200, { success: 'Success', data: result });
    });
}

function subscribeToSource(req, res) {
    if(!req.params.sourceId) {
        return res.json(500, { error: 'source id should be specified' });
    }
    if(!req.session.user_id) {
        return res.json(401, { error: 'please login' });
    }
    var obj = {
        sourceId: req.params.sourceId,
        userId : req.session.user_id
    };
    SourceSubscribtionService.subscribe(obj).then(function(subscribtion){
        return res.json(200, { success: 'Success', data: subscribtion });
    }, function(err) {
        sails.log.debug('Some error occured ' + err);
        return res.json(500, { error: 'Some error occured' });
        
    });
}


