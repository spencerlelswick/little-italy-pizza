const Order = require('../models/order')

module.exports = {
    index,
    newBuild
}

async function index(req, res) {
    let currOrder = {}

    if (typeof localStorage === "undefined" || localStorage === null) {
        const LocalStorage = require('node-localstorage').LocalStorage;
        localStorage = new LocalStorage('./scratch');
    }

    if (localStorage.getItem("orderID") === null) {
        currOrder = await Order.create({})
        localStorage.setItem("orderID", `${currOrder._id}`)
        console.log(currOrder)
    } else {
        currOrder = await Order.findById(localStorage.getItem("orderID"))
        console.log(currOrder)
    }

    res.render('order/index', { title: "Order", order: currOrder })
}

function newBuild(req, res, next) {
    res.render('builder/new', { title: "Deal Builder", })
}