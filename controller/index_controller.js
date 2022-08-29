const UserSchema = require('../models/user.model');
const Hop_dong_dau_tu_Schema = require('../models/hop_dong_dau_tu.model');

class index_controller {
    get_user(req, res, next) {
        UserSchema.findById(req.params.id, function(err, user){
            if (err) console.log(err);
            res.render('pages/thong_tin_ca_nhan', user);
        })
    }
    get_user_tong_quan(req, res, next) {
        UserSchema.findById(req.params.id, function(err, user){
            if (err) console.log(err);
            res.render('pages/tong_quan', user);
          })
    }

    hien_thi_tong_quan(req,res){
        UserSchema.findById(req.params.id, function(err, user){
            Hop_dong_dau_tu_Schema.find(function(err, hop_dongs){
                if (err) console.log(err);
                res.render('pages/tong_quan', { user, hop_dongs });
            })
        })
    }
}

module.exports = new index_controller