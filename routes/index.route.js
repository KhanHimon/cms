var express = require('express');
var router = express.Router();
const login_controller = require('../controller/login_controller');
const product_controller = require('../controller/product_controller');
const index_controller = require('../controller/index_controller');
const UserSchema = require('../models/user.model');
const Lich_su_Schema = require('../models/lich_su.model');
const trang_thai_Schema = require('../models/trang_thai.model');
const Hop_dong_dau_tu_Schema = require('../models/hop_dong_dau_tu.model');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});
router.get('/dang-ky', function (req, res, next) {
  res.render('dang_ky');
});
/** ROUTER TỔNG QUAN */
router.get('/tong-quan/:_id', login_controller.loginRequired, index_controller.hien_thi_tong_quan);
router.get('/api-hop-dong', index_controller.API_hop_dong_dau_tu);



router.post('/logout', login_controller.logout);

module.exports = router;
