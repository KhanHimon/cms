const Lich_su_Schema = require('../models/lich_su.model');
const Nhom_sale_Schema = require('../models/nhom_sale.model');
const Sale_Schema = require('../models/sale.model');
const Chuc_vu_Schema = require('../models/chuc_vu.model');
const User_Schema = require('../models/user.model');
const thong_bao_Schema = require('../models/thong_bao.model');
const trang_thai_Schema = require('../models/trang_thai.model');
const Vung_Schema = require('../models/vung.model');
const Tinh_Schema = require('../models/tinh.model');
const hoa_hong_Schema = require('../models/hoa_hong_co_dinh.model');
const Hoa_hong_linh_dong_Schema = require('../models/hoa_hong_linh_dong.model');
const Hoa_hong_van_phong_Schema = require('../models/hoa_hong_van_phong.model');
const Hoa_hong_thuong_Schema = require('../models/hoa_hong_thuong.model');
const Hoa_hong_voucher_Schema = require('../models/hoa_hong_voucher.model');
const hop_dong_tra_thuong_Schema = require('../models/hop_dong_tra_thuong.model');
const gioi_thieu_sale_Schema = require('../models/gioi_thieu_sale.model');
const Hop_dong_dau_tu_Schema = require('../models/hop_dong_dau_tu.model');
const tin_tuc_Schema = require('../models/tin_tuc.model');

class admin_Controller {

  GET_DASHBOARD(req, res, next) {
    Sale_Schema.findById(req.params._id, function (err, sale) {
      Lich_su_Schema.find(function (err, lich_su) {
        User_Schema.find(function (err, khach_hang) {
          tin_tuc_Schema.find(function (err, tin_tucs) {
            trang_thai_Schema.find(function (err, trang_thai) {
              Hop_dong_dau_tu_Schema.find(function (err, hop_dong) {
                Sale_Schema.find(function (err, sales) {
                  Vung_Schema.find(function (err, vungs) {
                    Tinh_Schema.find(function (err, tinhs) {
                      if (err) throw err;
                      res.render('admin/admin.ejs', { lich_su, sale, khach_hang, tin_tucs, trang_thai, hop_dong, sales, vungs, tinhs, message: req.flash('message') });
                    })
                  })
                }).populate('nhom_kinh_doanh').populate('chuc_vu')
              }).populate('khach_hang')
            })
          }).sort({ create_date: -1 })
        })
      }).populate('nguoi_gui').populate('trang_thai')
    }).populate('chuc_vu').populate('nhom_kinh_doanh')
  }

  GET_GIOI_THIEU(req, res) {
    Sale_Schema.findById(req.params._id, function (err, sale) {
      tin_tuc_Schema.find(function (err, tin_tucs) {
        Chuc_vu_Schema.find(function (err, chuc_vus) {
          Vung_Schema.find(function (err, vungs) {
            Tinh_Schema.find(function (err, tinhs) {
              gioi_thieu_sale_Schema.find(function (err, gioi_thieu_sale) {
                if (err) throw err;
                res.render('admin/pages/sales/gioi_thieu', { sale, vungs, tinhs, tin_tucs, chuc_vus, gioi_thieu_sale, message: req.flash('message') });
              }).populate('chuc_vu').populate('nhom_kinh_doanh')
            })
          })
        })
      }).sort({ create_date: -1 })
    }).populate('chuc_vu').populate('nhom_kinh_doanh')
  }


  GET_CAP_DUOI(req, res) {
    Sale_Schema.findById(req.params._id, function (err, sale) {
      tin_tuc_Schema.find(function (err, tin_tucs) {
        Chuc_vu_Schema.find(function (err, chuc_vus) {
          Sale_Schema.find(function (err, sales) {
            if (err) throw err;
            res.render('admin/pages/sales/cap_duoi', { sale, tin_tucs, chuc_vus, sales, message: req.flash('message') });
          }).populate('chuc_vu').populate('nhom_kinh_doanh')
        })
      }).sort({ create_date: -1 })
    }).populate('chuc_vu').populate('nhom_kinh_doanh')
  }


  POST_GIOI_THIEU(req, res) {
    const gioi_thieu_sale = new gioi_thieu_sale_Schema({
      ho_va_ten: req.body.ho_va_ten,
      nam_sinh: req.body.nam_sinh,
      cmnd_cccd: req.body.cmnd_cccd,
      noi_cap: req.body.noi_cap,
      ngay_cap: req.body.ngay_cap,
      dan_toc: req.body.dan_toc,
      so_tai_khoan: req.body.so_tai_khoan,
      ngan_hang: req.body.ngan_hang,
      chi_nhanh: req.body.chi_nhanh,
      dien_thoai: req.body.dien_thoai,
      email: req.body.email,
      dia_chi: req.body.dia_chi,
      ma_code: req.body.ma_code,
      nhom_kinh_doanh: req.body.nhom_kinh_doanh,
      chuc_vu: req.body.chuc_vu,
      vung: req.body.vung,
      tinh: req.body.tinh,
      nguoi_them: req.body.nguoi_them,
      ghi_chu: req.body.ghi_chu,
      create_date: Date.now()
    });
    gioi_thieu_sale_Schema.find({ cmnd_cccd: req.body.cmnd_cccd }).then(resp => {
      if (resp.length != 0) {
        req.flash('message', 'Nhân sự : ' + gioi_thieu_sale.ho_va_ten + " đã tồn tại");
        res.redirect(req.get('referer'));
      } else {
        gioi_thieu_sale.save();
        console.log(gioi_thieu_sale.ho_va_ten)
        req.flash('message', 'Thêm mới nhân sự mới : ' + gioi_thieu_sale.ho_va_ten + " thành công , chờ duyệt nhân sự");
        res.redirect(req.get('referer'));
      }
    });
  }


  thong_tin_ca_nhan(req, res) {
    Sale_Schema.findById(req.params._id, function (err, sale) {
      Nhom_sale_Schema.find(function (err, nhom_sale) {
        Chuc_vu_Schema.find(function (err, chuc_vu) {
          Sale_Schema.find(function (err, sales) {
            User_Schema.find(function (err, khach_hang) {
              tin_tuc_Schema.find(function (err, tin_tucs) {
                if (err) throw err;
                res.render('admin/pages/thong_tin_ca_nhan', { sale, chuc_vu, nhom_sale, sales, tin_tucs, khach_hang });
              })
            })
          }).populate('nhom_kinh_doanh').populate('chuc_vu')
        })
      })
    }).populate('chuc_vu')
  }

  them_trang_thai(req, res) {
    const trang_thai = new trang_thai_Schema({
      ten_trang_thai: req.body.ten_trang_thai,
    });
    trang_thai.save();
    res.json(trang_thai);
  }
  trang_thai(req, res) {
    trang_thai_Schema.find({}, function (err, trang_thai) {
      res.json(trang_thai);
    })
  }
  them_nhan_vien(req, res) {
    const sale = new Sale_Schema({
      username_sale: req.body.username_sale,
      password_sale: req.body.password_sale,
      email: req.body.email,
      nam_sinh: req.body.nam_sinh,
      dia_chi: req.body.dia_chi,
      dien_thoai: req.body.dien_thoai,
      ho_va_ten: req.body.ho_va_ten,
      nhom_kinh_doanh: req.body.nhom_kinh_doanh,
      chuc_vu: req.body.chuc_vu
    });
    sale.save();
    res.redirect(req.get('referer'));
  }
  them_nhom_kinh_doanh(req, res) {
    const nhom_sale = new Nhom_sale_Schema({
      ten_nhom: req.body.ten_nhom
    })
    nhom_sale.save();
    res.json(nhom_sale)

  }
  them_chuc_vu(req, res) {
    const chuc_vu = new Chuc_vu_Schema({
      ten_chuc_vu: req.body.ten_chuc_vu,
      hoa_hong_chuc_vu: req.body.hoa_hong_chuc_vu
    })
    chuc_vu.save();
    res.redirect(req.get('referer'));

  }

  tong_tien(req, res) {
    UserSchema.find(function (err, khach_hang) {
      if (err) throw err;
      console.log(khach_hang.wallet_basic)
    });

  }
}

module.exports = new admin_Controller