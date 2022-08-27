const Nhom_sale_Schema = require('../models/nhom_sale.model');
const Sale_Schema = require('../models/sale.model');
const thong_bao_Schema = require('../models/thong_bao.model');

class nhom_Controller {
    hien_thi(req,res){
        Sale_Schema.findById(req.params._id, function(err, sale){
            thong_bao_Schema.find(function(err, thong_bao){
                Nhom_sale_Schema.find(function (err, nhoms) {
                    Sale_Schema.find(function(err, sales){
                        if(err) throw err;
                        res.render('admin/pages/quan_ly_doi_nhom', { sale, thong_bao, nhoms, sales });
                    }).populate('chuc_vu').populate('nhom_kinh_doanh').populate('vung').populate('tinh').sort({ create_date: -1 })
                })
            })
        }).populate('chuc_vu')
    }

    them_nhom_kinh_doanh(req,res){
        const new_nhom = new Nhom_sale_Schema({
            ten_nhom: req.body.ten_nhom
        });
        new_nhom.save();
        res.redirect(req.get('referer'));
    }

    xoa_nhom_kinh_doanh(req,res){
        Nhom_sale_Schema.findByIdAndDelete(req.params._id, function(nhoms){
            res.redirect(req.get('referer'));
        });
    }

}

module.exports = new nhom_Controller