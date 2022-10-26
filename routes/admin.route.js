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
const gioi_thieu_sale_Schema = require('../models/gioi_thieu_sale.model');
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
const khach_hang_Controller = require('../controller/khach_hang.controller');
const lich_su_tra_thuong_controller = require('../controller/lich_su.controller');
const support_Controller = require('../controller/support_controller');
const tin_tuc_controller = require('../controller/tin_tuc.controller');
 
 
/* ROUTER VÙNG */
router.get('/quan-ly-khu-vuc/:_id',login_admin_controller.loginRequired, vung_Controller.hien_thi);
router.post('/them-vung/',login_admin_controller.loginRequired, vung_Controller.them_vung);
/* ROUTER TỈNH */
router.post('/them-tinh/',login_admin_controller.loginRequired, vung_Controller.them_tinh);
/* ROUTER NHOM */
router.get('/danh-sach-nhom/:_id',login_admin_controller.loginRequired, nhom_Controller.hien_thi);
router.get('/chi-tiet-nhom=:id/:_id',login_admin_controller.loginRequired, nhom_Controller.chi_tiet_doi_nhom);
/* ROUTER SALE */
router.get('/danh-sach-sale/:_id',login_admin_controller.loginRequired, sale_Controller.hien_thi);
router.post('/them-nhan-vien',login_admin_controller.loginRequired, sale_Controller.them_moi_sale);
router.post('/sua-nhan-vien/:_id',login_admin_controller.loginRequired, sale_Controller.thay_doi_thong_tin_sale);
router.post('/doi-mat-khau/:_id',login_admin_controller.loginRequired, sale_Controller.doi_mat_khau_sale);
router.post('/doi-tai-khoan/:_id',login_admin_controller.loginRequired, sale_Controller.doi_username_sale);
router.get('/chi-tiet-nhan-vien=:id/:_id',login_admin_controller.loginRequired, sale_Controller.chi_tiet_sale);
/* ROUTER LỊCH SỬ */
router.get('/lich-su-tra-lai/:_id',login_admin_controller.loginRequired, lich_su_tra_thuong_controller.hien_thi_lich_su);
router.post('/check-trang-thai/:_id', hop_dong_tra_thuong_controller.check_date);
router.post('/check-trang-thai', hop_dong_tra_thuong_controller.reset_lich_su);
/* GET DASHBOARD */
router.get('/dashboard/:_id', login_admin_controller.loginRequired, admin_controller.GET_DASHBOARD);
router.get('/gioi-thieu/:_id', login_admin_controller.loginRequired, admin_controller.GET_GIOI_THIEU);
router.get('/cap-duoi/:_id', login_admin_controller.loginRequired, admin_controller.GET_CAP_DUOI);
router.post('/gioi-thieu/:_id', login_admin_controller.loginRequired, admin_controller.POST_GIOI_THIEU);
// GET HỖ TRỢ
router.get('/danh-sach-ho-tro/:_id', login_admin_controller.loginRequired, support_Controller.GET_HO_TRO);
router.post('/answer/:_id', login_admin_controller.loginRequired, support_Controller.ANSWER_HO_TRO);
// ROUTER TIN TỨC
router.get('/them-tin-tuc/:_id',login_admin_controller.loginRequired, tin_tuc_controller.hien_thi_tin_tuc );
router.get('/tin-tuc=:id/:_id',login_admin_controller.loginRequired, tin_tuc_controller.GET_DETAIL_TIN_TUC );
router.get('/danh-sach-tin-tuc/:_id',login_admin_controller.loginRequired, tin_tuc_controller.GET_DANH_SACH_TIN_TUC );
router.post('/them-tin-tuc',login_admin_controller.loginRequired, tin_tuc_controller.POST_TIN_TUC );
router.post('/xoa-tin-tuc/:_id',login_admin_controller.loginRequired, tin_tuc_controller.DELETE_TIN_TUC );


router.get('/login', function (req, res, next) {
  res.render('admin/login_admin',{ message: req.flash('message') });
})



router.get('/cai-dat-chung/:_id', login_admin_controller.loginRequired, function (req, res, next) {
  Sale_Schema.findById(req.params._id, function (err, sale) {
    Nhom_sale_Schema.find(function (err, nhom_sale) {
      Chuc_vu_Schema.find(function (err, chuc_vu) {
        thong_bao_Schema.find(function (err, thong_bao) {
          if (err) throw err;
          res.render('admin/pages/cai_dat_chung', { sale, chuc_vu, nhom_sale, thong_bao,message: req.flash('message') });
        })
      })
    })
  }).populate('nhom_kinh_doanh').populate('chuc_vu')
});

router.get('/phieu-thong-tin-khach-hang/:_id', login_admin_controller.loginRequired, function (req, res) {
  Sale_Schema.findById(req.params._id, function (err, sale) {
    thong_bao_Schema.find(function (err, thong_bao) {
      phieu_thong_tin_khach_hang_Schema.find(function (err, phieu_thong_tin) {
        if (err) throw err;
        res.render('admin/pages/phieu_thong_tin', { thong_bao, sale, phieu_thong_tin });
      }).populate('ma_gioi_thieu').populate('trang_thai').sort({ ngay_tao: -1 })
    })
  })
});

router.get('/danh-sach-phieu/:_id', login_admin_controller.loginRequired, function (req, res) {
  Sale_Schema.findById(req.params._id, function (err, sale) {
    thong_bao_Schema.find(function (err, thong_bao) {
      phieu_thong_tin_khach_hang_Schema.find(function (err, phieu_thong_tin) {
        trang_thai_Schema.find(function (err, trang_thai) {
          if (err) throw err;

          res.render('admin/pages/danh_sach_phieu', { thong_bao, sale, phieu_thong_tin, trang_thai, message: req.flash('message') });
        })
      }).populate('ma_gioi_thieu').populate('trang_thai').sort({ ngay_tao: -1 })
    })
  })
});


/** ROUTER KHÁCH HÀNG */
router.get('/quan-ly-khach-hang-sale/:_id', login_admin_controller.loginRequired, khach_hang_Controller.hien_thi);
router.post('/them-khach-hang', login_admin_controller.loginRequired, khach_hang_Controller.them_moi_khach_hang);
router.get('/thong-tin-khach-hang=:id/:_id', login_admin_controller.loginRequired, khach_hang_Controller.hien_thi_chi_tiet);
router.post('/thay-doi-thong-tin/:_id', login_admin_controller.loginRequired, khach_hang_Controller.thay_doi_thong_tin);





// router nhóm
router.post('/them-nhom-kinh-doanh', login_admin_controller.loginRequired, admin_controller.them_nhom_kinh_doanh);
// router Chức vụ
router.post('/them-chuc-vu', login_admin_controller.loginRequired, admin_controller.them_chuc_vu);
router.get('/quan-ly-chuc-vu/:_id', login_admin_controller.loginRequired, function (req, res, next) {
  Sale_Schema.findById(req.params._id, function (err, sale) {
    thong_bao_Schema.find(function (err, thong_bao) {
      Chuc_vu_Schema.find(function (err, chuc_vus) {
        hoa_hong_Schema.find(function (err, hoa_hong_co_dinh) {
          if (err) throw err;
          res.render('admin/pages/quan_ly_chuc_vu', { thong_bao, sale, chuc_vus, hoa_hong_co_dinh });
        })
      }).populate('hoa_hong_chuc_vu');
    }).sort({ ngay_thong_bao: -1 })
  }).populate('chuc_vu')
});
// router thông báo
router.post('/them-thong-bao', login_admin_controller.loginRequired, thong_bao_controller.them_thong_bao);
router.post('/xoa-thong-bao/:_id', login_admin_controller.loginRequired, thong_bao_controller.xoa_thong_bao);
router.get('/danh-sach-thong-bao/:_id', login_admin_controller.loginRequired, thong_bao_controller.GET_DANH_SACH_THONG_BAO);
router.get('/quan-ly-thong-bao/:_id', login_admin_controller.loginRequired, function (req, res, next) {
  Sale_Schema.findById(req.params._id, function (err, sale) {
    thong_bao_Schema.find(function (err, thong_bao) {
      if (err) throw err;
      res.render('admin/pages/thong_bao/quan_ly_thong_bao', { thong_bao, sale, message: req.flash('message') });
    }).sort({ ngay_thong_bao: -1 })
  }).populate('chuc_vu')
});
// router trạng thái
router.get('/trang-thai', login_admin_controller.loginRequired, trang_thai_controller.trang_thai);
router.post('/them-trang-thai', login_admin_controller.loginRequired, trang_thai_controller.them_trang_thai);


// router Trả thưởng hoa hồng

router.get('/quan-ly-tra-thuong/:_id', login_admin_controller.loginRequired, function (req, res, next) {
  Sale_Schema.findById(req.params._id, function (err, sale) {
    thong_bao_Schema.find(function (err, thong_bao) {
      Sale_Schema.find(function (err, sales) {
        Hoa_hong_linh_dong_Schema.find(function (err, hoa_hong_linh_dong) {
          Hoa_hong_thuong_Schema.find(function (err, hoa_hong_thuong) {
            Hoa_hong_voucher_Schema.find(function (err, hoa_hong_voucher) {
              User_Schema.find(function (err, khach_hang) {
                hop_dong_tra_thuong_Schema.find(function (err, hop_dongs) {
                  if (err) throw err;
                  res.render('admin/pages/quan_ly_tra_thuong', { thong_bao, sale, hoa_hong_linh_dong, hoa_hong_thuong, hoa_hong_voucher, sales, khach_hang, hop_dongs });
                }).populate('khach_hang').populate('sale').populate('hoa_hong_thuong').populate('hoa_hong_gian_tiep').populate('hoa_hong_voucher').populate({
                  path: 'sale',
                  populate: { path: 'chuc_vu' }
                }).populate({
                  path: 'sale',
                  populate: {
                    path: 'chuc_vu',
                    populate: { path: 'hoa_hong_chuc_vu' }
                  }
                })
              })
            })
          })
        })
      }).populate('chuc_vu')
    }).sort({ ngay_thong_bao: -1 })
  }).populate('chuc_vu')
});

router.post('/them-hop-dong-dau-tu', login_admin_controller.loginRequired, hop_dong_tra_thuong_controller.them_hop_dong_dau_tu);
router.post('/xoa-hop-dong/:_id', login_admin_controller.loginRequired, hop_dong_tra_thuong_controller.xoa_hop_dong_dau_tu);
router.get('/quan-ly-hop-dong/:_id', login_admin_controller.loginRequired, hop_dong_tra_thuong_controller.hien_thi_hop_dong)
router.post('/sua-trang-thai=:_id', login_admin_controller.loginRequired, hop_dong_tra_thuong_controller.phe_duyet_tra_lai);
router.get('/tra-lai-hop-dong/:_id', login_admin_controller.loginRequired, hop_dong_tra_thuong_controller.hien_thi_tra_lai)

// router hoa hồng cố định
// GET
router.get('/hoa-hong/:_id', login_admin_controller.loginRequired, function (req, res, next) {
  Sale_Schema.findById(req.params._id, function (err, sale) {
    thong_bao_Schema.find(function (err, thong_bao) {
      hoa_hong_Schema.find(function (err, hoa_hongs) {
        Hoa_hong_linh_dong_Schema.find(function (err, hoa_hong_linh_dong) {
          Hoa_hong_van_phong_Schema.find(function (err, hoa_hong_vp) {
            Hoa_hong_thuong_Schema.find(function (err, hoa_hong_thuong) {
              Hoa_hong_voucher_Schema.find(function (err, hoa_hong_voucher) {
                if (err) throw err;
                res.render('admin/pages/hoa_hong', { thong_bao, sale, hoa_hongs, hoa_hong_linh_dong, hoa_hong_vp, hoa_hong_thuong, hoa_hong_voucher });
              })
            })
          })
        })
      })
    })
  }).populate('chuc_vu')
});

// POST
router.post('/them-hoa-hong', login_admin_controller.loginRequired, hoa_hong_controller.them_hoa_hong_co_dinh);
// DELETE
router.post('/xoa-hoa-hong/:_id', login_admin_controller.loginRequired, hoa_hong_controller.xoa_hoa_hong_co_dinh);
// router hoa hồng linh động
router.post('/them-hoa-hong-linh-dong', login_admin_controller.loginRequired, hoa_hong_controller.them_hoa_hong_linh_dong);
// router hoa hồng văn phòng
router.post('/them-hoa-hong-van-phong', login_admin_controller.loginRequired, hoa_hong_controller.them_hoa_hong_van_phong);
// router hoa hồng thưởng
router.post('/them-hoa-hong-thuong', login_admin_controller.loginRequired, hoa_hong_controller.them_hoa_hong_thuong);
// router hoa hồng voucher
router.post('/them-hoa-hong-voucher', login_admin_controller.loginRequired, hoa_hong_controller.them_hoa_hong_voucher);

router.get('/thong-tin-ca-nhan=:_id', login_admin_controller.loginRequired, admin_controller.thong_tin_ca_nhan)
router.post('/', login_admin_controller.check);
router.post('/logout', login_admin_controller.logout);
router.get('/*', login_admin_controller.check_token, login_admin_controller.check);

module.exports = router;
