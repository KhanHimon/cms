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
const Vung_Schema = require('../models/vung.model');
const Tinh_Schema = require('../models/tinh.model');

var mongoose = require('mongoose'),
  jwt = require('jsonwebtoken');
const { token_sale } = require('morgan');

class APP_SALE_CONTROLLER {

    GET_LOGIN_SALE(req, res) {
        res.render('app_sale/app_login_sale');
      }

    GET_HOME_SALE(req, res) {
        Sale_Schema.findById(req.params._id, function (err, sale) {
            thong_bao_Schema.find(function (err, thong_bao) {
                Sale_Schema.find(function (err, sales) {
                    Vung_Schema.find(function (err, vungs) {
                        Tinh_Schema.find(function (err, tinhs) {
                            Nhom_sale_Schema.find(function (err, nhoms) {
                                Chuc_vu_Schema.find(function (err, chuc_vus) {
                                    if (err) throw err;
                                    res.render('app_sale/app_sale', { sale, thong_bao, sales, vungs, tinhs, nhoms, chuc_vus, message: req.flash('message') });
                                })
                            })
                        })
                    })
                }).populate('chuc_vu').populate('nhom_kinh_doanh').sort({ 'create_date': -1 })
            })
        }).populate('chuc_vu').populate('nhom_kinh_doanh')
    }

    check_app_sale(req, res) {
        Sale_Schema.findOne({
          username_sale: req.body.username_sale,
          password_sale: req.body.password_sale,
        }, function (err, sale) {
          if (err) throw err;
          if (!sale) {
            res.render('app_sale/app_login_sale', { message: 'Sai tài khoản hoặc mật khẩu' });
          } else if (sale) {
            if (!sale.password_sale) {
              res.redirect('/sale/login');
            } else {
              res.cookie('token_sale', jwt.sign({ username_sale: sale.username_sale, _id: sale._id }, 'RESTFULAPIs'));
              return res.redirect('/sale/home/' + sale._id);
            }
          }
        });
      }
      chekc_sale(req,res){
        var token_sale = req.cookies.token_sale
        Sale_Schema.findOne({}, function(err,sale){
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