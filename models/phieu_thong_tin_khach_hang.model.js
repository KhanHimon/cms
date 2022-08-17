const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const phieu_thong_tin_khach_hang_Schema = new Schema({
    ho_va_ten_khach_hang: { type: String },
    cmnd_cccd: { type: String },
    ngay_cap: { type: Date },
    ngay_sinh: { type: Date },
    noi_cap: {type: String},
    dan_toc: {type: String},
    dia_chi: {type: String},
    dien_thoai: {type: Number},
    email: {type: String},
    so_tai_khoan: {type: Number},
    chi_nhanh: {type: String},
    ngan_hang: {type: String},
    noi_dung_dang_ky:{type: String},
    so_tien_dau_tu:{type: Number},
    tai_san_doi_ung: {type: String},
    hinh_thuc_nhan_hd: {type: String},
    ma_gioi_thieu: {
        type: Schema.Types.ObjectId,
        ref:'Sale'
    },
    ngay_tao: {type: Date}
});


module.exports = mongoose.model('phieu_thong_tin_khach_hang', phieu_thong_tin_khach_hang_Schema);