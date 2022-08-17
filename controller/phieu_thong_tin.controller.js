const phieu_thong_tin_khach_hang_Schema = require('../models/phieu_thong_tin_khach_hang.model');

class phieu_thong_tin_controller {
    them_thong_tin(req,res){
        const new_phieu_thong_tin = new phieu_thong_tin_khach_hang_Schema({
            ho_va_ten_khach_hang: req.body.ho_va_ten_khach_hang,
            cmnd_cccd: req.body.cmnd_cccd,
            ngay_cap: req.body.ngay_cap,
            ngay_sinh: req.body.ngay_sinh,
            noi_cap: req.body.noi_cap,
            dan_toc: req.body.dan_toc,
            dia_chi: req.body.dia_chi,
            dien_thoai: req.body.dien_thoai,
            email: req.body.email,
            so_tai_khoan: req.body.so_tai_khoan,
            chi_nhanh: req.body.chi_nhanh,
            ngan_hang: req.body.ngan_hang,
            noi_dung_dang_ky: req.body.noi_dung_dang_ky,
            so_tien_dau_tu:req.body.so_tien_dau_tu,
            tai_san_doi_ung: req.body.tai_san_doi_ung,
            hinh_thuc_nhan_hd: req.body.hinh_thuc_nhan_hd,
            ma_gioi_thieu: req.body.ma_gioi_thieu,
            trang_thai: req.body.trang_thai,
            ngay_tao: Date.now()
        });
        console.log(new_phieu_thong_tin);
        new_phieu_thong_tin.save();
        res.redirect(req.get('referer'));
    }
}

module.exports = new phieu_thong_tin_controller