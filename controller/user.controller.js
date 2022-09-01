const User_Schema = require('../models/user.model');
const Lich_su_Schema = require('../models/lich_su.model');
const ngan_hang_Schema = require('../models/ngan_hang.model');

class UserController {
    thay_doi_thong_tin(req, res) {
        var edit_khach_hang = {};
        if (req.body.ho_va_ten) {
          edit_khach_hang.ho_va_ten = req.body.ho_va_ten;
        }
        if (req.body.cccd_cmnd) {
          edit_khach_hang.cccd_cmnd = req.body.cccd_cmnd;
        }
        if (req.body.noi_cap) {
          edit_khach_hang.noi_cap = req.body.noi_cap;
        }
        if (req.body.dia_chi) {
          edit_khach_hang.dia_chi = req.body.dia_chi;
        }
        if (req.body.dan_toc) {
          edit_khach_hang.dan_toc = req.body.dan_toc;
        }
        if (req.body.so_tai_khoan) {
          edit_khach_hang.so_tai_khoan = req.body.so_tai_khoan;
        }
        if (req.body.ngan_hang) {
          edit_khach_hang.ngan_hang = req.body.ngan_hang;
        }
        if (req.body.chi_nhanh) {
          edit_khach_hang.chi_nhanh = req.body.chi_nhanh;
        }
        if (req.body.so_dien_thoai) {
          edit_khach_hang.so_dien_thoai = req.body.so_dien_thoai;
        }
        if (req.body.ma_gioi_thieu) {
          edit_khach_hang.ma_gioi_thieu = req.body.ma_gioi_thieu;
        }
        if (req.body.email) {
          edit_khach_hang.email = req.body.email;
        }
        const options = {
          new: true,
        }
        User_Schema.findByIdAndUpdate(req.params.id, { $set: edit_khach_hang }, options, (err, update_khach_hang) => {
          console.log(update_khach_hang);
          res.redirect(req.get('referer'));
        });
      }
}

module.exports = new UserController