const trang_thai_Schema = require('../models/trang_thai.model');
const Sale_Schema = require('../models/sale.model');
const Nhom_sale_Schema = require('../models/nhom_sale.model');
const Chuc_vu_Schema = require('../models/chuc_vu.model');
const UserSchema = require('../models/user.model');

class admin_Controller {
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
    them_nhan_vien(req,res){
        const sale = new Sale_Schema({
            username_sale: req.body.username_sale,
            password_sale: req.body.password_sale,
            email: req.body.email,
            nam_sinh: req.body.nam_sinh,
            dia_chi: req.body.dia_chi,
            dien_thoai: req.body.dien_thoai,
            ho_va_ten: req.body.ho_va_ten,
            nhom_kinh_doanh: req.body.nhom_kinh_doanh,
            chuc_vu: req.body.chuc_vu
        });
        sale.save();
        res.redirect(req.get('referer'));
    }
    them_nhom_kinh_doanh(req,res){
        const nhom_sale = new Nhom_sale_Schema({
            ten_nhom: req.body.ten_nhom
        })
        nhom_sale.save();
        res.json(nhom_sale)
        
    }
    them_chuc_vu(req,res){
        const chuc_vu = new Chuc_vu_Schema({
            ten_chuc_vu: req.body.ten_chuc_vu,
            hoa_hong_chuc_vu: req.body.hoa_hong_chuc_vu
        })
        chuc_vu.save();
        res.redirect(req.get('referer'));
        
    }
    them_moi_khach_hang(req, res) {

        // const thang = new Date();
        // const month = thang.getMonth() +1;
        // thang.setMonth(month,0);
        // const ngay_trong_thang = thang.getDate();
        // const ngay_ky = new Date().getDate()

        

        const user = new UserSchema({
            username: "NDT"+ Math.floor(Math.random() * 1000),
            password: Math.floor(Math.random() * 100000),
            ho_va_ten: req.body.ho_va_ten,
            cccd_cmnd: req.body.cccd_cmnd,
            noi_cap: req.body.noi_cap,
            ngay_cap: req.body.ngay_cap,
            nam_sinh: req.body.nam_sinh,
            dia_chi: req.body.dia_chi,
            dan_toc: req.body.dan_toc,
            vung: req.body.vung,
            tinh: req.body.tinh,
            huyen: req.body.huyen,
            xa: req.body.xa,
            so_tai_khoan: req.body.so_tai_khoan,
            ngan_hang: req.body.ngan_hang,
            chi_nhanh: req.body.chi_nhanh,
            so_dien_thoai: req.body.so_dien_thoai,
            ma_gioi_thieu: req.body.ma_gioi_thieu, 
            email: req.body.email,
            // wallet: {
            //     wallet_basic: req.body.wallet_basic,
            //     wallet_ocopshop: req.body.wallet_basic * (2.5/100) * 0.1
            // },
            // thuong_dau_tu: req.body.wallet_basic * (req.body.thuong_dau_tu/100), 
            ngay_tham_gia: Date().now,
            // ((req.body.wallet_basic * 0.025) / ngay_trong_thang ) * (ngay_trong_thang -  req.body.ngay_tham_gia)
            // tien_lai: {
            //     thang_dau: ((req.body.wallet_basic * 0.025) / ngay_trong_thang ) * (ngay_trong_thang - ngay_ky ),
            //     thang: req.body.wallet_basic * (0.025),
            //     thang_cuoi: 0
            // }

            
        });
        console.log(user)
        user.save();
        res.redirect(req.get('referer'));
    }
    tong_tien(req,res){
        UserSchema.find(function (err, khach_hang){
            if (err) throw err;
            console.log(khach_hang.wallet_basic)
        });
        
    }
}

module.exports = new admin_Controller