const thong_bao_Schema = require('../models/thong_bao.model');
const sale_Schema = require('../models/sale.model');

class thong_bao_Controller {
    them_thong_bao(req, res) {
        const thong_bao = new thong_bao_Schema({
            tieu_de_thong_bao: req.body.tieu_de_thong_bao,
            noi_dung_thong_bao: req.body.noi_dung_thong_bao,
            nguoi_thong_bao: req.body.nguoi_thong_bao,
            ngay_thong_bao: Date.now()
        });
        thong_bao.save();
        console.log(thong_bao);
        req.flash('message', 'Thêm mới thành công ');
        res.redirect(req.get('referer'));
    }

    GET_DANH_SACH_THONG_BAO(req, res) {
        sale_Schema.findById(req.params._id, function (err, sale) {
            thong_bao_Schema.find(function (err, thong_bao) {
                thong_bao_Schema.find(function (err, list_thong_bao) {
                    if (err) throw err;
                    res.render('admin/pages/thong_bao/danh_sach_thong_bao', { list_thong_bao, thong_bao, sale, message: req.flash('message') });
                }).sort({ ngay_thong_bao: -1 })
            }).sort({ ngay_thong_bao: -1 })
        }).populate('chuc_vu')
    }

    thong_bao(req, res) {
        thong_bao_Schema.find({}, function (err, thong_bao) {
            res.json(thong_bao);
        })
    }
    xoa_thong_bao(req, res) {
        const options = {
            new: true,
            useFindAndModify: false
        }
        thong_bao_Schema.findByIdAndRemove(req.params._id, options, function (thong_bao) {
            console.log(thong_bao);
            req.flash('message', 'Xóa thành công ');
            res.redirect(req.get('referer'));
        });
    }
}

module.exports = new thong_bao_Controller