const Hoa_hong_Schema = require('../models/hoa_hong_co_dinh.model');

class hoa_hong_Controller {
    them_hoa_hong(req,res) {
        const new_hoa_hong = new Hoa_hong_Schema({
            chinh_sach_hoa_hong : req.body.chinh_sach_hoa_hong,
            hoa_hong : req.body.hoa_hong
        });
        console.log(new_hoa_hong);
        new_hoa_hong.save();
        res.redirect(req.get('referer'));
    }
    hoa_hong(req,res){
        Hoa_hong_Schema.find({},function(err, hoa_hong){
            res.json(hoa_hong);
        })
    }
    sua_hoa_hong(req,res){
        var edit_hoa_hong = {};
        if (req.body.hoa_hong) {
            edit_hoa_hong.hoa_hong = req.body.hoa_hong;
        }
        const options = {
            new: true,
        }
        Hoa_hong_Schema.findByIdAndUpdate(req.params._id, { $set: edit_hoa_hong }, options, (err, update_hoa_hong) => {
            console.log(update_hoa_hong);
            res.redirect(req.get('referer'));
        });
    }
    xoa_hoa_hong(req,res){
        const options = {
            new: true,
            useFindAndModify: false
        }
        Hoa_hong_Schema.findByIdAndRemove(req.params._id, options, function (hoa_hong) {
            console.log(hoa_hong);
            res.redirect(req.get('referer'));
        });
    }
}

module.exports = new hoa_hong_Controller