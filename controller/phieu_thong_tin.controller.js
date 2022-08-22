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
    sua_thong_tin(res,req){
        var edit_phieu_thong_tin = {};
        // if (req.body.ho_va_ten_khach_hang) {
        //     edit_phieu_thong_tin.ho_va_ten_khach_hang = req.body.ho_va_ten_khach_hang;
        // }
        if (req.body.cmnd_cccd) {
            edit_phieu_thong_tin.cmnd_cccd = req.body.cmnd_cccd;
        }
        if (req.body.ngay_cap) {
            edit_phieu_thong_tin.ngay_cap = req.body.ngay_cap;
        }
        if (req.body.ngay_sinh) {
            edit_phieu_thong_tin.ngay_sinh = req.body.ngay_sinh;
        }
        if (req.body.noi_cap) {
            edit_phieu_thong_tin.noi_cap = req.body.noi_cap;
        }
        if (req.body.dan_toc) {
            edit_phieu_thong_tin.dan_toc = req.body.dan_toc;
        }
        if (req.body.dia_chi) {
            edit_phieu_thong_tin.dia_chi = req.body.dia_chi;
        }
        if (req.body.dien_thoai) {
            edit_phieu_thong_tin.dien_thoai = req.body.dien_thoai;
        }
        if (req.body.email) {
            edit_phieu_thong_tin.email = req.body.email;
        }
        if (req.body.so_tai_khoan) {
            edit_phieu_thong_tin.so_tai_khoan = req.body.so_tai_khoan;
        }
        if (req.body.chi_nhanh) {
            edit_phieu_thong_tin.chi_nhanh = req.body.chi_nhanh;
        }
        if (req.body.ngan_hang) {
            edit_phieu_thong_tin.ngan_hang = req.body.ngan_hang;
        }
        if (req.body.noi_dung_dang_ky) {
            edit_phieu_thong_tin.noi_dung_dang_ky = req.body.noi_dung_dang_ky;
        }
        if (req.body.so_tien_dau_tu) {
            edit_phieu_thong_tin.so_tien_dau_tu = req.body.so_tien_dau_tu;
        }
        if (req.body.tai_san_doi_ung) {
            edit_phieu_thong_tin.tai_san_doi_ung = req.body.tai_san_doi_ung;
        }
        if (req.body.hinh_thuc_nhan_hd) {
            edit_phieu_thong_tin.hinh_thuc_nhan_hd = req.body.hinh_thuc_nhan_hd;
        }
        const options = {
            new: true,
        }
        phieu_thong_tin_khach_hang_Schema.findByIdAndUpdate(req.params._id, { $set: edit_phieu_thong_tin }, options, (err, update_phieu_thong_tin) => {
            console.log(update_phieu_thong_tin);
            res.redirect(req.get('referer'));
        });
    }
}

module.exports = new phieu_thong_tin_controller