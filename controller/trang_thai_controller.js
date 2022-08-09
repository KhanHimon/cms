const trang_thai_Schema = require('../models/trang_thai.model');

class trang_thai_Controller {
    them_trang_thai(req,res) {
        const trang_thai = new trang_thai_Schema({
            ten_trang_thai: req.body.ten_trang_thai,
        });
        trang_thai.save();
        res.json(trang_thai);
    }
    trang_thai(req,res){
        trang_thai_Schema.find({},function(err, trang_thai){
            res.json(trang_thai);
        })
    }
}

module.exports = new trang_thai_Controller