const Order = require('../models/order')

module.exports = {
    index,
    newBuild,
    createBuild
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

async function createBuild(req, res, next) {
    const newPizza = req.body;

    console.log(`NEW PIZZA: ${newPizza.size}`)

    let currOrder = {}
    if (typeof localStorage === "undefined" || localStorage === null) {
        res.redirect('/')
    } else {
        const orderId = localStorage.getItem("orderID")
        currOrder = await Order.findById(orderId)
        const updateOrder = { ...currOrder._doc }
        const newPizzas = [...updateOrder.items.pizzas, newPizza]
        await Order.updateOne(
            { _id: currOrder._id },
            { items: { pizzas: newPizzas } }
        );
        currOrder = await Order.findById(orderId)
    }

    res.render('order/index', { title: "Order", order: currOrder })
}