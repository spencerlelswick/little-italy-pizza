//const Order = require("../models/order")

module.exports = {
    index,
}

async function index(req,res){
    res.render('orders/index', {title: "Your Order"})
}