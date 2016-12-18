
module.exports = {
    create: create
}

function create(req, res) {
    var tag = {
    	name: req.body['name']
    };
    TagService.createTag(tag)
        .then(function(response) {
            return res.json(200, { success: 'Success', results: response });
        }, function(err) {
            return res.json(200, { error: err });
        })
}


