const UserSchema = require('../models/user.model');
var mongoose = require('mongoose'),
  jwt = require('jsonwebtoken');
const { token } = require('morgan');

class LoginComtroller {
  check(req, res) {
    
    UserSchema.findOne({
      username: req.body.username,
      password: req.body.password,
    }, function (err, user) {
      if (err) throw err;
      if (!user) {
        req.flash('message', "Sai tài khoản hoặc mật khẩu");
        res.render('login',{ message: req.flash('message') });
      } else if (user) {
        if (!user.password) {
          req.flash('message', "Sai tài khoản hoặc mật khẩu");
          res.render('login',{ message: req.flash('message') });
        } else {
          res.cookie('token', jwt.sign({ username: user.username, _id: user._id }, 'RESTFULAPIs'));
          return res.redirect('/tong-quan/' + user._id);
        }
      }
    });
  }

  check_app(req, res) {
    UserSchema.findOne({
      username: req.body.username,
      password: req.body.password,
    }, function (err, user) {
      if (err) throw err;
      if (!user) {
        console.log("Sai tài khoản hoặc mật khẩu");
      } else if (user) {
        if (!user.password) {
          console.log("Sai tài khoản hoặc mật khẩu");
        } else {
          res.cookie('token', jwt.sign({ username: user.username, _id: user._id }, 'RESTFULAPIs'));
          console.log("Đăng nhập thành công");
        }
      }
    });
  }

  check_token(req,res){
    var token = req.cookies.token
    UserSchema.findOne({}, function(err,user){
      if (token) {
        res.cookie('token', jwt.sign({ username: user.username, _id: user._id }, 'RESTFULAPIs'));
        return res.redirect('/tong-quan/' + user._id);
      } else {
        res.render('login',{ message: req.flash('message') });
      }
    })
  }

  loginRequired(req, res, next) {
    var token = req.cookies.token
    const user = UserSchema.findOne({})
    if (token) {
      next()
    } else {
      res.redirect('/login');
    }
  };
  logout(req,res,next){
    res.clearCookie('token');
    return res.redirect('/login');
  }
  
}

module.exports = new LoginComtroller