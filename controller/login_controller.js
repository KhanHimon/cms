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
          return res.render('pages/tong_quan', {user});
        }
      }
    });
  }
  loginRequired(req, res, next) {
    var token = req.cookies.token
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