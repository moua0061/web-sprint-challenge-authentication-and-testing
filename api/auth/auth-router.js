const router = require('express').Router();
const bcrypt = require('bcryptjs');
const { BCRYPT_ROUNDS } = require('../secrets/index')
const makeToken = require('./auth-token-builder');

const User = require('./auth-model');
const { 
  checkUsernameTaken,
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
    const hash = bcrypt.hashSync(password, BCRYPT_ROUNDS)
    User.add({ username, password: hash })
        .then(newUser => {
          res.json(newUser)
        })
        .catch(next)
});

router.post('/login', checkBodyOfUsernameAndPassword, (req, res, next) => {

    // res.json('hello from login endpoint')
    const { password } = req.body
      if(bcrypt.compareSync(password, req.user.password)) {
        const token = makeToken(req.user)
        res.json({
          message: `welcome, ${req.user.username}`,
          token
        })
      } else {
        next({
          status: 401,
          message: 'invalid credentials'
        })
      }
});

module.exports = router;
