const thong_bao_Schema = require('../models/thong_bao.model');

class thong_bao_Controller {
    them_thong_bao(req,res) {
        const thong_bao = new thong_bao_Schema({
            tieu_de_thong_bao: req.body.tieu_de_thong_bao,
            mo_ta_thong_bao: req.body.mo_ta_thong_bao,
            noi_dung_thong_bao: req.body.noi_dung_thong_bao,
            ngay_thong_bao: Date.now()
        });
        thong_bao.save();
        res.json(thong_bao);
    }
    thong_bao(req,res){
        thong_bao_Schema.find({},function(err, thong_bao){
            res.json(thong_bao);
        })
    }
}

module.exports = new thong_bao_Controller