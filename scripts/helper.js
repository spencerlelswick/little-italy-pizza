const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Pizza = require('../models/pizza')

async function totalOrder(order){
    console.log(order)
    let tot = 0
    for (pizzaId of order.items.pizzas){
        let pizza = await Pizza.findById(pizzaId)
        tot += pizza.price * pizza.quantity
    }
    return tot
    
}

module.exports = {
    totalOrder,
}