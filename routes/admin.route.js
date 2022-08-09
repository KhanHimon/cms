var express = require('express');
var router = express.Router();

const user_controller = require('../controller/user.controller');
const login_controller = require('../controller/login_controller');
const Lich_su_Schema = require('../models/lich_su.model');
const trang_thai_controller = require('../controller/trang_thai_controller');

/* GET users listing. */
router.get('/', function (req, res, next) {
  Lich_su_Schema.find(function (err, lich_su) {
    if (err) throw err;
    res.render('admin/admin.ejs', { lich_su });
  }).populate('nguoi_gui')

});
router.get('/quan-ly-giao-dich', function (req, res, next) {
  Lich_su_Schema.find(function (err, lich_su) {
    if (err) throw err;
    res.render('admin/pages/quan_ly_giao_dich', { lich_su });
  }).populate('nguoi_gui')
});

router.post('/them-trang-thai', trang_thai_controller.them_trang_thai);
router.get('/trang-thai', trang_thai_controller.trang_thai);

module.exports = router;
