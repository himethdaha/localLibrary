const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/signup',userController.signup_get)
router.post('/signup',userController.signup_post)

module.exports = router;
