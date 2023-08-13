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

function pricePizza(pizza){
    let price = 10
    let toppingCost = 1
    if (pizza.meats){
        if(pizza.meats.constructor === String){
        price += toppingCost
        }else {
        price += toppingCost * pizza.meats.length
        }
    }
    if (pizza.veggies){
        if(pizza.veggies.constructor === String){
        price += toppingCost
        }else {
        price += toppingCost * pizza.veggies.length
        }
    }
    return price
}

function totalOrder(order){
    let total = 0
    order.items.pizzas.forEach(pizza => {
        total += pizza.price*pizza.quantity
    });
    order.items.sides.forEach(side => {
        total += side.price*pizza.quantity
    });
    return total
}

module.exports = {
    namePizza,
    pricePizza,
    totalOrder,
}