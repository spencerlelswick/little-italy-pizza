const express = require('express');
const router = express.Router();
const Order = require('../models/order');

/* GET home page. */
router.get('/', async function (req, res, next) {
  let order = {}
  if (req.cookies.orderId === undefined) {
      order = await Order.create({})
      res.cookie(`orderId`, `${order._id}`);
  } else {
  order = await Order.findById(req.cookies.orderId)
  }
  res.render('index', { title: 'Little Italy | Pizza Delivery', order});
});

module.exports = router;
