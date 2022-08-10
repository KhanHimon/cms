const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Sale_Schema = new Schema({
    username_sale: { type: String },
    password_sale: { type: String },
    ho_va_ten: { type: String },
    nam_sinh: { type: String },
    dien_thoai: { type: Number },
    email: { type: String },
    dia_chi: { type: String },
    nhom_kinh_doanh: {
        type: Schema.Types.ObjectId,
        ref:'Nhom_sale',
        required: true
    },
    chuc_vu:{
        type: Schema.Types.ObjectId,
        ref:'Chuc_vu',
        required: true
    }
});


module.exports = mongoose.model('Sale', Sale_Schema);