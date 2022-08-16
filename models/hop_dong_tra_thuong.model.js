const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hop_dong_tra_thuong_Schema = new Schema({
    sale: {
        type: Schema.Types.ObjectId,
        ref:'Sale',
    },
    so_hop_dong: { type: String },
    gia_tri_hop_dong:{ type: Number },
    khach_hang: {
        type: Schema.Types.ObjectId,
        ref:'User',
    },
    hoa_hong_thuong: {
        type: Schema.Types.ObjectId,
        ref:'hoa_hong_thuong',
    },
    hoa_hong_gian_tiep: {
        type: Schema.Types.ObjectId,
        ref:'hoa_hong_linh_dong',
    },
    hoa_hong_voucher: {
        type: Schema.Types.ObjectId,
        ref:'hoa_hong_voucher',
    }
});

module.exports = mongoose.model('hop_dong_tra_thuong', hop_dong_tra_thuong_Schema);