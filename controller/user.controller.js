const UserSchema = require('../models/user.model');
const Lich_su_Schema = require('../models/lich_su.model');

class UserController {
    postUser(req, res) {
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
    nap_tien(req, res) {
        const lich_su = new Lich_su_Schema({
            nguoi_gui: req.body.nguoi_gui,
            ngan_hang: req.body.ngan_hang,
            trang_thai:req.body.trang_thai,
            loai_lich_su: req.body.loai_lich_su,
            so_tien: req.body.so_tien,
            ngay_giao_dich: Date.now()
        });
        lich_su.save()
        res.redirect('/tong-quan/'+ lich_su.nguoi_gui)
    }
}

module.exports = new UserController