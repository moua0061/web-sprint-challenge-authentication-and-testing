const User = require('./auth-model');
// const db = require('../../data/dbConfig');


async function checkUsernameTaken(req, res, next){

    User.findBy({ username: req.body.username })
        .then(users => {
            if( !req.body.username || !req.body.password ) {
                next({
                    status: 422,
                    message: 'username and password required'
                }) 
                } else if( !users.length) {
                    // req.user = users
                    next()
            } else {
                next({
                    status: 422,
                    message: 'username taken'
                })
            }
        })
        .catch(next)

}

function checkUsernameExists(){
    return 'you are in the check username exists middleware'
}

module.exports = {
    checkUsernameTaken,
    checkUsernameExists,
}