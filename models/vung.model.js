const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Vung_Schema = new Schema({
    ten_vung: { type: String},
    create_date: { type: Date}
})

module.exports = mongoose.model('Vung', Vung_Schema);