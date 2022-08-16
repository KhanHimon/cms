const hop_dong_tra_thuong_Schema = require('../models/hop_dong_tra_thuong.model');

class hop_dong_tra_thuong_controller {
    them_hop_dong_tra_thuong(req,res) {
        const new_hop_dong_tra_thuong = new hop_dong_tra_thuong_Schema({
            sale : req.body.sale,
            so_hop_dong : req.body.so_hop_dong,
            khach_hang: req.body.khach_hang,
            hoa_hong_thuong: req.body.hoa_hong_thuong,
            hoa_hong_gian_tiep: req.body.hoa_hong_gian_tiep,
            hoa_hong_voucher: req.body.hoa_hong_voucher,
            gia_tri_hop_dong: req.body.gia_tri_hop_dong
        });
        console.log(new_hop_dong_tra_thuong);
        new_hop_dong_tra_thuong.save();
        res.redirect(req.get('referer'));
    }
}

module.exports = new hop_dong_tra_thuong_controller