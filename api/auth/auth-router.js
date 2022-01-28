const router = require('express').Router();
const bcrypt = require('bcryptjs');

const User = require('./auth-model');
const { 
  checkUsernameTaken, 
  checkUsernameExists, 
  checkBodyOfUsernameAndPassword 
} = require('./auth-middleware');

router.get('/users', (req, res, next) => {
  User.find()
    .then(users => {
      console.log(users);
      res.json(users)
    })
    .catch(next)
})

router.get('/users/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then(users => {
      console.log(users);
      res.json(users)
    })
    .catch(next)
})

router.post('/register', 
  checkUsernameTaken, 
  checkBodyOfUsernameAndPassword, (req, res, next) => {

    let { username, password } = req.body
    const hash = bcrypt.hashSync(password, 8)
    User.add({ username, password: hash })
        .then(newUser => {
          res.json(newUser)
        })
        .catch(next)
});

router.post('/login', checkUsernameExists, checkBodyOfUsernameAndPassword, (req, res, next) => {
  /*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.

    1- In order to log into an existing account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel",
        "password": "foobar"
      }

    2- On SUCCESSFUL login,
      the response body should have `message` and `token`:
      {
        "message": "welcome, Captain Marvel",
        "token": "eyJhbGciOiJIUzI ... ETC ... vUPjZYDSa46Nwz8"
      }

    3- On FAILED login due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    4- On FAILED login due to `username` not existing in the db, or `password` being incorrect,
      the response body should include a string exactly as follows: "invalid credentials".
  */
      // res.json('hello from login endpoint')
      const { password } = req.body
      if(bcrypt.compareSync(password, )){
        console.log(req.user);
        res.json({
          message: `Welcome ${req.user} `
        })
      } else {
        next({
          status: 401,
          message: 'Invalid Credentials'
        })
      }
});

module.exports = router;
