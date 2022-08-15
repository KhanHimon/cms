const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Hoa_hong_Schema = new Schema({
    chinh_sach_hoa_hong: { type: String },
    hoa_hong: { type: Number }
});

module.exports = mongoose.model('hoa_hong', Hoa_hong_Schema);