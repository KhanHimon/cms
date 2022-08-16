const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Hoa_hong_thuong_Schema = new Schema({
    ten_hoa_hong_thuong: { type: String },
    hoa_hong_thuong: { type: Number },
    ngay_bat_dau: { type: Date },
    ngay_ket_thuc: { type: Date }
});

module.exports = mongoose.model('hoa_hong_thuong', Hoa_hong_thuong_Schema);