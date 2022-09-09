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


class khach_hang_Controller {
  hien_thi(req, res) {
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
  }
  hien_thi_chi_tiet(req, res) {
    Sale_Schema.findById(req.params._id, function (err, sale) {
      User_Schema.findById(req.params.id, function (err, khach_hang_chi_tiet) {
        thong_bao_Schema.find(function (err, thong_bao) {
          Hop_dong_dau_tu_Schema.find(function (err, hop_dong) {
            if (err) throw err;
            // res.json(khach_hang_chi_tiet)
            res.render('admin/pages/chi_tiet_khach_hang', { message: req.flash('message'), sale, thong_bao, khach_hang_chi_tiet, hop_dong });
          }).populate('khach_hang').populate('trang_thai')
        })
      })
    }).populate('chuc_vu')
  }

  them_moi_khach_hang(req, res) {
    const user = new User_Schema({
      username: "NDT" + Math.floor(Math.random() * 1000),
      password: Math.floor(Math.random() * 100000),
      ho_va_ten: req.body.ho_va_ten,
      cccd_cmnd: req.body.cccd_cmnd,
      noi_cap: req.body.noi_cap,
      ngay_cap: req.body.ngay_cap,
      nam_sinh: req.body.nam_sinh,
      dia_chi: req.body.dia_chi,
      dan_toc: req.body.dan_toc,
      vung: req.body.vung,
      tinh: req.body.tinh,
      huyen: req.body.huyen,
      xa: req.body.xa,
      so_tai_khoan: req.body.so_tai_khoan,
      ngan_hang: req.body.ngan_hang,
      chi_nhanh: req.body.chi_nhanh,
      so_dien_thoai: req.body.so_dien_thoai,
      ma_gioi_thieu: req.body.ma_gioi_thieu,
      email: req.body.email,
      ngay_tham_gia: Date().now
    });
    console.log(user)
    user.save();
    res.redirect(req.get('referer'));
  }

  thay_doi_thong_tin(req, res) {
    var edit_khach_hang = {};
    if (req.body.ho_va_ten) {
      edit_khach_hang.ho_va_ten = req.body.ho_va_ten;
    }
    if (req.body.cccd_cmnd) {
      edit_khach_hang.cccd_cmnd = req.body.cccd_cmnd; 
    }
    if (req.body.noi_cap) {
      edit_khach_hang.noi_cap = req.body.noi_cap;
    }
    if (req.body.dia_chi) {
      edit_khach_hang.dia_chi = req.body.dia_chi;
    }
    if (req.body.dan_toc) {
      edit_khach_hang.dan_toc = req.body.dan_toc;
    }
    if (req.body.so_tai_khoan) {
      edit_khach_hang.so_tai_khoan = req.body.so_tai_khoan;
    }
    if (req.body.ngan_hang) {
      edit_khach_hang.ngan_hang = req.body.ngan_hang;
    }
    if (req.body.chi_nhanh) {
      edit_khach_hang.chi_nhanh = req.body.chi_nhanh;
    }
    if (req.body.so_dien_thoai) {
      edit_khach_hang.so_dien_thoai = req.body.so_dien_thoai;
    }
    if (req.body.ma_gioi_thieu) {
      edit_khach_hang.ma_gioi_thieu = req.body.ma_gioi_thieu;
    }
    if (req.body.email) {
      edit_khach_hang.email = req.body.email;
    }
    const options = {
      new: true,
    }
    User_Schema.findByIdAndUpdate(req.params._id, { $set: edit_khach_hang }, options, (err, update_khach_hang) => {
      console.log(update_khach_hang);
      req.flash('message', 'Chỉnh sửa thành công');
      res.redirect(req.get('referer'));
    });
  }

  xoa_khach_hang(req, res) {
    const options = {
      new: true,
      useFindAndModify: false
    }
    User_Schema.findByIdAndDelete(req.params._id, options, function (khach_hang) {
      console.log(khach_hang);
      res.redirect(req.get('referer'));
    });
  }
}

module.exports = new khach_hang_Controller