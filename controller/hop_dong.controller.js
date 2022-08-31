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
const phieu_thong_tin_khach_hang_Schema = require('../models/phieu_thong_tin_khach_hang.model');
const Hop_dong_dau_tu_Schema = require('../models/hop_dong_dau_tu.model');

class hop_dong_tra_thuong_controller {

    hien_thi_hop_dong(req,res){
        Sale_Schema.findById(req.params._id, function (err, sale) {
            thong_bao_Schema.find(function (err, thong_bao) {
              Hop_dong_dau_tu_Schema.find(function(err, hop_dong_dau_tu){
                trang_thai_Schema.find(function(err, trang_thai){
                  if (err) throw err;
                  res.render('admin/pages/quan_ly_hop_dong', { thong_bao, sale, hop_dong_dau_tu, trang_thai, message: req.flash('message')});
                })
              }).populate('khach_hang').populate('trang_thai')
            })
        })
    }

    hien_thi_tra_lai(req,res){
        Sale_Schema.findById(req.params._id, function (err, sale) {
            thong_bao_Schema.find(function (err, thong_bao) {
              Hop_dong_dau_tu_Schema.find(function(err, hop_dong_dau_tu){
                trang_thai_Schema.find(function(err, trang_thai){
                  if (err) throw err;
                  res.render('admin/pages/tra_lai_hop_dong', { thong_bao, sale, hop_dong_dau_tu, trang_thai, message: req.flash('message')});
                })
              }).populate('khach_hang').populate('trang_thai')
            })
        })
    }

    phe_duyet_tra_lai(req,res){
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
            ma_hop_dong : req.body.ma_hop_dong,
            trang_thai: req.body.trang_thai,
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