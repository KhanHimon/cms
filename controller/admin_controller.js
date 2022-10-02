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
const phieu_thong_tin_khach_hang_Schema = require('../models/phieu_thong_tin_khach_hang.model');
const Hop_dong_dau_tu_Schema = require('../models/hop_dong_dau_tu.model');

class admin_Controller {

  GET_DASHBOARD(req, res, next) {
    Sale_Schema.findById(req.params._id, function (err, sale) {
      Lich_su_Schema.find(function (err, lich_su) {
        User_Schema.find(function (err, khach_hang) {
          thong_bao_Schema.find(function (err, thong_bao) {
            trang_thai_Schema.find(function (err, trang_thai) {
              Hop_dong_dau_tu_Schema.find(function (err, hop_dong) {
                Sale_Schema.find(function (err, sales) {
                  Vung_Schema.find(function (err, vungs) {
                    Tinh_Schema.find(function (err, tinhs) {
                      if (err) throw err;
                      res.render('admin/admin.ejs', { lich_su, sale, khach_hang, thong_bao, trang_thai, hop_dong, sales, vungs, tinhs });
                    })
                  })
                }).populate('nhom_kinh_doanh').populate('chuc_vu')
              }).populate('khach_hang')
            })
          }).sort({ ngay_thong_bao: -1 })
        })
      }).populate('nguoi_gui').populate('trang_thai')
    }).populate('chuc_vu').populate('nhom_kinh_doanh')
  }







  thong_tin_ca_nhan(req, res) {
    Sale_Schema.findById(req.params._id, function (err, sale) {
      Nhom_sale_Schema.find(function (err, nhom_sale) {
        Chuc_vu_Schema.find(function (err, chuc_vu) {
          Sale_Schema.find(function (err, sales) {
            User_Schema.find(function (err, khach_hang) {
              thong_bao_Schema.find(function (err, thong_bao) {
                if (err) throw err;
                res.render('admin/pages/thong_tin_ca_nhan', { sale, chuc_vu, nhom_sale, sales, thong_bao, khach_hang });
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