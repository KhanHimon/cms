var express = require('express');
var router = express.Router();

const user_controller = require('../controller/user.controller');
const login_controller = require('../controller/login_controller');
const Lich_su_Schema = require('../models/lich_su.model');
const Nhom_sale_Schema = require('../models/nhom_sale.model');
const Sale_Schema = require('../models/sale.model');
const Chuc_vu_Schema = require('../models/chuc_vu.model');
const User_Schema = require('../models/user.model');
const thong_bao_Schema = require('../models/thong_bao.model');
const trang_thai_controller = require('../controller/trang_thai_controller');
const thong_bao_controller = require('../controller/thong_bao.controller');
const admin_controller = require('../controller/admin_controller');
const login_admin_controller = require('../controller/login_admin.controller');

/* GET users listing. */
router.get('/', login_admin_controller.loginRequired, function (req, res, next) {
  res.render('admin/admin.ejs');
});
router.get('/dashboard/:_id', login_admin_controller.loginRequired, function (req, res, next) {
  Sale_Schema.findById(req.params._id, function (err, sale) {
    Lich_su_Schema.find(function (err, lich_su) {
      User_Schema.find(function (err, khach_hang) {
        thong_bao_Schema.find(function (err, thong_bao) {
          if (err) throw err;
          res.render('admin/admin.ejs', { lich_su, sale, khach_hang, thong_bao });
        })
      })
    }).populate('nguoi_gui')
  }).populate('chuc_vu')
});
router.get('/quan-ly-giao-dich/:_id', login_admin_controller.loginRequired, function (req, res, next) {
  Sale_Schema.findById(req.params._id, function (err, sale) {
    Lich_su_Schema.find(function (err, lich_su) {
      thong_bao_Schema.find(function (err, thong_bao) {
        if (err) throw err;
        res.render('admin/pages/quan_ly_giao_dich', { lich_su, sale, thong_bao });
      })
    }).populate('nguoi_gui')
  }).populate('chuc_vu')
});

router.get('/quan-ly-thong-bao/:_id', login_admin_controller.loginRequired, function (req, res, next) {
  Sale_Schema.findById(req.params._id, function (err, sale) {
    thong_bao_Schema.find(function (err, thong_bao) {
      if (err) throw err;
      res.render('admin/pages/quan_ly_thong_bao', { thong_bao, sale });
    })
  }).populate('chuc_vu')
});

router.get('/quan-ly-du-an/:_id', login_admin_controller.loginRequired, function (req, res, next) {
  Sale_Schema.findById(req.params._id, function (err, sale) {
    thong_bao_Schema.find(function (err, thong_bao) {
      if (err) throw err;
      res.render('admin/pages/quan_ly_du_an', { thong_bao, sale });
    })
  }).populate('chuc_vu')
});

router.get('/login', function (req, res, next) {
  res.render('admin/login_admin');
})

router.get('/quan-ly-sale/:_id', login_admin_controller.loginRequired, function (req, res, next) {
  Sale_Schema.findById(req.params._id, function (err, sale) {
    Nhom_sale_Schema.find(function (err, nhom_sale) {
      Chuc_vu_Schema.find(function (err, chuc_vu) {
        Sale_Schema.find(function (err, sales) {
          thong_bao_Schema.find(function (err, thong_bao) {
            if (err) throw err;
            res.render('admin/pages/quan_ly_sale', { sale, chuc_vu, nhom_sale, sales, thong_bao });
          })
        }).populate('nhom_kinh_doanh').populate('chuc_vu')
      })
    })
  }).populate('chuc_vu')
});

router.get('/quan-ly-doi-nhom/:_id', login_admin_controller.loginRequired, function (req, res, next) {
  Sale_Schema.findById(req.params._id, function (err, sale) {
    Nhom_sale_Schema.find(function (err, nhom_sale) {
      Chuc_vu_Schema.find(function (err, chuc_vu) {
        Sale_Schema.find(function (err, sales) {
          thong_bao_Schema.find(function (err, thong_bao) {
            if (err) throw err;
            res.render('admin/pages/quan_ly_doi_nhom', { sale, chuc_vu, nhom_sale, sales, thong_bao });
          })
        }).populate('nhom_kinh_doanh').populate('chuc_vu')
      })
    })
  }).populate('chuc_vu')
});

router.get('/quan-ly-khach-hang-sale/:_id', login_admin_controller.loginRequired, function (req, res, next) {
  Sale_Schema.findById(req.params._id, function (err, sale) {
    Nhom_sale_Schema.find(function (err, nhom_sale) {
      Chuc_vu_Schema.find(function (err, chuc_vu) {
        Sale_Schema.find(function (err, sales) {
          User_Schema.find(function (err, khach_hang) {
            thong_bao_Schema.find(function (err, thong_bao) {
              if (err) throw err;
              res.render('admin/pages/quan_ly_khach_hang_sale', { sale, chuc_vu, nhom_sale, sales, thong_bao, khach_hang });
            })
          })
        }).populate('nhom_kinh_doanh').populate('chuc_vu')
      })
    })
  }).populate('chuc_vu')
});

router.get('/cai-dat-chung/:_id', login_admin_controller.loginRequired, function (req, res, next) {
  Sale_Schema.findById(req.params._id, function (err, sale) {
    Nhom_sale_Schema.find(function (err, nhom_sale) {
      Chuc_vu_Schema.find(function (err, chuc_vu) {
        thong_bao_Schema.find(function (err, thong_bao) {
          if (err) throw err;
          res.render('admin/pages/cai_dat_chung', { sale, chuc_vu, nhom_sale, thong_bao });
        })
      })
    })
  }).populate('nhom_kinh_doanh').populate('chuc_vu')
});

router.get('/quan-ly-tai-khoan/:_id', login_admin_controller.loginRequired, function (req, res, next) {
  Sale_Schema.findById(req.params._id, function (err, sale) {
    Nhom_sale_Schema.find(function (err, nhom_sale) {
      Chuc_vu_Schema.find(function (err, chuc_vu) {
        Sale_Schema.find(function (err, sales) {
          User_Schema.find(function (err, khach_hang) {
            thong_bao_Schema.find(function (err, thong_bao) {
              if (err) throw err;
              res.render('admin/pages/quan_ly_tai_khoan', { sale, chuc_vu, nhom_sale, sales, thong_bao, khach_hang });
            })
          })
        }).populate('nhom_kinh_doanh').populate('chuc_vu')
      })
    })
  }).populate('chuc_vu')
});

router.post('/', login_admin_controller.check);

router.post('/them-trang-thai', login_admin_controller.loginRequired, trang_thai_controller.them_trang_thai);
router.post('/them-nhan-vien', login_admin_controller.loginRequired, admin_controller.them_nhan_vien);
router.post('/them-khach-hang', login_admin_controller.loginRequired, admin_controller.them_moi_khach_hang);
router.post('/them-nhom-kinh-doanh', login_admin_controller.loginRequired, admin_controller.them_nhom_kinh_doanh);
router.post('/them-chuc-vu', login_admin_controller.loginRequired, admin_controller.them_chuc_vu);
router.post('/them-thong-bao', login_admin_controller.loginRequired, thong_bao_controller.them_thong_bao);
router.get('/trang-thai', login_admin_controller.loginRequired, trang_thai_controller.trang_thai);


module.exports = router;
