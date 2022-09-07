const UserSchema = require('../models/user.model');
const Hop_dong_dau_tu_Schema = require('../models/hop_dong_dau_tu.model');
const tin_tuc_Schema = require('../models/tin_tuc.model');

class index_controller {
    hien_thi_thong_tin_ca_nhan(req,res){
        UserSchema.findById(req.params._id, function (err, user) {
            Hop_dong_dau_tu_Schema.find(function(err, hop_dongs){
              if (err) console.log(err);
              res.render('pages/thong_tin_ca_nhan', { user, hop_dongs });
            }).populate('khach_hang').populate('trang_thai')
        })
    }

    hien_thi_tong_quan(req,res){
        UserSchema.findById(req.params._id, function (err, user) {
            Hop_dong_dau_tu_Schema.find(function(err, hop_dongs){
              if (err) console.log(err);
              res.render('pages/tong_quan', { user, hop_dongs });
            }).populate('khach_hang').populate('trang_thai')
        })
    }

    hien_thi_hop_dong_dau_tu(req,res){
        UserSchema.findById(req.params._id, function (err, user) {
            Hop_dong_dau_tu_Schema.find(function(err, hop_dongs){
              if (err) console.log(err);
              res.render('pages/hop_dong_dau_tu', { user, hop_dongs });
            }).populate('khach_hang').populate('trang_thai')
        })
    }

    hien_thi_tin_tuc(req,res){
        UserSchema.findById(req.params._id, function (err, user) {
            tin_tuc_Schema.find(function(err, tin_tucs){
              if (err) console.log(err);
              res.render('pages/tin_tuc', { user, tin_tucs });
            })
        })
    }

    API_hop_dong_dau_tu(req,res){
        Hop_dong_dau_tu_Schema.find(function(err, hop_dongs){
            if (err) console.log(err);
            res.json(hop_dongs);
          }).populate('khach_hang')
    }
}

module.exports = new index_controller