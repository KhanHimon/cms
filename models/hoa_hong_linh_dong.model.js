const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Hoa_hong_linh_dong_Schema = new Schema({
    ten_hoa_hong: { type: String },
    hoa_hong_linh_dong: { type: Number },
    ngay_bat_dau: { type: Date },
    ngay_ket_thuc: { type: Date }
});

module.exports = mongoose.model('hoa_hong_linh_dong', Hoa_hong_linh_dong_Schema);