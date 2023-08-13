const express = require('express');
const router = express.Router();
const orderCtrl = require('../controllers/orders')

router.get('/builder', orderCtrl.newBuild);
router.post('/builder', orderCtrl.createBuild);
router.get('/cart', orderCtrl.show)
router.get('/', orderCtrl.index);

module.exports = router;
