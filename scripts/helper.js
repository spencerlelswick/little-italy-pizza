function namePizza(pizza){
    let name = `${pizza.size} ${pizza.crust} crust` 

    if (pizza.meats.constructor === String){
        name += ` ${pizza.meats} pizza`
    } else if (pizza.meats.length > 1){
        name += ` meat lover pizza`
    } else if (pizza.veggies.constructor === String){
        name += ` ${pizza.veggies} pizza`
    } else if (pizza.veggies.length > 1){
        name += ` veggie lover pizza`
    } else {
        name += ` ${pizza.cheese} pizza`
    }
    return name
}

module.exports = {
    namePizza,
}