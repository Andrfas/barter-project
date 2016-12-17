module.exports = function(req, res, next) {

	if (req.headers['authorization']){

		var findCriteria = {
			token : req.headers['authorization']
		}

		Credentials.findOne(findCriteria, function(err,response){
			if (err || !response) {
                req.options.is_authorized = false;
                if(req.session.user_id) {
            		req.session.user_id = null; 
            	}
            } else {
            	req.options.is_authorized = true;
            	if(!req.session.user_id) {
            		req.session.user_id = response.user;
            	}
            }
    		return next();
		})

	} else {
		req.options.is_authorized = false;
		if(req.session.user_id) {
    		req.session.user_id = null; 
    	}
    	return next();
	}

};