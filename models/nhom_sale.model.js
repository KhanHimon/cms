const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Nhom_sale_Schema = new Schema({
    ten_nhom: { type: String }
});


module.exports = mongoose.model('Nhom_sale', Nhom_sale_Schema);