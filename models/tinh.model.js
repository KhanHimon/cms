const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Tinh_Schema = new Schema({
    vung:{
        type: Schema.Types.ObjectId,
        ref:'Vung',
        required: true
    },
    ten_tinh: { type: String},
    create_date: { type: Date}
})

module.exports = mongoose.model('Tinh', Tinh_Schema);