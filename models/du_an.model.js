const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Du_an_Schema = new Schema({
    ten_du_an: { type: String },
    tong_muc_dau_tu: {type: Number},
    dien_tich: {type: String},
    gioi_thieu:{type: String},
    nha_thau: {type: String},
    quy_mo:{type: String},
    ki_ot: {type: String},
    dia_chi: {type: String}
});

module.exports = mongoose.model('du_an', Du_an_Schema);