var express = require('express');
var router = express.Router();
const login_controller = require('../controller/login_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login',{message:''});
});
router.post('/', login_controller.check);

module.exports = router;
