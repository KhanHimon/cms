const Nhom_sale_Schema = require('../models/nhom_sale.model');
const Sale_Schema = require('../models/sale.model');
const thong_bao_Schema = require('../models/thong_bao.model');
const Hop_dong_dau_tu_Schema = require('../models/hop_dong_dau_tu.model');
const UserSchema = require('../models/user.model');
const Vung_Schema = require('../models/vung.model');
const Tinh_Schema = require('../models/tinh.model');
const Chuc_vu_Schema = require('../models/chuc_vu.model');

class nhom_Controller {
    hien_thi(req, res) {
        Sale_Schema.findById(req.params._id, function (err, sale) {
            thong_bao_Schema.find(function (err, thong_bao) {
                Nhom_sale_Schema.find(function (err, nhoms) {
                    Sale_Schema.find(function (err, sales) {
                        if (err) throw err;
                        res.render('admin/pages/sale_group/quan_ly_doi_nhom', { sale, thong_bao, nhoms, sales });
                    }).populate('chuc_vu').populate('nhom_kinh_doanh').populate('vung').populate('tinh').limit(13)
                })
            })
        }).populate('chuc_vu')
    }

    chi_tiet_doi_nhom(req, res) {
        Sale_Schema.findById(req.params._id, function (err, sale) {
            thong_bao_Schema.find(function (err, thong_bao) {
                Nhom_sale_Schema.findById(req.params.id, function (err, nhom) {
                    Sale_Schema.find(function (err, sales) {
                        Hop_dong_dau_tu_Schema.find(function (err, hop_dongs) {
                            UserSchema.find(function (err, khach_hangs) {
                                Vung_Schema.find(function (err, vungs) {
                                    Tinh_Schema.find(function (err, tinhs) {
                                        Chuc_vu_Schema.find(function (err, chuc_vus) {
                                            if (err) throw err;
                                            res.render('admin/pages/sale_group/chi_tiet_doi_nhom', { chuc_vus, vungs, tinhs, sale, thong_bao, nhom, sales, hop_dongs, khach_hangs, message: req.flash('message') });
                                        })
                                    })
                                })
                            })
                        }).populate('khach_hang')
                    }).populate('chuc_vu').populate('nhom_kinh_doanh').populate('vung').populate('tinh').sort({ create_date: -1 })
                })
            })
        }).populate('chuc_vu')
    }

    them_nhom_kinh_doanh(req, res) {
        const new_nhom = new Nhom_sale_Schema({
            ten_nhom: req.body.ten_nhom
        });
        new_nhom.save();
        res.redirect(req.get('referer'));
    }

    xoa_nhom_kinh_doanh(req, res) {
        Nhom_sale_Schema.findByIdAndDelete(req.params._id, function (nhoms) {
            res.redirect(req.get('referer'));
        });
    }

}

module.exports = new nhom_Controller