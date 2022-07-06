var express = require('express');
var router = express.Router();
const login_controller = require('../controller/login_controller');
/* GET home page. */
router.get('/',login_controller.loginRequired, function(req, res, next) {
  res.render('index', { title: 'Express'});
});
router.post('/logout', login_controller.logout);

module.exports = router;
