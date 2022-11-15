const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Tra_lai_sale_Schema = new Schema({
    ma_hop_dong: { type: String },
    so_tien_dau_tu: { type: Number },
    khach_hang: { type: String },
    cmnd_cccd_khach_hang: { type: String },
    sale_truc_tiep: {
        ho_va_ten: { type: String },
        chuc_vu: { type: String },
        tien_thuong: { type: String },
        hoa_hong: { type: Number },
        cmnd_cccd_sale: { type: String },
    },
    nhan_vien_kinh_doanh: { type: String, default: 'Không' },
    chuc_vu_nhan_vien: { type: String, default: 'Không' },
    cmnd_cccd_nhan_vien: { type: String, default: 'Không' },
    hoa_hong_nhan_vien: { type: Number, default: 0 },
    tien_thuong_nhan_vien: { type: String, default: 0 },

    truong_nhom_kinh_doanh: { type: String, default: 'Không' },
    chuc_vu_truong_nhom: { type: String, default: 'Không' },
    cmnd_cccd_truong_nhom: { type: String, default: 'Không' },
    hoa_hong_truong_nhom: { type: Number, default: 0 },
    tien_thuong_truong_nhom: { type: String, default: 0 },

    truong_phong_kinh_doanh: { type: String, default: 'Không' },
    chuc_vu_truong_phong: { type: String, default: 'Không' },
    cmnd_cccd_truong_phong: { type: String, default: 'Không' },
    hoa_hong_truong_phong: { type: Number, default: 0 },
    tien_thuong_truong_phong: { type: String, default: 0 },

    pho_giam_doc_kinh_doanh: { type: String, default: 'Không' },
    chuc_vu_pho_giam_doc: { type: String, default: 'Không' },
    cmnd_cccd_pho_giam_doc: { type: String, default: 'Không' },
    hoa_hong_pho_giam_doc: { type: Number, default: 0 },
    tien_thuong_pho_giam_doc: { type: String, default: 0 },

    giam_doc_kinh_doanh: { type: String, default: 'Không' },
    chuc_vu_giam_doc: { type: String, default: 'Không' },
    cmnd_cccd_giam_doc: { type: String, default: 'Không' },
    hoa_hong_giam_doc: { type: Number, default: 0 },
    tien_thuong_giam_doc: { type: String, default: 0 },

    giam_doc_vung: { type: String, default: 'Không' },
    chuc_vu_giam_doc_vung: { type: String, default: 'Không' },
    cmnd_cccd_giam_doc_vung: { type: String, default: 'Không' },
    hoa_hong_giam_doc_vung: { type: Number, default: 0 },
    tien_thuong_giam_doc_vung: { type: String, default: 0 },

    giam_doc_tinh: { type: String, default: 'Không' },
    chuc_vu_giam_doc_tinh: { type: String, default: 'Không' },
    cmnd_cccd_giam_doc_tinh: { type: String, default: 'Không' },
    hoa_hong_giam_doc_tinh: { type: Number, default: 0 },
    tien_thuong_giam_doc_tinh: { type: String, default: 0 },

    giam_doc_chien_luoc: { type: String, default: 'Không' },
    chuc_vu_giam_doc_chien_luoc: { type: String, default: 'Không' },
    cmnd_cccd_giam_doc_chien_luoc: { type: String, default: 'Không' },
    hoa_hong_giam_doc_chien_luoc: { type: Number, default: 0 },
    tien_thuong_giam_doc_chien_luoc: { type: String, default: 0 },
    trang_thai_tra_lai: {type: String},
    create_date: { type: Date }
})

module.exports = mongoose.model('tra_lai_sale', Tra_lai_sale_Schema);