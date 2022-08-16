const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Hoa_hong_voucher_Schema = new Schema({
    ten_hoa_hong_voucher: { type: String },
    hoa_hong_voucher: { type: Number },
    ngay_bat_dau: { type: Date },
    ngay_ket_thuc: { type: Date }
});

module.exports = mongoose.model('hoa_hong_voucher', Hoa_hong_voucher_Schema);