const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gioi_thieu_sale_Schema = new Schema({
    ho_va_ten: { type: String },
    nam_sinh: { type: String },
    dien_thoai: { type: Number },
    email: { type: String },
    dia_chi: { type: String },
    cmnd_cccd: {type: String},
    noi_cap: { type: String },
    ngay_cap: { type: Date },
    dan_toc: {type: String},
    so_tai_khoan: { type: String, default: "Chưa có" },
    ngan_hang: { type: String, default: "Chưa có" },
    chi_nhanh: { type: String, default: "Chưa có" },
    ma_code: {type: String},
    trang_thai_quyet_dinh: {type: String},
    ghi_chu: { type: String },
    nguoi_them: {type: String},
    nhom_kinh_doanh: {
        type: Schema.Types.ObjectId,
        ref:'Nhom_sale'
    },
    chuc_vu:{
        type: Schema.Types.ObjectId,
        ref:'Chuc_vu'
    },
    create_date: { type: Date }
});


module.exports = mongoose.model('gioi_thieu_sale', gioi_thieu_sale_Schema);