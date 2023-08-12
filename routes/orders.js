const express = require('express');
const router = express.Router();
const orderCtrl = require('../controllers/orders')

router.get('/', orderCtrl.index);

module.exports = router;
