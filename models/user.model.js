const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User_Schema = new Schema({
    username: { type: String },
    password: { type: String },
    ho_va_ten: { type: String },
    cccd_cmnd: { type: String },
    nam_sinh: { type: String },
    dia_chi: { type: String },
    so_dien_thoai: { type: Number },
    email: { type: String },
    loai_tai_khoan: {
        role: {type: String}
    },
    wallet: {
        wallet_basic: { type: Number },
        wallet_ocopshop: { type: Number },
        ngay_nap: { type: Date }
    },
    ma_gioi_thieu: { type: Number },
    dau_tu: {
        du_an: {
            ten_du_an: { type: String }
        },
        tien_dau_tu: { type: Number },
        ngay_bat_dau: { type: Date },
        ngay_ket_thuc: { type: Date }
    }
});


module.exports = mongoose.model('User', User_Schema);