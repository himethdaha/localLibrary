var express = require('express');
var router = express.Router();
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

/* GET home page. */
router.get('/', function(req, res) {
  res.redirect('/catalog')
});

module.exports = router;
