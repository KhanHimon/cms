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

var mongoose = require('mongoose'),
  jwt = require('jsonwebtoken');
const { token } = require('morgan');

class APP_USER_CONTROLLER {

  GET_LOGIN(req, res) {
    res.render('app/app_login_users',{message: req.flash('message') });
  }

  GET_HOME(req, res) {
    User_Schema.findById(req.params._id, function (err, user) {
      Hop_dong_dau_tu_Schema.find(function (err, hop_dongs) {
        if (err) console.log(err);
        res.render('app/app_users', { user, hop_dongs });
      }).populate('khach_hang').populate('trang_thai')
    })
  }

  GET_NEWS(req, res) {
    User_Schema.findById(req.params._id, function (err, user) {
      Hop_dong_dau_tu_Schema.find(function (err, hop_dongs) {
        if (err) console.log(err);
        res.render('app/pages/news', { user, hop_dongs });
      }).populate('khach_hang').populate('trang_thai')
    })
  }

  GET_PROFILE(req, res) {
    User_Schema.findById(req.params._id, function (err, user) {
      Hop_dong_dau_tu_Schema.find(function (err, hop_dongs) {
        if (err) console.log(err);
        res.render('app/pages/profile', { user, hop_dongs });
      }).populate('khach_hang').populate('trang_thai')
    })
  }

  GET_HISTORY(req, res) {
    User_Schema.findById(req.params._id, function (err, user) {
      Hop_dong_dau_tu_Schema.find(function (err, hop_dongs) {
        Lich_su_Schema.find(function (err, lich_sus) {
          if (err) console.log(err);
          res.render('app/pages/history', { user, hop_dongs, lich_sus });
        }).populate('nguoi_duyet').populate('trang_thai').sort({ ngay_tra_lai: -1 }).populate({
          path: 'hop_dong',
          populate: {
            path: 'khach_hang'
          }
        })
      }).populate('khach_hang').populate('trang_thai')
    })
  }

  GET_CONTRACT(req, res) {
    User_Schema.findById(req.params._id, function (err, user) {
      Hop_dong_dau_tu_Schema.find(function (err, hop_dongs) {
        if (err) console.log(err);
        res.render('app/pages/contract', { user, hop_dongs });
      }).populate('khach_hang').populate('trang_thai')
    })
  }

  GET_CONTRACT_DETAILS(req, res) {
    User_Schema.findById(req.params._id, function (err, user) {
      Hop_dong_dau_tu_Schema.findById(req.params.id, function (err, hop_dong) {
        if (err) console.log(err);
        res.render('app/pages/contract_detail', { user, hop_dong });
        console.log(hop_dong)
      }).populate('khach_hang').populate('trang_thai')
    })
  }

  GET_SUPPORT(req, res) {
    User_Schema.findById(req.params._id, function (err, user) {
      Hop_dong_dau_tu_Schema.find(function (err, hop_dongs) {
        if (err) console.log(err);
        res.render('app/pages/support', { user, hop_dongs });
      }).populate('khach_hang').populate('trang_thai')
    })
  }

  check_app_user(req, res) {
    User_Schema.findOne({
      username: req.body.username,
      password: req.body.password,
    }, function (err, user) {
      if (err) throw err;
      if (!user) {
        req.flash('message', "Sai tài khoản hoặc mật khẩu");
        res.render('./app/app_login_users', { message: req.flash('message') });
      } else if (user) {
        if (!user.password) {
          req.flash('message', "Sai tài khoản hoặc mật khẩu");
          res.render('./app/app_login_users', { message: req.flash('message') });
        } else {
          res.cookie('token', jwt.sign({ username: user.username, _id: user._id }, 'RESTFULAPIs'));
          return res.redirect('/app/home/' + user._id);
        }
      }
    });
  }
  chekc_token(req,res){
    var token = req.cookies.token
    User_Schema.findOne({}, function(err,user){
      if (token) {
        res.cookie('token', jwt.sign({ username: user.username, _id: user._id }, 'RESTFULAPIs'));
        res.redirect('/app/home/' + user._id);
      } else {
        res.redirect('/app/login');
      }
    })
  }

  loginRequired(req, res, next) {
    var token = req.cookies.token
    const user = User_Schema.findOne({})
    if (token) {
      next()
    } else {
      res.redirect('/app/login');
    }
  };
  logout(req, res, next) {
    res.clearCookie('token');
    return res.redirect('/app/login');
  }

}

module.exports = new APP_USER_CONTROLLER