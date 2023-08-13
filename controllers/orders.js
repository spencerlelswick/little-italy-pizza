const Order = require('../models/order')
const Helper = require('../scripts/helper')
const { v4: uuidv4 } = require('uuid');

module.exports = {
    index,
    newBuild,
    createBuild,
    show,
}


async function index(req, res) {
    let order = {}
    if (req.cookies.orderId === undefined) {
        order = await Order.create({})
        res.cookie(`orderId`, `${order._id}`);
    } else {
        order = await Order.findById(req.cookies.orderId)
    }
    res.render('order/index', { title: "Order", order: order })
}

async function newBuild(req, res, next) {
    const orderId = req.cookies.orderId
    const order = await Order.findById(orderId)
    res.render('builder/new', { title: "Deal Builder", order: order })
}

async function createBuild(req, res, next) {
    const newPizza = {...req.body}
    newPizza.id = uuidv4()
    newPizza.name = Helper.namePizza(newPizza)
    newPizza.price = Helper.pricePizza(newPizza)
    console.log(newPizza)
    const orderId = req.cookies.orderId
    const currOrder = await Order.findById(orderId)
    const updateOrder = { ...currOrder._doc }
    const newPizzas = [...updateOrder.items.pizzas, newPizza]
    updateOrder.items.pizzas = newPizzas
    const newTotal = Helper.totalOrder(currOrder)
    await Order.findOneAndUpdate(
        { _id: currOrder._id },
        { $set: { items: { pizzas: newPizzas }, total : newTotal } }
    );
    res.redirect('/order')
}

async function show(req,res){
    const orderId = req.cookies.orderId
    const order = await Order.findById(orderId)
    res.render('cart/index', { title: "Cart", order: order })
}