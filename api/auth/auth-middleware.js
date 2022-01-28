const User = require('./auth-model');
// const db = require('../../data/dbConfig');


function checkUsernameTaken(req, res, next){

    User.findBy({ username: req.body.username })
        .then(users => {
            if(!users) {
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

function checkBodyOfUsernameAndPassword(req, res, next){
    const { username, password } = req.body
    if(!username.trim() || !password) {
        console.log(username);
        next({
            status: 422,
            message: 'username and password required'
        })
    } else {
        next()
    }
}

function checkUsernameExists(req, res, next){
    // return 'you are in the check username exists middleware'
    User.findBy({ username: req.body.username })
        .then(users => {
            if(users) {
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

module.exports = {
    checkUsernameTaken,
    checkUsernameExists,
    checkBodyOfUsernameAndPassword
}