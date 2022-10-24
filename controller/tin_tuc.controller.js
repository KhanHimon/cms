const User_Schema = require('../models/user.model');
const tin_tuc_Schema = require('../models/tin_tuc.model');
const Sale_Schema = require('../models/sale.model');
const thong_bao_Schema = require('../models/thong_bao.model');

class tin_tuc_controller {
    hien_thi_tin_tuc(req,res){
        Sale_Schema.findById(req.params._id, function (err, sale) {
            tin_tuc_Schema.find(function(err, tin_tucs){
                thong_bao_Schema.find(function (err, thong_bao) {
                    if (err) console.log(err);
                    res.render('admin/pages/tin_tuc/them_tin_tuc', { sale, tin_tucs, thong_bao, message: req.flash('message') });
                })
            }).sort({ create_date: -1 })
        })
    }

    POST_TIN_TUC(req,res){
        const new_tin_tuc = new tin_tuc_Schema({
            tieu_de: req.body.tieu_de,
            anh_dai_dien: req.body.anh_dai_dien,
            mo_ta: req.body.mo_ta,
            noi_dung: req.body.noi_dung,
            url: req.body.url,
            create_date: Date.now()
        });
        new_tin_tuc.save();
        console.log(new_tin_tuc);
        req.flash('message', 'Thêm mới thành công ');
        res.redirect(req.get('referer'));
    }

    DELETE_TIN_TUC(req,res){
        const options = {
            new: true,
            useFindAndModify: false
        }
        tin_tuc_Schema.findByIdAndDelete(req.params._id, options, (err, tin_tuc) =>{
            console.log(tin_tuc);
            req.flash('message', 'Xóa thành công ');
            res.redirect(req.get('referer'));
        });
    }
}

module.exports = new tin_tuc_controller