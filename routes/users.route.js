var express = require('express');
var router = express.Router();

const user_controller = require('../controller/user.controller');
const login_controller = require('../controller/login_controller');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('dang_ky');
});
router.post('/them-user',login_controller.loginRequired , user_controller.postUser);
router.post('/nap-tien' ,login_controller.loginRequired , user_controller.nap_tien);
router.post('/them-ngan-hang',login_controller.loginRequired , user_controller.them_tai_khoan_ngan_hang )

module.exports = router;