const express = require('express');
const router = express.Router();
const orderCtrl = require('../controllers/orders')

router.get('/builder', orderCtrl.newBuild);
router.post('/builder', orderCtrl.createBuild);
router.get('/cart', orderCtrl.show)
router.get('/', orderCtrl.index);
router.delete('/cart', orderCtrl.deleteItem);

module.exports = router;
