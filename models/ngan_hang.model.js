const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ngan_hang_Schema = new Schema({
    ten_ngan_hang: { type: String },
    chu_tai_khoan: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    so_tai_khoan: {type: Number}
});

module.exports = mongoose.model('ngan_hang', ngan_hang_Schema);