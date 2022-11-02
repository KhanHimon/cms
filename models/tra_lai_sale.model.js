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
        hoa_hong: { type: Number },
        cmnd_cccd: { type: String },
    },
    nhan_vien_kinh_doanh: { type: String },
    chuc_vu_nhan_vien: { type: String },
    cmnd_cccd_nhan_vien: { type: String },
    hoa_hong_nhan_vien: { type: Number },
    tien_thuong_nhan_vien: { type: String },

    truong_nhom_kinh_doanh: { type: String },
    chuc_vu_truong_nhom: { type: String },
    cmnd_cccd_truong_nhom: { type: String },
    hoa_hong_truong_nhom: { type: Number },
    tien_thuong_truong_nhom: { type: String },

    truong_phong_kinh_doanh: { type: String },
    chuc_vu_truong_phong: { type: String },
    cmnd_cccd_truong_phong: { type: String },
    hoa_hong_truong_phong: { type: Number },
    tien_thuong_truong_phong: { type: String },

    pho_giam_doc_kinh_doanh: { type: String },
    chuc_vu_pho_giam_doc: { type: String },
    cmnd_cccd_pho_giam_doc: { type: String },
    hoa_hong_pho_giam_doc: { type: Number },
    tien_thuong_pho_giam_doc: { type: String },

    giam_doc_kinh_doanh: { type: String },
    chuc_vu_giam_doc: { type: String },
    cmnd_cccd_giam_doc: { type: String },
    hoa_hong_giam_doc: { type: Number },
    tien_thuong_giam_doc: { type: String },

    giam_doc_vung: { type: String },
    chuc_vu_giam_doc_vung: { type: String },
    cmnd_cccd_giam_doc_vung: { type: String },
    hoa_hong_giam_doc_vung: { type: Number },
    tien_thuong_giam_doc_vung: { type: String },

    giam_doc_tinh: { type: String },
    chuc_vu_giam_doc_tinh: { type: String },
    cmnd_cccd_giam_doc_tinh: { type: String },
    hoa_hong_giam_doc_tinh: { type: Number },
    tien_thuong_giam_doc_tinh: { type: String },

    giam_doc_chien_luoc: { type: String },
    chuc_vu_giam_doc_chien_luoc: { type: String },
    cmnd_cccd_giam_doc_chien_luoc: { type: String },
    hoa_hong_giam_doc_chien_luoc: { type: Number },
    tien_thuong_giam_doc_chien_luoc: { type: String },
    create_date: { type: Date }
})

module.exports = mongoose.model('tra_lai_sale', Tra_lai_sale_Schema);