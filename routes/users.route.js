var express = require('express');
var router = express.Router();

const user_controller = require('../controller/user.controller');
const login_controller = require('../controller/login_controller');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('dang_ky');
});
router.post('/them-user',login_controller.loginRequired , user_controller.postUser);

module.exports = router;
