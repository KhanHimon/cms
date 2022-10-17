const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ho_tro_Schema = new Schema({
    khach_hang: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    trang_thai: {type: String},
    noi_dung: { type: String },
    tra_loi: {type: String},
    ngay_tao: { type: Date }
});

module.exports = mongoose.model('ho_tro', ho_tro_Schema);