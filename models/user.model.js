const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User_Schema = new Schema({
    username: { type: String },
    password: { type: String },
    ho_va_ten: { type: String },
    cccd_cmnd: { type: String },
    cmnd_cccd_mat_truoc: { type: String },
    cmnd_cccd_mat_sau: { type: String },
    noi_cap: { type: String },
    ngay_cap: { type: Date },
    nam_sinh: { type: String },
    dia_chi: { type: String },
    dan_toc: { type: String },
    vung: {type: String},
    tinh: {type: String},
    huyen: {type: String},
    xa: { type: String },
    so_tai_khoan: { type: String },
    ngan_hang: { type: String },
    chi_nhanh: { type: String },
    so_dien_thoai: { type: Number },
    thuong_dau_tu: { type: Number },
    email: { type: String },
    wallet: {
        wallet_basic: { type: Number },
        wallet_ocopshop: { type: Number },
        ngay_nap: { type: Date }
    },
    ma_gioi_thieu: { type: String },
    dau_tu: {
        du_an: {
            ten_du_an: { type: String }
        },
        tien_dau_tu: { type: Number },
        ngay_bat_dau: { type: Date },
        ngay_ket_thuc: { type: Date }
    },
    ngay_tham_gia: { type: Date}
});


module.exports = mongoose.model('User', User_Schema);