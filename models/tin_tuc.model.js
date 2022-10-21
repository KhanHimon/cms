const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tin_tuc_Schema = new Schema({
    tieu_de: { type: String},
    anh_dai_dien: { type: String},
    mo_ta: { type: String},
    noi_dung: { type: String},
    url: {type: String},
    create_date: { type: Date}
})

module.exports = mongoose.model('Tin_tuc', tin_tuc_Schema);