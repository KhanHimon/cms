var express = require('express');
var router = express.Router();
const cors = require('cors');
const API_CONTROLLER = require('../controller/api_controller');

router.get('/users' ,API_CONTROLLER.API_USER)
router.get('/history' ,API_CONTROLLER.API_HISTORY)

module.exports = router;