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
const Hop_dong_dau_tu_Schema = require('../models/hop_dong_dau_tu.model');
const Vung_Schema = require('../models/vung.model');
const Tinh_Schema = require('../models/tinh.model');
const tin_tuc_Schema = require('../models/tin_tuc.model');
const Tra_lai_sale_Schema = require('../models/tra_lai_sale.model');

var mongoose = require('mongoose'),
  jwt = require('jsonwebtoken');
const { token_sale } = require('morgan');

class APP_SALE_CONTROLLER {

  GET_LOGIN_SALE(req, res) {
    res.render('app_sale/app_login_sale', { message: req.flash('message') });
  }

  GET_HOME_SALE(req, res) {
    Sale_Schema.findById(req.params._id, function (err, sale) {
      User_Schema.find(function (err, users) {
        Hop_dong_dau_tu_Schema.find(function (err, hop_dongs) {
          tin_tuc_Schema.find(function (err, tin_tucs) {
            if (err) console.log(err);
            res.render('app_sale/app_sale', { users, hop_dongs, tin_tucs, sale });
          })
        }).populate('khach_hang').populate('trang_thai')
      })
    })
  }

  GET_KHACH_HANG_SALE(req, res) {
    Sale_Schema.findById(req.params._id, function (err, sale) {
      User_Schema.find(function (err, users) {
        Hop_dong_dau_tu_Schema.find(function (err, hop_dongs) {
          if (err) console.log(err);
          res.render('app_sale/pages/khach_hang', { hop_dongs, users, sale });
        }).populate('khach_hang').populate('trang_thai')
      })
    })
  }

  GET_HOA_HONG(req, res) {
    Sale_Schema.findById(req.params._id, function (err, sale) {
      User_Schema.find(function (err, users) {
        Hop_dong_dau_tu_Schema.find(function (err, hop_dongs) {
          Tra_lai_sale_Schema.find(function (err, hoa_hongs){
            if (err) console.log(err);
            res.render('app_sale/pages/tra_lai', { hop_dongs, users, sale, hoa_hongs });
          });
        }).populate('khach_hang').populate('trang_thai')
      })
    })
  }

















  check_app_sale(req, res) {
    Sale_Schema.findOne({
      username_sale: req.body.username_sale,
      password_sale: req.body.password_sale,
    }, function (err, sale) {
      if (err) throw err;
      if (!sale) {
        req.flash('message', "Sai tài khoản hoặc mật khẩu");
        res.render('app_sale/app_login_sale', { message: req.flash('message') });
      } else if (sale) {
        if (!sale.password_sale) {
          req.flash('message', "Sai tài khoản hoặc mật khẩu");
          res.render('app_sale/app_login_sale', { message: req.flash('message') });
        } else {
          res.cookie('token_sale', jwt.sign({ username_sale: sale.username_sale, _id: sale._id }, 'RESTFULAPIs'));
          return res.redirect('/sale/home/' + sale._id);
        }
      }
    });
  }
  chekc_sale(req, res) {
    var token_sale = req.cookies.token_sale
    Sale_Schema.findOne({}, function (err, sale) {
      if (token_sale) {
        res.cookie('token_sale', jwt.sign({ username_sale: sale.username_sale, _id: sale._id }, 'RESTFULAPIs'));
        res.redirect('/sale/home/' + sale._id);
      } else {
        res.redirect('/sale/login');
      }
    })

  }

  loginRequired(req, res, next) {
    var token_sale = req.cookies.token_sale
    const sale = Sale_Schema.findOne({})
    if (token_sale) {
      next()
    } else {
      res.redirect('/sale/login');
    }
  };
  logout(req, res, next) {
    res.clearCookie('token_sale');
    return res.redirect('/sale/login');
  }
}

module.exports = new APP_SALE_CONTROLLER