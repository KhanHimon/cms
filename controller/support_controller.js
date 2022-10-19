const User_Schema = require('../models/user.model');
const ho_tro_Schema = require('../models/ho_tro.model');
const thong_bao_Schema = require('../models/thong_bao.model');
const Sale_Schema = require('../models/sale.model');
class support_Controller {
    GET_HO_TRO(req, res) {
        Sale_Schema.findById(req.params._id, function (err, sale) {
            User_Schema.findById(req.params._id, function (err, user) {
                ho_tro_Schema.find(function (err, ho_tro) {
                    thong_bao_Schema.find(function (err, thong_bao) {
                        if (err) console.log(err);
                        res.render('admin/pages/ho_tro.ejs', { user, ho_tro, thong_bao, sale });
                    });
                }).populate("khach_hang");
            })
        }).populate("chuc_vu")
    }

    // Chức năng trả lời câu hỏi

    ANSWER_HO_TRO(req,res){
        var answer = {};
        if (req.body.tra_loi) {
            answer.tra_loi = req.body.tra_loi;
        }
        if (req.body.trang_thai) {
            answer.trang_thai = req.body.trang_thai;
        }
        const options = {
            new: true,
        }
        ho_tro_Schema.findByIdAndUpdate(req.params._id, { $set: answer }, options, (err, update_ho_tro) => {
            console.log(update_ho_tro);
            req.flash('message', 'Chỉnh sửa thành công');
            res.redirect(req.get('referer'));
        });
    }
}

module.exports = new support_Controller