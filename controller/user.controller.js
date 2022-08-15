const UserSchema = require('../models/user.model');
const Lich_su_Schema = require('../models/lich_su.model');
const ngan_hang_Schema = require('../models/ngan_hang.model');

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
    xu_ly_nap_tien(req,res){
        var edit_lich_su = {};
        if (req.body.trang_thai) {
            edit_lich_su.trang_thai = req.body.trang_thai;
        }
        const options = {
            new: true,
        }
        Lich_su_Schema.findByIdAndUpdate(req.params._id, { $set: edit_lich_su }, options, (err, update_lich_su) => {
            console.log(update_lich_su);
            res.redirect(req.get('referer'));
        });
    }
    xoa_lich_xu(req,res){
        const options = {
            new: true,
            useFindAndModify: false
        }
        Lich_su_Schema.findByIdAndRemove(req.params._id, options, function (lich_su) {
            console.log(lich_su);
            res.redirect(req.get('referer'));
        });
    }
    them_tai_khoan_ngan_hang(req,res){
        const ngan_hang = new ngan_hang_Schema({
            ten_ngan_hang: req.body.ten_ngan_hang,
            chu_tai_khoan: req.body.chu_tai_khoan,
            so_tai_khoan: req.body.so_tai_khoan
        });
        ngan_hang.save();
        res.json(ngan_hang)
    }
}

module.exports = new UserController