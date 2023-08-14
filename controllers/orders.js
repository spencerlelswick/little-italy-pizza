const Order = require('../models/order')
const Helper = require('../scripts/helper')
const { v4: uuidv4 } = require('uuid');

module.exports = {
    index,
    newBuild,
    createBuild,
    editBuild,
    saveBuild,
    show,
    deleteItem,
    editQuantity,
    checkout,
    goToStatus,
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
    const newPizza = { ...req.body }
    newPizza.id = uuidv4()
    newPizza.name = Helper.namePizza(newPizza)
    newPizza.price = Helper.pricePizza(newPizza)
    const orderId = req.cookies.orderId
    const currOrder = await Order.findById(orderId)
    const updateOrder = { ...currOrder._doc }
    const newPizzas = [...updateOrder.items.pizzas, newPizza]
    updateOrder.items.pizzas = newPizzas
    const newTotal = Helper.totalOrder(currOrder.items)
    await Order.findOneAndUpdate(
        { _id: currOrder._id },
        { $set: { items: { pizzas: newPizzas, sides: [...currOrder.items.sides] }, total : newTotal } }
    );
    res.redirect('/order')
}

async function editBuild(req, res) {
    const orderId = req.cookies.orderId
    const itemId = req.params.id
    const order = await Order.findById(orderId)
    let newItems = { ...order.items }
    let index = -1
    if (newItems.pizzas.length) { 
        index = newItems.pizzas.findIndex(pizza => pizza.id === itemId)
        if (index !== -1) {
            let newPizza = newItems.pizzas[index]
            res.render('builder/edit', { title: "Edit Deal", order: order, pizza: newPizza })
        }
    }
    // TODO: if(newItems.side.length)
}

async function saveBuild(req, res) {
    const orderId = req.cookies.orderId
    const itemId = req.params.id
    const order = await Order.findById(orderId)
    let newItems = { ...order.items }
    let index = -1
    if (newItems.pizzas) {
        index = newItems.pizzas.findIndex(pizza => pizza.id === itemId)
    }
    const newPizza = { ...req.body }
    newPizza.id = newItems.pizzas[index].id
    newPizza.quantity = newItems.pizzas[index].quantity
    newPizza.name = Helper.namePizza(newPizza)
    newPizza.price = Helper.pricePizza(newPizza)
    newItems.pizzas[index] = newPizza
    const newTotal = Helper.totalOrder(newItems)
    await Order.findOneAndUpdate(
        { _id: orderId },
        { $set: { items: newItems, total : newTotal } }
    );
    const newOrder = await Order.findById(orderId)
    res.render('cart/index', { title: "Cart", order: newOrder })
}

async function show(req, res) {
    let order = {}
    if (req.cookies.orderId === undefined) {
        order = await Order.create({})
        res.cookie(`orderId`, `${order._id}`);
    } else {
        order = await Order.findById(req.cookies.orderId)
    }
    res.render('cart/index', { title: "Cart", order: order })
}

async function deleteItem(req, res) {
    const orderId = req.cookies.orderId
    const itemId = req.params.id
    const order = await Order.findById(orderId)
    newItems = {...order.items}
    let index = -1
    
    if (newItems.pizzas.length){
        index = newItems.pizzas.findIndex(pizza => pizza.id === itemId)
        if (index !== -1) {
            newItems.pizzas.splice(index, 1)
        }
    }
    
    if(newItems.sides.length && index === -1){
        index = newItems.sides.findIndex(side => side.id === itemId)
        newItems.sides.splice(index, 1)
    }

    let newTotal = Helper.totalOrder(newItems)
    await Order.findOneAndUpdate(
        { _id: orderId },
        { $set: { items: newItems, total: newTotal } }
    );
    res.redirect('/order/cart')
}

async function editQuantity(req, res) {
    const orderId = req.cookies.orderId
    const itemId = req.params.id
    let newQty = parseInt(req.body.qty)
    const order = await Order.findById(orderId)
    newItems = {...order.items}
    let index = -1
    if (newItems.pizzas.length){
        index = newItems.pizzas.findIndex(pizza => pizza.id === itemId)
        if (index !== -1) {
            let oldQty = newItems.pizzas[index].quantity
            if (parseInt(oldQty) <= 0) {
                newItems.pizzas[index].quantity = 1
            } else if (!(parseInt(oldQty) <= 1 && newQty === -1)) {
                newItems.pizzas[index].quantity = parseInt(oldQty) + newQty
            }
        }
    }
    
    if(newItems.sides.length &&  index === -1){
        index = newItems.sides.findIndex(side => side.id === itemId)
        let oldQty = newItems.sides[index].quantity
        if (parseInt(oldQty) <= 0) {
            newItems.sides[index].quantity = 1
        } else if (!(parseInt(oldQty) <= 1 && newQty === -1)) {
            newItems.sides[index].quantity = parseInt(oldQty) + newQty
        }
    }

    let newTotal = Helper.totalOrder(newItems)
    await Order.findOneAndUpdate(
        { _id: orderId },
        { $set: { items: newItems, total: newTotal } }
    );
    res.redirect('/order/cart')
}

async function checkout(req, res, next) {
    let orderId = req.params.id
    // if (req.cookies.orderId === undefined) {
    //     order = await Order.create({})
    //     res.cookie(`orderId`, `${order._id}`);
    // } else {
    const order = await Order.findById(req.cookies.orderId)
    // }
    res.render('checkout/index', { title: "checkout", order: order })
}

async function goToStatus(req, res) {
    const orderId = req.params.id
    await Order.findOneAndUpdate(
        { _id: orderId},
        { $set: { status: "confirmed" } })
    const order = await Order.findById(orderId)
    res.clearCookie('orderId')
    res.render('order/status', {title: "Order Status", order: order})
}