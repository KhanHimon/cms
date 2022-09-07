const UserSchema = require('../models/user.model');
const tin_tuc_Schema = require('../models/tin_tuc.model');

class tin_tuc_controller {
    hien_thi_tin_tuc(req,res){
        UserSchema.findById(req.params._id, function (err, user) {
            tin_tuc_Schema.find(function(err, tin_tucs){
              if (err) console.log(err);
              res.render('pages/tin_tuc', { user, tin_tucs });
            })
        })
    }
}

module.exports = new tin_tuc_controller