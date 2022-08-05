var express = require('express');
var router = express.Router();
const login_controller = require('../controller/login_controller');
const product_controller = require('../controller/product_controller');
/* GET home page. */
router.get('/',login_controller.loginRequired, function(req, res, next) {
  res.render('index');
});
router.get('/du-an',login_controller.loginRequired, function(req, res, next) {
  res.render('pages/du_an');
});
router.get('/bao-mat', login_controller.loginRequired, function (req,res,next) {
  res.render('pages/bao_mat');
});
router.post('/logout', login_controller.logout);

module.exports = router;
