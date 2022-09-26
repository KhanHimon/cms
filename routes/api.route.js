var express = require('express');
var router = express.Router();
const cors = require('cors');
const admin_controller = require('../controller/admin_controller');

router.get('/users' ,admin_controller.API_USER)

module.exports = router;