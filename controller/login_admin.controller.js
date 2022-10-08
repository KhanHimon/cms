const Sale_Schema = require('../models/sale.model');
var mongoose = require('mongoose'),
  jwt = require('jsonwebtoken');
const { token_admin } = require('morgan');

class Login_Admin_Comtroller {
  check(req, res) {
    Sale_Schema.findOne({
      username_sale: req.body.username_sale,
      password_sale: req.body.password_sale,
    }, function (err, sale) {
      if (err) throw err;
      if (!sale) {
        req.flash('message', "Sai tài khoản hoặc mật khẩu");
        res.render('admin/login_admin',{ message: req.flash('message') });
      } else if (sale) {
        if (!sale.password_sale) {
          req.flash('message', "Sai tài khoản hoặc mật khẩu");
        res.render('admin/login_admin',{ message: req.flash('message') });
        } else {
          res.cookie('token_admin', jwt.sign({ username_sale: sale.username_sale, _id: sale._id }, 'RESTFULAPIs'));
          return res.redirect('/admin/dashboard/' + sale._id);
        }
      }
    });
  }

  check_token(req,res){
    var token_admin = req.cookies.token_admin
    Sale_Schema.findOne({}, function(err,sale){
      if (token_admin) {
        res.cookie('token_admin', jwt.sign({ username_sale: sale.username_sale, _id: sale._id }, 'RESTFULAPIs'));
        return res.redirect('/admin/dashboard/' + sale._id);
      } else {
        return res.redirect('/admin/login');
      }
    })
  }

  loginRequired(req, res, next) {
    var token_admin = req.cookies.token_admin
    const sale = Sale_Schema.findOne({})
    if (token_admin) {
      next()
    } else {
      res.redirect('/admin/login');
    }
  };
  logout(req,res,next){
    res.clearCookie('token_admin');
    return res.redirect('/admin/login');
  }
  
}

module.exports = new Login_Admin_Comtroller