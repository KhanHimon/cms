const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const Hop_dong_dau_tu_Schema = new Schema({
    ma_hop_dong: { type: String },
    so_tien_dau_tu: { type: Number }, 
    khach_hang: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    ngay_ky_hop_dong: { 
        type: Date ,
        default: Date.now
    },
    thoi_han_dau_tu: { type: Number },
    tien_ocopshop: { type: Number },
    loi_nhuan: {
        thang_dau: { type: Number} ,
        thang: { type : Number},
        thang_cuoi: { type : Number}
    },
    ngay_het_hop_dong: { 
        type: Date ,
        default: Date.now
    },
    trang_thai: {
        type: Schema.Types.ObjectId,
        ref: 'Trang_thai'
    }
});

module.exports = mongoose.model('hop_dong_dau_tu', Hop_dong_dau_tu_Schema);