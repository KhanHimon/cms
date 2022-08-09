const User = require('./user.model');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Lich_su_Schema = new Schema({
    nguoi_gui: {
        type: Schema.Types.ObjectId,
        ref:'User',
        required: true
     },
    trang_thai: {
        type: Schema.Types.ObjectId,
        ref:'Trang_thai',
        required: true
    },
    ngan_hang: { type: String },
    loai_lich_su: { type: String },
    so_tien: { type: Number },
    ngay_giao_dich: { type: Date }
});

module.exports = mongoose.model('Lich_su', Lich_su_Schema);