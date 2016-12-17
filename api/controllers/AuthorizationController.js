
module.exports = {
    signIn: signIn,
    signOut: signOut,
}

function signIn(req, res) {
    var email = req.body.email;
    var pass = req.body.password;

    Credentials.findOne({
        email: email
    }).exec(function(err, credentialsRes) {
        if(err || !credentialsRes) {
            return res.json(401, { error: 'not_authorized' });
        } else if(credentialsRes.password != pass) {
            return res.json(401, { error: 'wrong_password' });
        }

        var token = "asd";
        Credentials.update({
            id: credentialsRes.id
        }, {
            token: token
        }).exec(function(err, updateRes) {
            req.session.user_id = credentialsRes.user;

            return res.json(200, { success: true, auth_token: token });
        })
    })
}


function signOut(req, res) {
    Credentials.update({
        token: req.headers['authorization']
    }, {
        token: null
    }).exec(function(err, updateRes) {
        if(err || !updateRes) {
            return res.json(401, { error: 'not_authorized' });
        }
        return res.json(200, { success: true });
    })
    
}
