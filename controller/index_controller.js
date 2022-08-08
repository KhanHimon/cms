const UserSchema = require('../models/user.model');

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
}

module.exports = new index_controller