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
router.get('/chi-tiet-nhan-vien=:id/:_id',login_admin_controller.loginRequired, sale_Controller.chi_tiet_sale )

/* GET users listing. */
router.get('/dashboard/:_id', login_admin_controller.loginRequired, function (req, res, next) {
  Sale_Schema.findById(req.params._id, function (err, sale) {
    Lich_su_Schema.find(function (err, lich_su) {
      User_Schema.find(function (err, khach_hang) {
        thong_bao_Schema.find(function (err, thong_bao) {
          trang_thai_Schema.find(function (err, trang_thai) {
            Hop_dong_dau_tu_Schema.find(function(err, hop_dong){
              if (err) throw err;
              res.render('admin/admin.ejs', { lich_su, sale, khach_hang, thong_bao, trang_thai,hop_dong });
            })
          })
        })
      })
    }).populate('nguoi_gui').populate('trang_thai')
  }).populate('chuc_vu')
});
router.get('/quan-ly-giao-dich/:_id', login_admin_controller.loginRequired, function (req, res, next) {
  Sale_Schema.findById(req.params._id, function (err, sale) {
    Lich_su_Schema.find(function (err, lich_su) {
      thong_bao_Schema.find(function (err, thong_bao) {
        trang_thai_Schema.find(function (err, trang_thai) {
          if (err) throw err;
          res.render('admin/pages/quan_ly_giao_dich', { lich_su, sale, thong_bao, trang_thai });
        })
      })
    }).populate('nguoi_gui').populate('trang_thai')
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
        }).populate('chuc_vu').populate('nhom_kinh_doanh')
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



// router khách hàng
router.post('/them-khach-hang', login_admin_controller.loginRequired, admin_controller.them_moi_khach_hang);
router.get('/thong-tin-khach-hang=:id/:_id', login_admin_controller.loginRequired, function (req, res) {
  Sale_Schema.findById(req.params._id, function (err, sale) {
    User_Schema.findById(req.params.id, function (err, khach_hang_chi_tiet) {
      thong_bao_Schema.find(function (err, thong_bao) {
        Hop_dong_dau_tu_Schema.find(function(err, hop_dong){
          if (err) throw err;
          // res.json(khach_hang_chi_tiet)
          res.render('admin/pages/chi_tiet_khach_hang', { sale, thong_bao, khach_hang_chi_tiet, hop_dong });
        }).populate('khach_hang')
      })
    })
  }).populate('chuc_vu')
});
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
router.get('/quan-ly-thong-bao/:_id', login_admin_controller.loginRequired, function (req, res, next) {
  Sale_Schema.findById(req.params._id, function (err, sale) {
    thong_bao_Schema.find(function (err, thong_bao) {
      if (err) throw err;
      res.render('admin/pages/quan_ly_thong_bao', { thong_bao, sale });
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

router.post('/them-hop-dong', login_admin_controller.loginRequired, hop_dong_tra_thuong_controller.them_hop_dong_tra_thuong);
router.post('/them-hop-dong-dau-tu', login_admin_controller.loginRequired, hop_dong_tra_thuong_controller.them_hop_dong_dau_tu);
router.post('/xoa-hop-dong/:_id', login_admin_controller.loginRequired, hop_dong_tra_thuong_controller.xoa_hop_dong_dau_tu);
router.get('/quan-ly-hop-dong/:_id', login_admin_controller.loginRequired, function(req,res,next){
  Sale_Schema.findById(req.params._id, function (err, sale) {
    thong_bao_Schema.find(function (err, thong_bao) {
      Hop_dong_dau_tu_Schema.find(function(err, hop_dong_dau_tu){
        if (err) throw err;
        res.render('admin/pages/quan_ly_hop_dong', { thong_bao, sale, hop_dong_dau_tu, message: req.flash('message')});
      }).populate('khach_hang')
    })
  })
})

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

// 
router.post('/them-phieu-thong-tin', login_admin_controller.loginRequired, phieu_thong_tin_controller.them_thong_tin);
router.post('/sua-trang-thai-phieu/:_id', login_admin_controller.loginRequired, phieu_thong_tin_controller.xu_ly_nap_tien);

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


router.post('/nap-tien-sua/:_id', login_admin_controller.loginRequired, user_controller.xu_ly_nap_tien);
router.post('/', login_admin_controller.check);
router.get('/*', login_admin_controller.check);

module.exports = router;
