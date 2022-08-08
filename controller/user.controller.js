const UserSchema = require('../models/user.model');

class UserController {
    postUser(req,res){
        const user = new UserSchema({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            nam_sinh: req.body.nam_sinh,
            dia_chi: req.body.dia_chi,
            so_dien_thoai: req.body.so_dien_thoai,
            ho_va_ten: req.body.ho_va_ten,
            ma_gioi_thieu: req.body.ma_gioi_thieu,
            cccd_cmnd: req.body.cccd_cmnd,
            wallet: {
                wallet_basic: 0,
                wallet_ocopshop: 0
            }
        });
        user.save();
        res.render('pages/kiem_tra');
    }
}

module.exports = new UserController