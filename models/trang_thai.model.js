const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trang_thai_Schema = new Schema({
    ten_trang_thai: { type: String }
});

module.exports = mongoose.model('Trang_thai', trang_thai_Schema);