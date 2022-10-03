// IMPORT MODELS
const Lich_su_Schema = require('../models/lich_su.model');
const Nhom_sale_Schema = require('../models/nhom_sale.model');
const Sale_Schema = require('../models/sale.model');
const Chuc_vu_Schema = require('../models/chuc_vu.model');
const User_Schema = require('../models/user.model');
const thong_bao_Schema = require('../models/thong_bao.model');
const trang_thai_Schema = require('../models/trang_thai.model');
const hoa_hong_Schema = require('../models/hoa_hong_co_dinh.model');
const Hoa_hong_linh_dong_Schema = require('../models/hoa_hong_linh_dong.model');
const Hoa_hong_van_phong_Schema = require('../models/hoa_hong_van_phong.model');
const Hoa_hong_thuong_Schema = require('../models/hoa_hong_thuong.model');
const Hoa_hong_voucher_Schema = require('../models/hoa_hong_voucher.model');
const hop_dong_tra_thuong_Schema = require('../models/hop_dong_tra_thuong.model');
const Hop_dong_dau_tu_Schema = require('../models/hop_dong_dau_tu.model');
const { db } = require('../models/user.model');

class hop_dong_tra_thuong_controller {

    hien_thi_hop_dong(req, res) {
        Sale_Schema.findById(req.params._id, function (err, sale) {
            thong_bao_Schema.find(function (err, thong_bao) {
                Hop_dong_dau_tu_Schema.find(function (err, hop_dong_dau_tu) {
                    trang_thai_Schema.find(function (err, trang_thai) {
                        Lich_su_Schema.find(function (err, lich_sus) {
                            if (err) throw err;
                            res.render('admin/pages/quan_ly_hop_dong', { lich_sus, thong_bao, sale, hop_dong_dau_tu, trang_thai, message: req.flash('message') });
                        })
                    })
                }).populate('khach_hang').populate('trang_thai')
            })
        })
    }

    hien_thi_tra_lai(req, res) {
        Sale_Schema.findById(req.params._id, function (err, sale) {
            thong_bao_Schema.find(function (err, thong_bao) {
                Hop_dong_dau_tu_Schema.find(function (err, hop_dong_dau_tu) {
                    trang_thai_Schema.find(function (err, trang_thai) {
                        Lich_su_Schema.find(function (err, lich_sus) {
                            if (err) throw err;
                            res.render('admin/pages/ke_toan/tra_lai_hop_dong', {lich_sus, thong_bao, sale, hop_dong_dau_tu, trang_thai, message: req.flash('message') });
                        })
                    })
                }).populate('khach_hang').populate('trang_thai').sort({})
            })
        })
    }

    phe_duyet_tra_lai(req, res) {
        var edit_hop_dong = {};
        if (req.body.trang_thai) {
            edit_hop_dong.trang_thai = req.body.trang_thai;
        }
        const options = {
            new: true,
        }
        Hop_dong_dau_tu_Schema.findByIdAndUpdate(req.params._id, { $set: edit_hop_dong }, options, (err, update_hop_dong) => {
            const new_lich_su = new Lich_su_Schema({
                nguoi_duyet: req.body.nguoi_duyet,
                so_tien: req.body.so_tien,
                hop_dong: req.body.hop_dong,
                trang_thai: req.body.trang_thai,
                ngay_tra_lai: Date.now()
            });
            new_lich_su.save();
            console.log(update_hop_dong);
            res.redirect(req.get('referer'));
        });
    }



    check_date(req, res) {
        var edit_hop_dong = {};
        if (req.body.trang_thai) {
            edit_hop_dong.trang_thai = req.body.trang_thai;
        }
        const options = {
            new: true,
        }
        Hop_dong_dau_tu_Schema.findByIdAndUpdate(req.params._id, { $set: edit_hop_dong }, options, (err, update_hop_dong) => {
            console.log(update_hop_dong);
            res.redirect(req.get('referer'));
        });
    }

    reset_lich_su(req,res){
        Hop_dong_dau_tu_Schema.updateMany({trang_thai:{$gte:"630ec05c0fc3559888a69f3a"}}, 
            {trang_thai:"630ec0a80fc3559888a69f3b"}, function (err, hop_dongs) {
            if (err){
                console.log(err)
            }
            else{
                res.redirect(req.get('referer'));
            }
        });
    }


    them_hop_dong_dau_tu(req, res) {
        const thang = new Date();
        const month = thang.getMonth() + 1;
        thang.setMonth(month, 0);
        const ngay_trong_thang = thang.getDate();
        console.log(month)
        const ngay_ky = Date();

        const new_hop_dong_dau_tu = new Hop_dong_dau_tu_Schema({
            ma_hop_dong: req.body.ma_hop_dong,
            trang_thai: req.body.trang_thai,
            so_tien_dau_tu: req.body.so_tien_dau_tu,
            khach_hang: req.body.khach_hang,
            ngay_ky_hop_dong: req.body.ngay_ky_hop_dong,
            thoi_han_dau_tu: req.body.thoi_han_dau_tu,
            tien_ocopshop: (req.body.so_tien_dau_tu * 0.025) * (10 / 100),
            loi_nhuan: {
                thang_dau: ((req.body.so_tien_dau_tu * 0.025) / ngay_trong_thang) * ((ngay_trong_thang - new Date(req.body.ngay_ky_hop_dong).getDate()) + 1),
                thang: req.body.so_tien_dau_tu * 0.025,
                thang_cuoi: ((req.body.so_tien_dau_tu * 0.025) / ngay_trong_thang) * (ngay_trong_thang - (new Date(req.body.ngay_ky_hop_dong).getDate() - 2))
            }

        });
        req.flash('message', 'Thêm mới thành công');
        new_hop_dong_dau_tu.save();
        res.redirect(req.get('referer'));
    }

    xoa_hop_dong_dau_tu(req, res) {
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