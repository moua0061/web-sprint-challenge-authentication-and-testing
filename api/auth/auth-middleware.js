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
        next({
            status: 422,
            message: 'username and password required'
        })
    } else {
        next()
    }
}

// dont need??
function checkUsernameExists(req, res, next){
    User.findBy({ username: req.body.username })
        .then(users => {
            if(users) {
                req.user = users
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
    checkBodyOfUsernameAndPassword,
    checkUsernameExists
}
