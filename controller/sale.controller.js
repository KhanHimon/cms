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
                                    res.render('admin/pages/quan_ly_sale', { sale, thong_bao, sales, vungs, tinhs, nhoms, chuc_vus });
                                })
                            })
                        })
                    })
                }).populate('chuc_vu').populate('nhom_kinh_doanh').sort({'create_date': -1})
            })
        }).populate('chuc_vu')
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
                                        if (err) throw err;
                                        res.render('admin/pages/chi_tiet_sale', { tinhs, vungs, sale, thong_bao, chi_tiet_sale, hop_dongs, khach_hangs, sales });
                                    })
                                })
                            })
                        })
                    }).populate('khach_hang')
                }).populate('nhom_kinh_doanh')
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
            ma_gioi_thieu: "GMG" + Math.floor(Math.random() * 1000),
            ma_code: req.body.ma_code,
            nhom_kinh_doanh: req.body.nhom_kinh_doanh,
            chuc_vu: req.body.chuc_vu,
            vung: req.body.vung,
            tinh: req.body.tinh,
            ghi_chu: req.body.ghi_chu,
            create_date: Date.now()
        });
        new_sale.save();
        res.redirect(req.get('referer'));
    }
}

module.exports = new sale_Controller