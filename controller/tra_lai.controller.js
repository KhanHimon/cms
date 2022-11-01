const User_Schema = require('../models/user.model');
const thong_bao_Schema = require('../models/thong_bao.model');
const Sale_Schema = require('../models/sale.model');
const Tra_lai_sale_Schema = require('../models/tra_lai_sale.model');

class Tra_lai_controller {
    POST_TRA_LAI(req,res){
        const new_tra_lai =  new Tra_lai_sale_Schema({
            ma_hop_dong : req.body.ma_hop_dong,
            so_tien_dau_tu : req.body.so_tien_dau_tu,
            khach_hang : req.body.khach_hang,
            cmnd_cccd : req.body.cmnd_cccd,
            sale_truc_tiep : {
                ho_va_ten: req.body.ho_va_ten,
                hoa_hong: req.body.hoa_hong,
                chuc_vu: req.body.chuc_vu,
                tien_thuong: ( req.body.so_tien_dau_tu * ( req.body.hoa_hong/100 ) ) ,
                cmnd_cccd: req.body.cmnd_cccd
            },
            // thuong_gian_tiep: 
            //     {
            //         nhan_vien_kinh_doanh: req.body.nhan_vien_kinh_doanh,
            //         hoa_hong_nhan_vien: req.body.hoa_hong_nhan_vien,
            //         chuc_vu_nhan_vien: req.body.chuc_vu_nhan_vien,
            //         tien_thuong_nhan_vien: ( req.body.so_tien_dau_tu * ((req.body.hoa_hong_nhan_vien - req.body.hoa_hong)/100) ) ,
            //         cmnd_cccd_nhan_vien: req.body.cmnd_cccd_nhan_vien,
                    
            //         truong_nhom_kinh_doanh: req.body.truong_nhom_kinh_doanh,
            //         hoa_hong_truong_nhom: req.body.hoa_hong_truong_nhom,
            //         chuc_vu_truong_nhom: req.body.chuc_vu_truong_nhom,
            //         tien_thuong_truong_nhom: ( req.body.so_tien_dau_tu * (req.body.hoa_hong_truong_nhom/100) ) ,
            //         cmnd_cccd_truong_nhom: req.body.cmnd_cccd_truong_nhom,

            //         truong_phong_kinh_doanh: req.body.truong_phong_kinh_doanh,
            //         hoa_hong_truong_phong: req.body.hoa_hong_truong_phong,
            //         chuc_vu_truong_phong: req.body.chuc_vu_truong_phong,
            //         tien_thuong_truong_phong: ( req.body.so_tien_dau_tu * ((req.body.hoa_hong_truong_phong - req.body.hoa_hong)/100) ) ,
            //         cmnd_cccd_truong_phong: req.body.cmnd_cccd_truong_phong,

            //         pho_giam_doc_kinh_doanh: req.body.pho_giam_doc_kinh_doanh,
            //         hoa_hong_pho_giam_doc: req.body.hoa_hong_pho_giam_doc,
            //         chuc_vu_pho_giam_doc: req.body.chuc_vu_pho_giam_doc,
            //         tien_thuong_pho_giam_doc: ( req.body.so_tien_dau_tu * (req.body.hoa_hong_pho_giam_doc/100) ) ,
            //         cmnd_cccd_pho_giam_doc: req.body.cmnd_cccd_pho_giam_doc,

            //         giam_doc_kinh_doanh: req.body.giam_doc_kinh_doanh,
            //         hoa_hong_giam_doc: req.body.hoa_hong_giam_doc,
            //         chuc_vu_giam_doc: req.body.chuc_vu_giam_doc,
            //         tien_thuong_giam_doc: ( req.body.so_tien_dau_tu * (req.body.hoa_hong_giam_doc/100) ) ,
            //         cmnd_cccd_giam_doc: req.body.cmnd_cccd_giam_doc
            //     }
        })
        console.log(new_tra_lai);
    }
}

module.exports = new Tra_lai_controller