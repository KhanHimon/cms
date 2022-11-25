var express = require('express');
var router = express.Router();

const APP_SALE_CONTROLLER = require('../controller/app_sale_controller');

router.get('/login',APP_SALE_CONTROLLER.GET_LOGIN_SALE );
router.get('/home/:_id', APP_SALE_CONTROLLER.loginRequired, APP_SALE_CONTROLLER.GET_HOME_SALE);
router.get('/thong-tin-ca-nhan/:_id',APP_SALE_CONTROLLER.GET_PROFILE_SALE );
router.get('/khach-hang/:_id',APP_SALE_CONTROLLER.GET_KHACH_HANG_SALE );
router.get('/khach-hang=:id/:_id',APP_SALE_CONTROLLER.GET_PROFILE_KHACH_HANG_SALE );
router.get('/hoa-hong/:_id',APP_SALE_CONTROLLER.GET_HOA_HONG );
router.get('/doi-mat-khau/:_id',APP_SALE_CONTROLLER.GET_DOI_MAT_KHAU );
router.post('/doi-mat-khau/:_id',APP_SALE_CONTROLLER.POST_MAT_KHAU_MOI );
router.get('/danh-sach-hop-dong/:_id',APP_SALE_CONTROLLER.GET_HOP_DONG );
router.get('/hop-dong=:id/:_id',APP_SALE_CONTROLLER.GET_DETAIL_HOP_DONG );
router.get('/tin-tuc/:_id',APP_SALE_CONTROLLER.GET_TIN_TUC );
router.get('/tin-tuc-chi-tiet=:id/:_id',APP_SALE_CONTROLLER.GET_CHI_TIET_TIN_TUC );

router.get('/',APP_SALE_CONTROLLER.chekc_sale, APP_SALE_CONTROLLER.GET_LOGIN_SALE );
router.get('/*', APP_SALE_CONTROLLER.GET_LOGIN_SALE ); 

router.post('/login_app',APP_SALE_CONTROLLER.check_app_sale);


module.exports = router;