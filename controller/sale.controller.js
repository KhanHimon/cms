const Sale_Schema = require('../models/sale.model');
const thong_bao_Schema = require('../models/thong_bao.model');
const Vung_Schema = require('../models/vung.model');
const Tinh_Schema = require('../models/tinh.model');
const Nhom_sale_Schema = require('../models/nhom_sale.model');
const Chuc_vu_Schema = require('../models/chuc_vu.model');
const Hop_dong_dau_tu_Schema = require('../models/hop_dong_dau_tu.model');
const UserSchema = require('../models/user.model');

class sale_Controller {

  hien_thi(req, res) {
    Sale_Schema.findById(req.params._id, function (err, sale) {
      thong_bao_Schema.find(function (err, thong_bao) {
        Sale_Schema.find(function (err, sales) {
          Vung_Schema.find(function (err, vungs) {
            Tinh_Schema.find(function (err, tinhs) {
              Nhom_sale_Schema.find(function (err, nhoms) {
                Chuc_vu_Schema.find(function (err, chuc_vus) {
                  if (err) throw err;
                  res.render('admin/pages/quan_ly_sale', { sale, thong_bao, sales, vungs, tinhs, nhoms, chuc_vus, message: req.flash('message') });
                })
              })
            })
          })
        }).populate('chuc_vu').populate('nhom_kinh_doanh').sort({ 'create_date': -1 })
      })
    }).populate('chuc_vu').populate('nhom_kinh_doanh')
  }

  chi_tiet_sale(req, res) {
    Sale_Schema.findById(req.params._id, function (err, sale) {
      thong_bao_Schema.find(function (err, thong_bao) {
        Sale_Schema.findById(req.params.id, function (err, chi_tiet_sale) {
          Hop_dong_dau_tu_Schema.find(function (err, hop_dongs) {
            UserSchema.find(function (err, khach_hangs) {
              Sale_Schema.find(function (err, sales) {
                Vung_Schema.find(function (err, vungs) {
                  Tinh_Schema.find(function (err, tinhs) {
                    Chuc_vu_Schema.find(function (err, chuc_vus) {
                      if (err) throw err;
                      res.render('admin/pages/chi_tiet_sale', {chuc_vus, tinhs, vungs, sale, thong_bao, chi_tiet_sale, hop_dongs, khach_hangs, sales });
                    })
                  })
                })
              }).populate('chuc_vu')
            })
          }).populate('khach_hang')
        }).populate('nhom_kinh_doanh').populate('chuc_vu')
      })
    })
  }

  them_moi_sale(req, res) {
    const new_sale = new Sale_Schema({
      username_sale: "SALE" + Math.floor(Math.random() * 10000000),
      password_sale: Math.floor(Math.random() * 10000000),
      ho_va_ten: req.body.ho_va_ten,
      nam_sinh: req.body.nam_sinh,
      cmnd_cccd: req.body.cmnd_cccd,
      noi_cap: req.body.noi_cap,
      ngay_cap: req.body.ngay_cap,
      dan_toc: req.body.dan_toc,
      so_tai_khoan: req.body.so_tai_khoan,
      ngan_hang: req.body.ngan_hang,
      chi_nhanh: req.body.chi_nhanh,
      dien_thoai: req.body.dien_thoai,
      email: req.body.email,
      dia_chi: req.body.dia_chi,
      ma_gioi_thieu: "GMG" + Math.floor(Math.random() * 100) + Math.floor(Math.random() * 100),
      ma_code: req.body.ma_code,
      nhom_kinh_doanh: req.body.nhom_kinh_doanh,
      chuc_vu: req.body.chuc_vu,
      vung: req.body.vung,
      tinh: req.body.tinh,
      nguoi_them: req.body.nguoi_them,
      ghi_chu: req.body.ghi_chu,
      create_date: Date.now()
    });
    Sale_Schema.find({cmnd_cccd: req.body.cmnd_cccd}).then( resp => {
      if(resp.length != 0){
        req.flash('message', 'Nhân sự : ' + new_sale.ho_va_ten + " đã tồn tại");
        res.redirect(req.get('referer'));
      } else {
        new_sale.save();
        console.log(new_sale.ho_va_ten)
        req.flash('message', 'Thêm mới nhân sự mới : ' + new_sale.ho_va_ten + " thành công");
        res.redirect(req.get('referer'));
      }
    });
  }

  thay_doi_thong_tin_sale(req, res) {
    var edit_sale = {};
    if (req.body.ho_va_ten) {
      edit_sale.ho_va_ten = req.body.ho_va_ten;
    }
    if (req.body.cmnd_cccd) {
      edit_sale.cmnd_cccd = req.body.cmnd_cccd;
    }
    if (req.body.noi_cap) {
      edit_sale.noi_cap = req.body.noi_cap;
    }
    if (req.body.ngay_cap) {
      edit_sale.ngay_cap = req.body.ngay_cap;
    }
    if (req.body.dia_chi) {
      edit_sale.dia_chi = req.body.dia_chi;
    }
    if (req.body.dan_toc) {
      edit_sale.dan_toc = req.body.dan_toc;
    }
    if (req.body.so_tai_khoan) {
      edit_sale.so_tai_khoan = req.body.so_tai_khoan;
    }
    if (req.body.ngan_hang) {
      edit_sale.ngan_hang = req.body.ngan_hang;
    }
    if (req.body.chi_nhanh) {
      edit_sale.chi_nhanh = req.body.chi_nhanh;
    }
    if (req.body.dien_thoai) {
      edit_sale.dien_thoai = req.body.dien_thoai;
    }
    if (req.body.ma_code) {
      edit_sale.ma_code = req.body.ma_code;
    }
    if (req.body.chuc_vu) {
      edit_sale.chuc_vu = req.body.chuc_vu;
    }
    if (req.body.email) {
      edit_sale.email = req.body.email;
    }
    if (req.body.trang_thai_quyet_dinh) {
      edit_sale.trang_thai_quyet_dinh = req.body.trang_thai_quyet_dinh;
    }
    if (req.body.ghi_chu) {
      edit_sale.ghi_chu = req.body.ghi_chu;
    }
    const options = {
      new: true,
    }
    Sale_Schema.findByIdAndUpdate(req.params._id, { $set: edit_sale }, options, (err, update_sale) => {
      console.log(update_sale);
      req.flash('message', 'Chỉnh sửa thành công');
      res.redirect(req.get('referer'));
    });
  }
}

module.exports = new sale_Controller