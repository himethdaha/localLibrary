const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const User = require('../models/user')

const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//GET the sign in form
router.get('/signup',userController.signup_get)
//POST the sign in form data
router.post('/signup',userController.signup_post)
//GET the log in form
router.get('/login',userController.login_get)
//POST the log in data
router.post('/login',userController.login_post)
//GET Log out
router.get('/logout', userController.logout)

module.exports = router;
