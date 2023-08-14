const express = require('express');
const router = express.Router();
const orderCtrl = require('../controllers/orders')

router.get('/builder', orderCtrl.newBuild);
router.post('/builder', orderCtrl.createBuild);
router.get('/cart', orderCtrl.show)
router.get('/checkout/:id', orderCtrl.checkout)
router.get('/', orderCtrl.index);
router.delete('/cart/:id', orderCtrl.deleteItem);
router.post('/cart/:id', orderCtrl.editQuantity);
router.post('/builder/edit/:id', orderCtrl.editBuild);
router.post('/builder/:id', orderCtrl.saveBuild);

module.exports = router;
