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

var mongoose = require('mongoose'),
  jwt = require('jsonwebtoken');
const { token } = require('morgan');

class APP_USER_CONTROLLER {

    GET_LOGIN(req,res){
        res.render('app/app_login_users');
    }

    GET_HOME(req,res){
      User_Schema.findById(req.params._id, function (err, user) {
          Hop_dong_dau_tu_Schema.find(function(err, hop_dongs){
            if (err) console.log(err);
            res.render('app/app_users', { user, hop_dongs });
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
            // res.status(401).json({ message: 'Authentication failed. User not found.' });
            res.render('/app/login',{ message: 'Sai tài khoản hoặc mật khẩu' });
          } else if (user) {
            if (!user.password) {
              // res.status(401).json({ message: 'Authentication failed. Wrong password.' });
              res.render('/app/login');
            } else {
              res.cookie('token', jwt.sign({ username: user.username, _id: user._id }, 'RESTFULAPIs'));
              return res.redirect('/app/home/' + user._id);
            }
          }
        });
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
      logout(req,res,next){
        res.clearCookie('token');
        return res.redirect('/app/login');
      }

}

module.exports = new APP_USER_CONTROLLER