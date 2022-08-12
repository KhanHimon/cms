const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const thong_bao_Schema = new Schema({
    tieu_de_thong_bao: { type: String },
    mo_ta_thong_bao: { type: String },
    noi_dung_thong_bao: { type: String },
    ngay_thong_bao: {type: Date}
});

module.exports = mongoose.model('Thong_bao', thong_bao_Schema);