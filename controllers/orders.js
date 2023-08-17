const Order = require('../models/order');
const Pizza = require('../models/pizza');
const Customer = require('../models/customer');
const Card = require('../models/card');

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
    handlePayment,
    addToCart,
}

async function index(req, res) {
    let order = {}
    if (req.cookies.orderId === undefined) {
        order = await Order.create({})
        res.cookie(`orderId`, `${order._id}`);
    } else {
        order = await Order.findById(req.cookies.orderId).populate('items.pizzas')
    }
    prebuiltPizzas = await Pizza.find({type: "Prebuilt"})
    res.render('order/index', { title: "Little Italy | Order", order, prebuiltPizzas })
}

async function newBuild(req, res) {
    const order = await Order.findById(req.cookies.orderId).populate('items.pizzas')
    res.render('builder/new', { title: "Little Italy | Deal Builder", order})
}

async function createBuild(req, res, next) {
    const pizzaData = { ...req.body }
    pizzaData.name = namePizza(pizzaData)
    pizzaData.price = pricePizza(pizzaData)
    const newPizza = await Pizza.create(pizzaData)
    const orderId = req.cookies.orderId
    const order = await Order.findById(orderId).populate('items.pizzas')
    order.items.pizzas.push(newPizza)
    order.total = calcTotal(order.items)
    order.save()
    res.redirect('/order')
}

async function editBuild(req, res) {
    const itemId = req.params.id
    const pizza = await Pizza.findById(itemId)
    const order = await Order.findById(req.cookies.orderId).populate('items.pizzas')
    res.render('builder/edit', { title: "Little Italy | Edit Deal", order, pizza })
}

async function saveBuild(req, res) {
    const orderId = req.cookies.orderId
    const itemId = req.params.id
    newPizza = {...req.body}
    newPizza.name = namePizza(newPizza)
    newPizza.price = pricePizza(newPizza)
    await Pizza.findOneAndUpdate(
        { _id: itemId },
        {
            $set: {
                size: newPizza.size,
                crust: newPizza.crust,
                sauce: newPizza.sauce,
                cut: newPizza.cut,
                cheese: newPizza.cheese,
                meats: newPizza.meats,
                veggies: newPizza.veggies,
                quantity: newPizza.quantity,
                name: newPizza.name,
                price: newPizza.price
            }
        }
    )
    const order = await Order.findById(orderId).populate('items.pizzas') 
    order.total = calcTotal(order.items)
    order.save() 
    res.redirect('/order/cart')
}

async function addToCart(req, res){
    const itemId = req.params.id
    const pizza = await Pizza.findById(itemId)
    const pizzaData = {...pizza._doc}
    pizzaData.type = "Custom"
    pizzaData.size = req.body.size
    pizzaData.crust = req.body.crust
    pizzaData.name = `${pizzaData.size}, ${pizzaData.crust} Crust ${pizzaData.name}` 
    delete pizzaData._id
    delete pizzaData.createdAt
    delete pizzaData.updatedAt 
    delete pizzaData.__v
    newPizza = await Pizza.create(pizzaData)
    order = await Order.findById(req.cookies.orderId).populate('items.pizzas')
    order.items.pizzas.push(newPizza)
    order.total = calcTotal(order.items)
    order.save()
    res.redirect('/order')
}

async function show(req, res) {
    let order = {}
    if (req.cookies.orderId === undefined) {
        order = await Order.create({})
        res.cookie(`orderId`, `${order._id}`);
    } else {
        order = await Order.findById(req.cookies.orderId).populate('items.pizzas')
    }
    prebuiltPizzas = await Pizza.find({ type: "Prebuilt" })
    res.render('cart/index', { title: "Little Italy | Cart", order, prebuiltPizzas })
}

async function deleteItem(req, res) {
    const orderId = req.cookies.orderId
    const itemId = req.params.id
    let order = await Order.findById(orderId).populate('items.pizzas')
    index = order.items.pizzas.findIndex(pizza => JSON.stringify(pizza._id) === JSON.stringify(itemId))
    order.items.pizzas.splice(index,1)
    order.total = calcTotal(order.items)
    order.save()
    await Pizza.findByIdAndDelete(itemId)
    res.redirect('/order/cart')
}

async function editQuantity(req, res) {
    const orderId = req.cookies.orderId
    const itemId = req.params.id
    const newQty = parseInt(req.body.qty)
    const pizza = await Pizza.findById(itemId)
    if (!(pizza.quantity === 1 && newQty === -1)) {
        pizza.quantity += newQty
        pizza.save()
    }
    const order = await Order.findById(orderId).populate('items.pizzas')
    order.total = calcTotal(order.items)
    order.save()
    res.redirect('/order/cart')
}

async function checkout(req, res, next) {
    const orderId = req.cookies.orderId
    const order = await Order.findById(orderId).populate('items.pizzas')
    res.render('checkout/index', {title: "Little Italy | Checkout", order})
}

async function handlePayment(req, res) {
    const orderId = req.cookies.orderId
    const userData = {...req.body}
    const customer = await Customer.create({})
    customer.firstName = userData.firstName
    customer.lastName = userData.lastName
    customer.email = userData.email
    customer.address.street = userData.street
    customer.address.city = userData.city
    customer.address.state = userData.state
    customer.address.zip = userData.zip
    let card
    if (userData.paymentMethod === "Card"){
        card = await Card.create({})
        card.ccName = userData.ccName
        card.ccNum = userData.ccNum
        card.ccExp = userData.ccExp
        card.ccCvv = userData.ccCvv
        card.save()
        customer.card = card._id
    }
    customer.save()
    const order = await Order.findById(orderId)
    order.paymentMethod = userData.paymentMethod
    order.customer = customer
    order.status = "Confirmed"
    order.save()
    res.clearCookie('orderId')
    sendOrder = {
        _id: order._id,
        items:{pizzas:[]},
        customer
    }
    res.render('order/status', { title: "Little Italy | Order Status", order:sendOrder })
}

function calcTotal(items) {
    let tot = 0
    for (let pizza of items.pizzas){
        tot += pizza.price * pizza.quantity
    }
    return tot
}

function namePizza(pizza) {
    let name = `${pizza.size}, ${pizza.crust} Crust, `
    if (pizza.meats && pizza.meats === "Ham" &&
        pizza.veggies && pizza.veggies === "Pineapple") {
        name += `Hawaiian`
    } else if (pizza.meats && pizza.meats === "Ham" &&
        pizza.veggies && pizza.veggies.includes("Pineapple")) {
        name += `Hawaiian Specialty`
    } else if (pizza.meats && pizza.meats === "Pepperoni" && pizza.veggies) {
        name += `Pepperoni Specialty`
    } else if (pizza.meats && pizza.meats === "Chicken" && pizza.sauce === "BBQ" && !pizza.veggies) {
        name += `BBQ Chicken`
    } else if (pizza.meats && pizza.meats === "Chicken" && pizza.sauce === "Buffalo" && !pizza.veggies) {
        name += `Buffalo Chicken`
    } else if (pizza.meats && pizza.meats === "Chicken" && pizza.sauce === "BBQ") {
        name += `BBQ Chicken Specialty`
    } else if (pizza.meats && pizza.meats === "Chicken" && pizza.sauce === "Buffalo") {
        name += `Buffalo Chicken Specialty`
    } else if (pizza.meats && pizza.meats.constructor !== String && !pizza.veggies ||
        (pizza.meats && pizza.meats.constructor !== String && pizza.veggies && pizza.veggies.constructor === String)) {
        name += `Meat Lover`
    } else if (pizza.meats && pizza.meats.constructor !== String && pizza.meats.length >= 3 &&
        pizza.veggies && pizza.veggies.constructor !== String && pizza.veggies.length >= 3) {
        name += `The Works`
    } else if (pizza.meats && pizza.meats.constructor !== String && pizza.meats.length >= 2 &&
        pizza.veggies && pizza.veggies.constructor !== String && pizza.veggies.length >= 2) {
        name += `The Supreme`
    } else if (pizza.meats && pizza.meats.constructor === String) {
        name += `${pizza.meats}`
    } else if (pizza.veggies && pizza.veggies.constructor === String) {
        name += `${pizza.veggies}`
    } else if (pizza.veggies && pizza.veggies.constructor !== String) {
        name += `Veggie Lover`
    } else if (pizza.sauce === "Marinara" && pizza.cheese !== "No" && !pizza.meats && !pizza.veggies) {
        name += `${pizza.cheese} Cheese Margherita`
    } else {
        name += `${pizza.cheese} Cheese`
    }
    name += ` Pizza`
    return name
}

function pricePizza(pizza) {
    let price = 10
    let toppingCost = 1
    if (pizza.cheese === "Extra") {
        price += toppingCost
    } else if (pizza.cheese === "No") {
        price -= toppingCost
    }
    if (pizza.size === "Large") {
        price += toppingCost
    } else if (pizza.size === "Small") {
        price -= toppingCost
    }
    if (pizza.meats) {
        if (pizza.meats.constructor === String) {
            price += toppingCost
        } else {
            price += toppingCost * pizza.meats.length
        }
    }
    if (pizza.veggies) {
        if (pizza.veggies.constructor === String) {
            price += toppingCost
        } else {
            price += toppingCost * pizza.veggies.length
        }
    }
    return price
}