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
    res.render('app/app_login_users', { message: req.flash('message') });
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

  GET_PROFILE_DETAIL(req, res) {
    User_Schema.findById(req.params._id, function (err, user) {
      Hop_dong_dau_tu_Schema.find(function (err, hop_dongs) {
        if (err) console.log(err);
        res.render('app/pages/profile_detail', { user, hop_dongs });
      }).populate('khach_hang').populate('trang_thai')
    })
  }

  GET_EDIT_PROFILE(req, res) {
    User_Schema.findById(req.params._id, function (err, user) {
      Hop_dong_dau_tu_Schema.find(function (err, hop_dongs) {
        if (err) console.log(err);
        res.render('app/pages/edit_profile', { user, hop_dongs });
      }).populate('khach_hang').populate('trang_thai')
    })
  }

  GET_BANK_ACCOUNT(req, res) {
    User_Schema.findById(req.params._id, function (err, user) {
      Hop_dong_dau_tu_Schema.find(function (err, hop_dongs) {
        if (err) console.log(err);
        res.render('app/pages/bank_account', { user, hop_dongs });
      }).populate('khach_hang').populate('trang_thai')
    })
  }

  GET_TUTORIAL(req, res) {
    User_Schema.findById(req.params._id, function (err, user) {
      Hop_dong_dau_tu_Schema.find(function (err, hop_dongs) {
        if (err) console.log(err);
        res.render('app/pages/tutorial', { user, hop_dongs });
      }).populate('khach_hang').populate('trang_thai')
    })
  }

  GET_CHANGE_PASSWORD(req, res) {
    User_Schema.findById(req.params._id, function (err, user) {
      Hop_dong_dau_tu_Schema.find(function (err, hop_dongs) {
        if (err) console.log(err);
        res.render('app/pages/change_password', { user, hop_dongs, message: req.flash('message') });
      }).populate('khach_hang').populate('trang_thai')
    })
  }

  GET_UPDATE(req,res){
    User_Schema.findById(req.params._id, function (err, user) {
      Hop_dong_dau_tu_Schema.find(function (err, hop_dongs) {
        if (err) console.log(err);
        res.render('app/pages/update', { user, hop_dongs, message: req.flash('message') });
      }).populate('khach_hang').populate('trang_thai')
    })
  }

  // POST

  POST_EDIT_PROFILE(req, res) {
    var edit_profile = {};
    if (req.body.ho_va_ten) {
      edit_profile.ho_va_ten = req.body.ho_va_ten;
    }
    if (req.body.dan_toc) {
      edit_profile.dan_toc = req.body.dan_toc;
    }
    if (req.body.nam_sinh) {
      edit_profile.nam_sinh = req.body.nam_sinh;
    }
    if (req.body.so_dien_thoai) {
      edit_profile.so_dien_thoai = req.body.so_dien_thoai;
    }
    if (req.body.cccd_cmnd) {
      edit_profile.cccd_cmnd = req.body.cccd_cmnd;
    }
    if (req.body.ngay_cap) {
      edit_profile.ngay_cap = req.body.ngay_cap;
    }
    if (req.body.noi_cap) {
      edit_profile.noi_cap = req.body.noi_cap;
    }
    if (req.body.dia_chi) {
      edit_profile.dia_chi = req.body.dia_chi;
    }
    if (req.body.email) {
      edit_profile.email = req.body.email;
    }

    const options = {
      new: true,
    }
    User_Schema.findByIdAndUpdate(req.params._id, { $set: edit_profile }, options, (err, update_profile) => {
      console.log(update_profile);
      req.flash('message', 'Chỉnh sửa thành công');
      res.redirect(req.get('referer'));
    });
  }

  CHANGE_PASSWORD(req, res) {
    User_Schema.findOne({
      password: req.body.password,
    }, function (err, user) {
      if (err) throw err;
      if (!user) {
        req.flash('message', "Mật khẩu hiện tại không chính xác");
        res.redirect(req.get('referer'));
      } else {
        var change_password = {};
        if (req.body.password_new) {
          change_password.password = req.body.password_new;
        }

        const options = {
          new: true,
        }
        User_Schema.findByIdAndUpdate(req.params._id, { $set: change_password }, options, (err, update_password) => {
          if (err) throw err;
          console.log(update_password);
          req.flash('message', 'Đổi mật khẩu thành công');
          res.redirect(req.get('referer'));
        });
      }
    });
  }


  // LOGIN

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
  chekc_token(req, res) {
    var token = req.cookies.token
    User_Schema.findOne({}, function (err, user) {
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