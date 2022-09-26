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
        // res.status(401).json({ message: 'Authentication failed. User not found.' });
        res.render('login',{ message: 'Sai tài khoản hoặc mật khẩu' });
      } else if (user) {
        if (!user.password) {
          // res.status(401).json({ message: 'Authentication failed. Wrong password.' });
          res.render('login');
        } else {
          res.cookie('token', jwt.sign({ username: user.username, _id: user._id }, 'RESTFULAPIs'));
          return res.redirect('/tong-quan/' + user._id);
        }
      }
    });
  }

  check_app(req, res) {
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Content-Type');
    res.header('Access-Control-Allow-Methods','GET','POST','PUT','DELETE','OPTIONS');
    UserSchema.findOne({
      username: req.body.username,
      password: req.body.password,
    }, function (err, user) {
      if (err) throw err;
      if (!user) {
        // res.status(401).json({ message: 'Authentication failed. User not found.' });
        console.log("Sai tài khoản hoặc mật khẩu");
      } else if (user) {
        if (!user.password) {
          // res.status(401).json({ message: 'Authentication failed. Wrong password.' });
          console.log("Sai tài khoản hoặc mật khẩu");
        } else {
          res.cookie('token', jwt.sign({ username: user.username, _id: user._id }, 'RESTFULAPIs'));
          console.log("Đăng nhập thành công");
        }
      }
    });
  }

  loginRequired(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
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