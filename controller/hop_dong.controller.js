const hop_dong_tra_thuong_Schema = require('../models/hop_dong_tra_thuong.model');
const Hop_dong_dau_tu_Schema = require('../models/hop_dong_dau_tu.model');

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
    them_hop_dong_dau_tu(req,res){
        const thang = new Date();
        const month = thang.getMonth() + 1;
        thang.setMonth(month, 0);
        const ngay_trong_thang = thang.getDate();
        console.log(month)
        const ngay_ky = Date();

        const new_hop_dong_dau_tu = new Hop_dong_dau_tu_Schema({
            ma_hop_dong : "HĐ-ĐT"+ Math.floor(Math.random() * 1000),
            so_tien_dau_tu : req.body.so_tien_dau_tu,
            khach_hang: req.body.khach_hang,
            ngay_ky_hop_dong: req.body.ngay_ky_hop_dong,
            thoi_han_dau_tu: req.body.thoi_han_dau_tu,
            tien_ocopshop: (req.body.so_tien_dau_tu * 0.025) * (10/100),
            loi_nhuan : {
                thang_dau: ((req.body.so_tien_dau_tu*0.025)/ngay_trong_thang) * ((ngay_trong_thang - new Date(req.body.ngay_ky_hop_dong).getDate()) + 1),
                thang: req.body.so_tien_dau_tu * 0.025,
                thang_cuoi: ((req.body.so_tien_dau_tu*0.025)/ngay_trong_thang) * (ngay_trong_thang - (new Date(req.body.ngay_ky_hop_dong).getDate() -2 ))
            }
        });
        req.flash('message', 'Thêm mới thành công');
        new_hop_dong_dau_tu.save();
        res.redirect(req.get('referer'));
    }

    xoa_hop_dong_dau_tu(req,res){
        const options = {
            new: true,
            useFindAndModify: false
        }
        Hop_dong_dau_tu_Schema.findByIdAndDelete(req.params._id, options, function (hop_dong) {
            console.log(hop_dong);
            req.flash('message', 'Xóa thành công');
            res.redirect(req.get('referer'));
        });
    }
}

module.exports = new hop_dong_tra_thuong_controller