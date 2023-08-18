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
        try{
            order = await Order.create({})
            res.cookie(`orderId`, `${order._id}`);
        } catch (err) {
            res.render('error', {title: "Error", order:{items:{ pizzas:[],sides:[]}}});
        }    
    } else {
        try{
            order = await Order.findById(req.cookies.orderId).populate('items.pizzas')
        } catch (err) {
            res.render('error', {title: "Error", order:{items:{ pizzas:[],sides:[]}}});
        }
    }
    try{
        prebuiltPizzas = await Pizza.find({ type: "Prebuilt" })
        res.render('order/index', { title: "Little Italy | Order", order, prebuiltPizzas })
    } catch (err) {
        res.render('error', {title: "Error", order});
    }    
}

async function newBuild(req, res) {
    try{
        const order = await Order.findById(req.cookies.orderId).populate('items.pizzas')
        res.render('builder/new', { title: "Little Italy | Deal Builder", order })
    } catch (err) {
        res.render('error', {title: "Error", order:{items:{ pizzas:[],sides:[]}}});
    }
}

async function createBuild(req, res, next) {
    const pizzaData = { ...req.body }
    pizzaData.name = namePizza(pizzaData)
    pizzaData.price = pricePizza(pizzaData)
    try {
        const newPizza = await Pizza.create(pizzaData)
        const orderId = req.cookies.orderId
    try {
        const order = await Order.findById(orderId).populate('items.pizzas')
        order.items.pizzas.push(newPizza)
        order.total = calcTotal(order.items)
        try {
            await order.save().then(res.redirect('/order'))
        } catch (err) {
            res.render('error', {title: "Error", order:{items:{ pizzas:[],sides:[]}}});
        }
    } catch (err) {
        res.render('error', {title: "Error", order:{items:{ pizzas:[],sides:[]}}});
    }    
    } catch (err) {
        res.render('error', {title: "Error", order:{items:{ pizzas:[],sides:[]}}});
    }
}

async function editBuild(req, res) {
    const itemId = req.params.id
    try {
        const pizza = await Pizza.findById(itemId)
        try{
            const order = await Order.findById(req.cookies.orderId).populate('items.pizzas')
            res.render('builder/edit', { title: "Little Italy | Edit Deal", order, pizza })
        } catch (err) {
            res.render('error', {title: "Error", order:{items:{ pizzas:[],sides:[]}}});
        }
    } catch (err) {
        res.render('error', {title: "Error", order:{items:{ pizzas:[],sides:[]}}});
    }
}

async function saveBuild(req, res) {
    const orderId = req.cookies.orderId
    const itemId = req.params.id
    newPizza = { ...req.body }
    newPizza.name = namePizza(newPizza)
    newPizza.price = pricePizza(newPizza)
    try{
        await Pizza.findOneAndUpdate(
            { _id: itemId },
            {
                $set: {
                    size: newPizza.size,
                    crust: newPizza.crust,
                    sauce: newPizza.sauce,
                    cut: newPizza.cut,
                    cheese: newPizza.cheese,
                    meats: newPizza.meats ? newPizza.meats : [],
                    veggies: newPizza.veggies ? newPizza.veggies : [],
                    quantity: newPizza.quantity,
                    name: newPizza.name,
                    price: newPizza.price
                }
            }
        )
        try{
            const order = await Order.findById(orderId).populate('items.pizzas')
            order.total = calcTotal(order.items)
            try{    
                await order.save().then(res.redirect('/order/cart'))
            } catch (err) {
                res.render('error', {title: "Error", order:{items:{ pizzas:[],sides:[]}}});
            }  
        } catch (err) {
            res.render('error', {title: "Error", order:{items:{ pizzas:[],sides:[]}}});
        }
    } catch (err) {
        res.render('error', {title: "Error", order:{items:{ pizzas:[],sides:[]}}});
    }       
}

async function addToCart(req, res) {
    const itemId = req.params.id
    try{
        const pizza = await Pizza.findById(itemId)
        const pizzaData = { ...pizza._doc }
    pizzaData.type = "Custom"
    pizzaData.size = req.body.size
    pizzaData.quantity = req.body.quantity
    pizzaData.crust = req.body.crust
    pizzaData.name = `${pizzaData.size}, ${pizzaData.crust}, ${pizzaData.name} Pizza`
    delete pizzaData._id
    delete pizzaData.createdAt
    delete pizzaData.updatedAt
    delete pizzaData.__v
    try{    
        newPizza = await Pizza.create(pizzaData)
        try{ 
            order = await Order.findById(req.cookies.orderId).populate('items.pizzas')
            order.items.pizzas.push(newPizza)
            order.total = calcTotal(order.items)
            try{
                await order.save()
                res.redirect('/order')
            } catch (err) {
                res.render('error', {title: "Error", order:{items:{ pizzas:[],sides:[]}}});
            }   
        } catch (err) {
            res.render('error', {title: "Error", order:{items:{ pizzas:[],sides:[]}}});
        }
    } catch (err) {
        res.render('error', {title: "Error", order:{items:{ pizzas:[],sides:[]}}});
    } 
    } catch (err) {
        res.render('error', {title: "Error", order:{items:{ pizzas:[],sides:[]}}});
    }      
}

async function show(req, res) {
    let order = {}
    if (req.cookies.orderId === undefined) {
        try{
            order = await Order.create({})
            res.cookie(`orderId`, `${order._id}`);
        } catch (err) {
            res.render('error', {title: "Error", order:{items:{ pizzas:[],sides:[]}}});
        } 
    } else {
        try{
            order = await Order.findById(req.cookies.orderId).populate('items.pizzas')
        } catch (err) {
            res.render('error', {title: "Error", order:{items:{ pizzas:[],sides:[]}}});
        }     
    }
    try{
        prebuiltPizzas = await Pizza.find({ type: "Prebuilt" })
        res.render('cart/index', { title: "Little Italy | Cart", order, prebuiltPizzas })
    } catch (err) {
        res.render('error', {title: "Error", order:{items:{ pizzas:[],sides:[]}}});
    } 
}

async function deleteItem(req, res) {
    const orderId = req.cookies.orderId
    const itemId = req.params.id
    try{    
        let order = await Order.findById(orderId).populate('items.pizzas')
        index = order.items.pizzas.findIndex(pizza => JSON.stringify(pizza._id) === JSON.stringify(itemId))
        order.items.pizzas.splice(index, 1)
        order.total = calcTotal(order.items)
        try{
            await order.save()
            try{
                await Pizza.findByIdAndDelete(itemId)
                res.redirect('/order/cart')
            } catch (err) {
                res.render('error', {title: "Error", order:{items:{ pizzas:[],sides:[]}}});
            } 
        } catch (err) {
            res.render('error', {title: "Error", order:{items:{ pizzas:[],sides:[]}}});
        }   
    } catch (err) {
        res.render('error', {title: "Error", order:{items:{ pizzas:[],sides:[]}}});
    }
       
}

async function editQuantity(req, res) {
    const orderId = req.cookies.orderId
    const itemId = req.params.id
    const newQty = parseInt(req.body.qty)
    try {
        const pizza = await Pizza.findById(itemId)
        if (!(pizza.quantity === 1 && newQty === -1)) {
            pizza.quantity += newQty
            try{
                await pizza.save()
            } catch (err) {
                res.render('error', {title: "Error", order:{items:{ pizzas:[],sides:[]}}});
            }    
        }
        try{
            const order = await Order.findById(orderId).populate('items.pizzas')
            order.total = calcTotal(order.items)
            try{  
                await order.save()
                res.redirect('/order/cart')
            } catch (err) {
                res.render('error', {title: "Error", order:{items:{ pizzas:[],sides:[]}}});
            }   
        } catch (err) {
            res.render('error', {title: "Error", order:{items:{ pizzas:[],sides:[]}}});
        } 
    } catch (err) {
        res.render('error', {title: "Error", order:{items:{ pizzas:[],sides:[]}}});
    } 
}

async function checkout(req, res, next) {
    const orderId = req.cookies.orderId
    try {
        const order = await Order.findById(orderId).populate('items.pizzas')
        res.render('checkout/index', { title: "Little Italy | Checkout", order })
    } catch (err) {
        console.log(err)
        res.render('error', {title: "Error", order:{items:{ pizzas:[],sides:[]}}});
    }
}

async function handlePayment(req, res) {
    const orderId = req.cookies.orderId
    const userData = { ...req.body }
    try{
        const customer = await Customer.create({})
        customer.firstName = userData.firstName
        customer.lastName = userData.lastName
        customer.email = userData.email
        customer.address.street = userData.street
        customer.address.city = userData.city
        customer.address.state = userData.state
        customer.address.zip = userData.zip
        let card
        if (userData.paymentMethod === "Card") {
            try{
                card = await Card.create({})
                card.ccName = userData.ccName
                card.ccNum = userData.ccNum
                card.ccExp = userData.ccExp
                card.ccCvv = userData.ccCvv
                try{    
                    await card.save()
                } catch (err) {
                    console.log(err)
                    res.render('error', {title: "Error", order:{items:{ pizzas:[],sides:[]}}});
                }    
                customer.card = card._id
            } catch (err) {
                console.log(err)
                res.render('error', {title: "Error",order:{items:{ pizzas:[],sides:[]}}});
            }
        }
        try{
            await customer.save()
            try{    
                const order = await Order.findById(orderId)
                order.paymentMethod = userData.paymentMethod
                order.customer = customer
                order.status = "Confirmed"
                try{    
                    await order.save()
                    res.clearCookie('orderId')
                    sendOrder = {
                        _id: order._id,
                        items: { pizzas: [] },
                        customer
                    }
                    res.render('order/status', { title: "Little Italy | Order Status", order: sendOrder })
                } catch (err) {
                    console.log(err)
                    res.render('error', {title: "Error", order:{items:{ pizzas:[],sides:[]}}});
                }
            } catch (err) {
                console.log(err)
                res.render('error', {title: "Error", order:{items:{ pizzas:[],sides:[]}}});
            }
        } catch (err) {
            console.log(err)
            res.render('error', {title: "Error", order:{items:{ pizzas:[],sides:[]}}});
        }
    } catch (err) {
        console.log(err)
        res.render('error', {title: "Error", order:{items:{ pizzas:[],sides:[]}}});
    }    

 

}

function calcTotal(items) {
    let tot = 0
    for (let pizza of items.pizzas) {
        tot += pizza.price * pizza.quantity
    }
    return tot
}

function namePizza(pizza) {
    let name = `${pizza.size}, ${pizza.crust}, `
    if (pizza.meats && pizza.meats === "Ham" &&
        pizza.veggies && pizza.veggies === "Pineapple") {
        name += `Hawaiian Pizza`
    } else if (pizza.meats && pizza.meats === "Ham" &&
        pizza.veggies && pizza.veggies.includes("Pineapple")) {
        name += `Hawaiian Specialty Pizza`
    } else if (pizza.meats && pizza.meats === "Pepperoni" && pizza.veggies) {
        name += `Pepperoni Specialty Pizza`
    } else if (pizza.meats && pizza.meats === "Chicken" && pizza.sauce === "BBQ" && !pizza.veggies) {
        name += `BBQ Chicken Pizza`
    } else if (pizza.meats && pizza.meats === "Chicken" && pizza.sauce === "Buffalo" && !pizza.veggies) {
        name += `Buffalo Chicken Pizza`
    } else if (pizza.meats && pizza.meats === "Chicken" && pizza.sauce === "BBQ") {
        name += `BBQ Chicken Specialty Pizza`
    } else if (pizza.meats && pizza.meats === "Chicken" && pizza.sauce === "Buffalo") {
        name += `Buffalo Chicken Specialty Pizza`
    } else if (pizza.meats && pizza.meats.constructor !== String && !pizza.veggies ||
        (pizza.meats && pizza.meats.constructor !== String && pizza.veggies && pizza.veggies.constructor === String)) {
        name += `Meat Lover Pizza`
    } else if (pizza.meats && pizza.meats.constructor !== String && pizza.meats.length >= 3 &&
        pizza.veggies && pizza.veggies.constructor !== String && pizza.veggies.length >= 3) {
        name += `The Works`
    } else if (pizza.meats && pizza.meats.constructor !== String && pizza.meats.length >= 2 &&
        pizza.veggies && pizza.veggies.constructor !== String && pizza.veggies.length >= 2) {
        name += `Supreme Pizza`
    } else if (pizza.meats && pizza.meats.constructor === String) {
        name += `${pizza.meats} Pizza`
    } else if (pizza.veggies && pizza.veggies.constructor === String) {
        name += `${pizza.veggies} Pizza`
    } else if (pizza.veggies && pizza.veggies.constructor !== String) {
        name += `Veggie Lover Pizza`
    } else if (pizza.sauce === "Marinara" && pizza.cheese !== "No" && !pizza.meats && !pizza.veggies) {
        name += `${pizza.cheese} Margherita Pizza`
    } else {
        name += `${pizza.cheese} Cheese Pizza`
    }
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