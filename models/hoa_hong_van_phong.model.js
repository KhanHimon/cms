const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Hoa_hong_van_phong_Schema = new Schema({
    ten_hoa_hong_vp: { type: String },
    hoa_hong_van_phong: { type: Number },
    ngay_bat_dau: { type: Date },
    ngay_ket_thuc: { type: Date }
});

module.exports = mongoose.model('hoa_hong_van_phong', Hoa_hong_van_phong_Schema);