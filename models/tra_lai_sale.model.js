const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Tra_lai_sale_Schema = new Schema({
    ma_hop_dong: { type: String },
    so_tien_dau_tu: { type: Number },
    khach_hang: { type: String },
    cmnd_cccd: { type: String },
    sale_truc_tiep: {
        ho_va_ten: { type: String },
        chuc_vu: { type: String },
        tien_thuong: { type: String },
        cmnd_cccd: { type: String },
    },
    thuong_gian_tiep: [
        {
            nhan_vien_kinh_doanh: {type: String},
            chuc_vu: { type: String },
            cmnd_cccd: { type: String },
            tien_thuong: { type: String }
        },
        {
            truong_nhom_kinh_doanh: {type: String},
            chuc_vu: { type: String },
            cmnd_cccd: { type: String },
            tien_thuong: { type: String }
        },
        {
            truong_phong_kinh_doanh: {type: String},
            chuc_vu: { type: String },
            cmnd_cccd: { type: String },
            tien_thuong: { type: String }
        },
        {
            pho_giam_doc_kinh_doanh: {type: String},
            chuc_vu: { type: String },
            cmnd_cccd: { type: String },
            tien_thuong: { type: String }
        },
        {
            giam_doc_kinh_doanh: {type: String},
            chuc_vu: { type: String },
            cmnd_cccd: { type: String },
            tien_thuong: { type: String }
        },
        {
            giam_doc_vung: {type: String},
            chuc_vu: { type: String },
            cmnd_cccd: { type: String },
            tien_thuong: { type: String }
        },
        {
            giam_doc_tinh: {type: String},
            chuc_vu: { type: String },
            cmnd_cccd: { type: String },
            tien_thuong: { type: String }
        },
        {
            giam_doc_chien_luoc: {type: String},
            chuc_vu: { type: String },
            cmnd_cccd: { type: String },
            tien_thuong: { type: String }
        },
    ],
    create_date: { type: Date }
})

module.exports = mongoose.model('hop_dong_dau_tu', Tra_lai_sale_Schema);