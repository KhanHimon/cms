var express = require('express');
var router = express.Router();
const login_controller = require('../controller/login_controller');
const product_controller = require('../controller/product_controller');
const index_controller = require('../controller/index_controller');
const UserSchema = require('../models/user.model');
const Lich_su_Schema = require('../models/lich_su.model');
const trang_thai_Schema = require('../models/trang_thai.model');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});
router.get('/dang-ky', function (req, res, next) {
  res.render('dang_ky');
});
router.get('/tong-quan/:_id', login_controller.loginRequired, function (req, res, next) {
  UserSchema.findById(req.params._id, function (err, user) {
    trang_thai_Schema.find({}, function (err, trang_thai) {
      if (err) console.log(err);
      res.render('pages/tong_quan', { user,trang_thai });
    })
  })
});
router.get('/du-an', login_controller.loginRequired, function (req, res, next) {
  res.render('pages/du_an');
});
router.get('/bao-mat/:_id', login_controller.loginRequired, function (req, res, next) {
  UserSchema.findById(req.params._id, function (err, user) {
    if (err) console.log(err);
    res.render('pages/bao_mat', { user });
  })
});
router.get('/cai-dat/:_id', login_controller.loginRequired, function (req, res, next) {
  UserSchema.findById(req.params._id, function (err, user) {
    if (err) console.log(err);
    res.render('pages/cai_dat', { user });
  })
});
router.get('/wallet/:_id', login_controller.loginRequired, function (req, res, next) {
  UserSchema.findById(req.params._id, function (err, user) {
    Lich_su_Schema.find({}, function (err, lich_su) {
      if (err) console.log(err);
      res.render('pages/wallet', { user, lich_su });
    }).populate('nguoi_gui').populate('trang_thai');
  })
});

router.get('/thong-tin-ca-nhan/:_id', login_controller.loginRequired, function (req, res, next) {
  UserSchema.findById(req.params._id, function (err, user) {
    const id = UserSchema.findById(req.params._id);
    if (id) {
      Lich_su_Schema.find(req.params.nguoi_gui, function (err, lich_su) {
        if (err) console.log(err);
        res.render('pages/thong_tin_ca_nhan', { user, lich_su });
      }).populate('nguoi_gui');
    }
  })
});

router.get('/dau-tu/:_id', login_controller.loginRequired, function (req, res, next) {
  UserSchema.findById(req.params._id, function (err, user) {
    if (err) console.log(err);
    res.render('pages/dau_tu', { user });
  })
});

router.post('/logout', login_controller.logout);

module.exports = router;
