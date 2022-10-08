var express = require('express');
var router = express.Router();
const login_controller = require('../controller/login_controller');
const index_controller = require('../controller/index_controller');
const UserSchema = require('../models/user.model');
const Lich_su_Schema = require('../models/lich_su.model');
const trang_thai_Schema = require('../models/trang_thai.model');
const Hop_dong_dau_tu_Schema = require('../models/hop_dong_dau_tu.model');
const user_controller = require('../controller/user.controller');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});
router.get('/phieu-khach-hang', function (req, res, next) {
  res.render('phieu_khach_hang');
});

/** ROUTER TỔNG QUAN */

router.get('/tong-quan/:_id', login_controller.loginRequired, index_controller.hien_thi_tong_quan);
router.get('/thong-tin-ca-nhan/:_id', login_controller.loginRequired, index_controller.hien_thi_thong_tin_ca_nhan);
router.get('/hop-dong-dau-tu/:_id', login_controller.loginRequired, index_controller.hien_thi_hop_dong_dau_tu);
router.get('/tin-tuc/:_id', login_controller.loginRequired, index_controller.hien_thi_tin_tuc);
router.get('/lich-su/:_id', login_controller.loginRequired, index_controller.lich_su_tra_lai_dau_tu);
router.get('/api-hop-dong', index_controller.API_hop_dong_dau_tu);
router.post('/sua-thong-tin/:id', login_controller.loginRequired, user_controller.thay_doi_thong_tin);



router.post('/logout-client', login_controller.logout); 

module.exports = router;
