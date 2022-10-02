// IMPORT MODELS
const Lich_su_Schema = require('../models/lich_su.model');
const Nhom_sale_Schema = require('../models/nhom_sale.model');
const Sale_Schema = require('../models/sale.model');
const Chuc_vu_Schema = require('../models/chuc_vu.model');
const User_Schema = require('../models/user.model');
const thong_bao_Schema = require('../models/thong_bao.model');
const trang_thai_Schema = require('../models/trang_thai.model');
const hoa_hong_Schema = require('../models/hoa_hong_co_dinh.model');
const Hoa_hong_linh_dong_Schema = require('../models/hoa_hong_linh_dong.model');
const Hoa_hong_van_phong_Schema = require('../models/hoa_hong_van_phong.model');
const Hoa_hong_thuong_Schema = require('../models/hoa_hong_thuong.model');
const Hoa_hong_voucher_Schema = require('../models/hoa_hong_voucher.model');
const hop_dong_tra_thuong_Schema = require('../models/hop_dong_tra_thuong.model');
const phieu_thong_tin_khach_hang_Schema = require('../models/phieu_thong_tin_khach_hang.model');
const Hop_dong_dau_tu_Schema = require('../models/hop_dong_dau_tu.model');

class lich_su_tra_thuong_controller {
    hien_thi_lich_su(req, res) {
        Sale_Schema.findById(req.params._id, function (err, sale) {
            Lich_su_Schema.find(function (err, lich_sus) {
                thong_bao_Schema.find(function (err, thong_bao) {
                    if (err) throw err;
                    res.render('admin/pages/ke_toan/lich_su_tra_lai', { thong_bao, sale, lich_sus });
                })
            }).populate('nguoi_duyet').populate({
                path: 'hop_dong',
                populate: {
                    path: 'khach_hang'
                }
            }).populate('trang_thai').sort({ngay_tra_lai: -1})
        })
    }

   
}

module.exports = new lich_su_tra_thuong_controller