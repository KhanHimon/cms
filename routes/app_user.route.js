var express = require('express');
var router = express.Router();

// IMPORT MODELS
const Lich_su_Schema = require('../models/lich_su.model');
const Nhom_sale_Schema = require('../models/nhom_sale.model');
const Sale_Schema = require('../models/sale.model');
const Chuc_vu_Schema = require('../models/chuc_vu.model');
const User_Schema = require('../models/user.model');
const thong_bao_Schema = require('../models/thong_bao.model');
const trang_thai_Schema = require('../models/trang_thai.model');
const hoa_hong_Schema = require('../models/hoa_hong_co_dinh.model');
const Hoa_hong_linh_dong_Schema = require('../models/hoa_hong_linh_dong.model');
const Hoa_hong_van_phong_Schema = require('../models/hoa_hong_van_phong.model');
const Hoa_hong_thuong_Schema = require('../models/hoa_hong_thuong.model');
const Hoa_hong_voucher_Schema = require('../models/hoa_hong_voucher.model');
const hop_dong_tra_thuong_Schema = require('../models/hop_dong_tra_thuong.model');
const phieu_thong_tin_khach_hang_Schema = require('../models/phieu_thong_tin_khach_hang.model');
const Hop_dong_dau_tu_Schema = require('../models/hop_dong_dau_tu.model');
// IMPORT CONTROLLER
const vung_Controller = require('../controller/vung.controller');
const nhom_Controller = require('../controller/nhom.controller');
const user_controller = require('../controller/user.controller');
const sale_Controller = require('../controller/sale.controller');
const login_controller = require('../controller/login_controller');
const trang_thai_controller = require('../controller/trang_thai_controller');
const thong_bao_controller = require('../controller/thong_bao.controller');
const admin_controller = require('../controller/admin_controller');
const login_admin_controller = require('../controller/login_admin.controller');
const hoa_hong_controller = require('../controller/hoa_hong.controller');
const hop_dong_tra_thuong_controller = require('../controller/hop_dong.controller');
const phieu_thong_tin_controller = require('../controller/phieu_thong_tin.controller');
const khach_hang_Controller = require('../controller/khach_hang.controller');
const lich_su_tra_thuong_controller = require('../controller/lich_su.controller');
const APP_USER_CONTROLLER = require('../controller/app_user_controller');


router.get('/login',APP_USER_CONTROLLER.GET_LOGIN )
router.get('/home/:_id', APP_USER_CONTROLLER.loginRequired, APP_USER_CONTROLLER.GET_HOME);
router.get('/profile/:_id', APP_USER_CONTROLLER.loginRequired, APP_USER_CONTROLLER.GET_PROFILE);
router.get('/history/:_id', APP_USER_CONTROLLER.loginRequired, APP_USER_CONTROLLER.GET_HISTORY);
router.get('/contract/:_id', APP_USER_CONTROLLER.loginRequired, APP_USER_CONTROLLER.GET_CONTRACT);
router.get('/support/:_id', APP_USER_CONTROLLER.loginRequired, APP_USER_CONTROLLER.GET_SUPPORT);

router.get('/',APP_USER_CONTROLLER.chekc_token, APP_USER_CONTROLLER.GET_LOGIN );
router.get('/*', APP_USER_CONTROLLER.GET_LOGIN ); 

router.post('/login_app',APP_USER_CONTROLLER.check_app_user)

module.exports = router;