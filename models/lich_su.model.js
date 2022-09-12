const User = require('./user.model');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Lich_su_Schema = new Schema({
    nguoi_duyet: {
        type: Schema.Types.ObjectId,
        ref:'Sale',
        required: true
    },
    hop_dong: {
        type: Schema.Types.ObjectId,
        ref:'hop_dong_dau_tu',
        required: true
    },
    trang_thai: {
        type: Schema.Types.ObjectId,
        ref: 'Trang_thai'
    },
    so_tien: { type: Number },
    ngay_tra_lai: { type: Date }
});

module.exports = mongoose.model('Lich_su', Lich_su_Schema);