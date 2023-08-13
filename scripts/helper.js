function namePizza(pizza){
    let name = `${pizza.size}, ${pizza.crust} Crust` 
    
    if (pizza.meats && pizza.meats.constructor !== String && pizza.meats && pizza.meats.constructor !== String){
        name += `, The Works`
    }else if (pizza.meats && pizza.meats.constructor === String){
        name += `, ${pizza.meats}`
    } else if (pizza.meats && pizza.meats.constructor !== String){
        name += `, Meat Lover`
    } else if (pizza.veggies && pizza.veggies.constructor === String){
        name += `, ${pizza.veggies}`
    } else if (pizza.meats && pizza.meats.constructor !== String){
        name += `, Veggie Lover`
    } else {
        name += `, ${pizza.cheese} Cheese`
    }
    name += ` Pizza`

    return name
}

module.exports = {
    namePizza,
}