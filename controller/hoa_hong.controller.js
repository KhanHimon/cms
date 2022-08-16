const Hoa_hong_Schema = require('../models/hoa_hong_co_dinh.model');
const Hoa_hong_linh_dong_Schema = require('../models/hoa_hong_linh_dong.model');
const Hoa_hong_van_phong_Schema = require('../models/hoa_hong_van_phong.model');
const Hoa_hong_thuong_Schema = require('../models/hoa_hong_thuong.model');
const Hoa_hong_voucher_Schema = require('../models/hoa_hong_voucher.model');

class hoa_hong_Controller {
    // Hoa hồng cố định
    them_hoa_hong_co_dinh(req,res) {
        const new_hoa_hong_co_dinh = new Hoa_hong_Schema({
            chinh_sach_hoa_hong : req.body.chinh_sach_hoa_hong,
            hoa_hong : req.body.hoa_hong
        });
        console.log(new_hoa_hong_co_dinh);
        new_hoa_hong_co_dinh.save();
        res.redirect(req.get('referer'));
    }
    new_hoa_hong_co_dinh(req,res){
        Hoa_hong_Schema.find({},function(err, hoa_hong){
            res.json(hoa_hong);
        })
    }
    sua_hoa_hong_co_dinh(req,res){
        var edit_hoa_hong_co_dinh = {};
        if (req.body.hoa_hong) {
            edit_hoa_hong_co_dinh.hoa_hong = req.body.hoa_hong;
        }
        const options = {
            new: true,
        }
        Hoa_hong_Schema.findByIdAndUpdate(req.params._id, { $set: edit_hoa_hong_co_dinh }, options, (err, update_hoa_hong_co_dinh) => {
            console.log(update_hoa_hong_co_dinh);
            res.redirect(req.get('referer'));
        });
    }
    xoa_hoa_hong_co_dinh(req,res){
        const options = {
            new: true,
            useFindAndModify: false
        }
        Hoa_hong_Schema.findByIdAndRemove(req.params._id, options, function (hoa_hong) {
            console.log(hoa_hong);
            res.redirect(req.get('referer'));
        });
    }
    // Hoa hồng linh động 
    them_hoa_hong_linh_dong(req,res) {
        const new_hoa_hong_linh_dong = new Hoa_hong_linh_dong_Schema({
            ten_hoa_hong : req.body.ten_hoa_hong,
            hoa_hong_linh_dong : req.body.hoa_hong_linh_dong,
            ngay_bat_dau: req.body.ngay_bat_dau,
            ngay_ket_thuc: req.body.ngay_ket_thuc
        });
        console.log(new_hoa_hong_linh_dong);
        new_hoa_hong_linh_dong.save();
        res.redirect(req.get('referer'));
    }
    hoa_hong_linh_dong(req,res){
        Hoa_hong_linh_dong_Schema.find({},function(err, hoa_hong_linh_dong){
            res.json(hoa_hong_linh_dong);
        })
    }
    sua_hoa_hong_linh_dong(req,res){
        var edit_hoa_hong_linh_dong = {};
        if (req.body.hoa_hong_linh_dong) {
            edit_hoa_hong_linh_dong.hoa_hong_linh_dong = req.body.hoa_hong_linh_dong;
        }
        const options = {
            new: true,
        }
        Hoa_hong_linh_dong_Schema.findByIdAndUpdate(req.params._id, { $set: edit_hoa_hong_linh_dong }, options, (err, update_hoa_hong_linh_dong) => {
            console.log(update_hoa_hong_linh_dong);
            res.redirect(req.get('referer'));
        });
    }
    xoa_hoa_hong_linh_dong(req,res){
        const options = {
            new: true,
            useFindAndModify: false
        }
        Hoa_hong_linh_dong_Schema.findByIdAndRemove(req.params._id, options, function (hoa_hong_linh_dong) {
            console.log(hoa_hong_linh_dong);
            res.redirect(req.get('referer'));
        });
    }
    // Hoa hồng văn phòng 
    them_hoa_hong_van_phong(req,res) {
        const new_hoa_hong_van_phong = new Hoa_hong_van_phong_Schema({
            ten_hoa_hong_vp : req.body.ten_hoa_hong_vp,
            hoa_hong_van_phong : req.body.hoa_hong_van_phong,
            ngay_bat_dau: req.body.ngay_bat_dau,
            ngay_ket_thuc: req.body.ngay_ket_thuc
        });
        console.log(new_hoa_hong_van_phong);
        new_hoa_hong_van_phong.save();
        res.redirect(req.get('referer'));
    }
    hoa_hong_van_phong(req,res){
        Hoa_hong_van_phong_Schema.find({},function(err, hoa_hong_van_phong){
            res.json(hoa_hong_van_phong);
        })
    }
    sua_hoa_hong_van_phong(req,res){
        var edit_hoa_hong_van_phong = {};
        if (req.body.hoa_hong_linh_dong) {
            edit_hoa_hong_linh_dong.hoa_hong_linh_dong = req.body.hoa_hong_linh_dong;
        }
        const options = {
            new: true,
        }
        Hoa_hong_van_phong_Schema.findByIdAndUpdate(req.params._id, { $set: edit_hoa_hong_van_phong }, options, (err, update_hoa_hong_van_phong) => {
            console.log(update_hoa_hong_van_phong);
            res.redirect(req.get('referer'));
        });
    }
    xoa_hoa_hong_van_phong(req,res){
        const options = {
            new: true,
            useFindAndModify: false
        }
        Hoa_hong_van_phong_Schema.findByIdAndRemove(req.params._id, options, function (hoa_hong_van_phong) {
            console.log(hoa_hong_van_phong);
            res.redirect(req.get('referer'));
        });
    }
    // Hoa hồng thưởng 
    them_hoa_hong_thuong(req,res) {
        const new_hoa_hong_thuong = new Hoa_hong_thuong_Schema({
            ten_hoa_hong_thuong : req.body.ten_hoa_hong_thuong,
            hoa_hong_thuong : req.body.hoa_hong_thuong,
            ngay_bat_dau: req.body.ngay_bat_dau,
            ngay_ket_thuc: req.body.ngay_ket_thuc
        });
        console.log(new_hoa_hong_thuong);
        new_hoa_hong_thuong.save();
        res.redirect(req.get('referer'));
    }
    hoa_hong_thuong(req,res){
        Hoa_hong_thuong_Schema.find({},function(err, hoa_hong_thuong){
            res.json(hoa_hong_thuong);
        })
    }
    sua_hoa_hong_thuong(req,res){
        var edit_hoa_hong_thuong = {};
        if (req.body.hoa_hong_linh_dong) {
            edit_hoa_hong_linh_dong.hoa_hong_linh_dong = req.body.hoa_hong_linh_dong;
        }
        const options = {
            new: true,
        }
        Hoa_hong_van_phong_Schema.findByIdAndUpdate(req.params._id, { $set: edit_hoa_hong_van_phong }, options, (err, update_hoa_hong_van_phong) => {
            console.log(update_hoa_hong_van_phong);
            res.redirect(req.get('referer'));
        });
    }
    xoa_hoa_hong_thuong(req,res){
        const options = {
            new: true,
            useFindAndModify: false
        }
        Hoa_hong_thuong_Schema.findByIdAndRemove(req.params._id, options, function (hoa_hong_thuong) {
            console.log(hoa_hong_thuong);
            res.redirect(req.get('referer'));
        });
    }
    // Hoa hồng voucher 
    them_hoa_hong_voucher(req,res) {
        const new_hoa_hong_voucher = new Hoa_hong_voucher_Schema({
            ten_hoa_hong_voucher : req.body.ten_hoa_hong_voucher,
            hoa_hong_voucher : req.body.hoa_hong_voucher,
            ngay_bat_dau: req.body.ngay_bat_dau,
            ngay_ket_thuc: req.body.ngay_ket_thuc
        });
        console.log(new_hoa_hong_voucher);
        new_hoa_hong_voucher.save();
        res.redirect(req.get('referer'));
    }
    hoa_hong_voucher(req,res){
        Hoa_hong_voucher_Schema.find({},function(err, hoa_hong_voucher){
            res.json(hoa_hong_voucher);
        })
    }
    sua_hoa_hong_voucher(req,res){
        var edit_hoa_hong_voucher = {};
        if (req.body.hoa_hong_linh_dong) {
            edit_hoa_hong_linh_dong.hoa_hong_linh_dong = req.body.hoa_hong_linh_dong;
        }
        const options = {
            new: true,
        }
        Hoa_hong_voucher_Schema.findByIdAndUpdate(req.params._id, { $set: edit_hoa_hong_van_phong }, options, (err, update_hoa_hong_van_phong) => {
            console.log(update_hoa_hong_van_phong);
            res.redirect(req.get('referer'));
        });
    }
    xoa_hoa_hong_voucher(req,res){
        const options = {
            new: true,
            useFindAndModify: false
        }
        Hoa_hong_voucher_Schema.findByIdAndRemove(req.params._id, options, function (hoa_hong_voucher) {
            console.log(hoa_hong_voucher);
            res.redirect(req.get('referer'));
        });
    }
}

module.exports = new hoa_hong_Controller