var express = require('express');
var router = express.Router();
const login_controller = require('../controller/login_controller');
const product_controller = require('../controller/product_controller');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/dang-ky', function(req, res, next) {
  res.render('dang_ky');
});
router.get('/tong-quan',login_controller.loginRequired, function(req, res, next) {
  res.render('pages/tong_quan');
});
router.get('/du-an',login_controller.loginRequired, function(req, res, next) {
  res.render('pages/du_an');
});
router.get('/bao-mat', login_controller.loginRequired, function (req,res,next) {
  res.render('pages/bao_mat');
});
router.get('/cai-dat', login_controller.loginRequired, function (req,res,next) {
  res.render('pages/cai_dat');
});
router.get('/wallet', login_controller.loginRequired, function (req,res,next) {
  res.render('pages/wallet');
});
router.get('/thong-tin-ca-nhan', login_controller.loginRequired, function (req,res,next) {
  res.render('pages/thong_tin_ca_nhan');
});

router.get('/thong-tin-ca-nhan', login_controller.loginRequired, function (req,res,next) {
  res.render('pages/dau-tu');
});

router.post('/logout', login_controller.logout);

module.exports = router;
