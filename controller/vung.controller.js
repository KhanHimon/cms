const Vung_Schema = require('../models/vung.model');
const Tinh_Schema = require('../models/tinh.model');
const Sale_Schema = require('../models/sale.model');
const thong_bao_Schema = require('../models/thong_bao.model');

class vung_Controller {
    hien_thi(req,res){
        Sale_Schema.findById(req.params._id, function(err, sale){
            thong_bao_Schema.find(function(err, thong_bao){
                Vung_Schema.find(function(err, vungs){
                    Tinh_Schema.find(function(err, tinhs){
                        if (err) throw err;
                        res.render('admin/pages/quan_ly_vung', { sale, thong_bao, vungs, tinhs });
                    }).populate('vung')
                })
            })
        })
    }
// Thêm mới vùng
    them_vung(req,res){
        const new_vung = new Vung_Schema({
            ten_vung: req.body.ten_vung
        });
        new_vung.save();
        res.redirect(req.get('referer'));
    }
    xoa_vung(req,res){
        Vung_Schema.findByIdAndDelete(req.params._id, function(vung){
            res.redirect(req.get('referer'));
        });
    }
// Thêm mới TỈNH
    them_tinh(req,res){
        const new_tinh = new Tinh_Schema({
            vung: req.body.vung,
            ten_tinh: req.body.ten_tinh
        });
        new_tinh.save();
        res.redirect(req.get('referer'));
    }
    xoa_tinh(req,res){
        Tinh_Schema.findByIdAndDelete(req.params._id, function(tinh){
            res.redirect(req.get('referer'));
        });
    }
}

module.exports = new vung_Controller