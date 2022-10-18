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
}

module.exports = new support_Controller