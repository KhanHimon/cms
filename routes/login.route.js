var express = require('express');
var router = express.Router();
const login_controller = require('../controller/login_controller');

/* GET home page. */
router.get('/',login_controller.check_token, function(req, res, next) {
  res.render('login',{ message: req.flash('message') });
});
router.get('/*', function(req, res, next) {
  res.render('login',{ message: req.flash('message') });
}); 
router.post('/', login_controller.check);
router.post('/app', login_controller.check_app);

module.exports = router;
