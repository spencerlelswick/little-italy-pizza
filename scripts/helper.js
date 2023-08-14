function namePizza(pizza){
    let name = `${pizza.size}, ${pizza.crust} Crust, `
    if(pizza.meats && pizza.meats === "Ham" &&
        pizza.veggies && pizza.veggies === "Pineapple"){
        name += `Hawaiian`
    }else if(pizza.meats && pizza.meats === "Ham" &&
        pizza.veggies && pizza.veggies.includes("Pineapple")){
        name += `Hawaiian Specialty`
    }else if (pizza.meats && pizza.meats === "Pepperoni" && pizza.veggies){
        name += `Pepperoni Specialty`
    }else if(pizza.meats && pizza.meats === "Chicken" && pizza.sauce === "BBQ" && !pizza.veggies){
        name += `BBQ Chicken`
    }else if(pizza.meats && pizza.meats === "Chicken" && pizza.sauce === "Buffalo" && !pizza.veggies){
        name += `Buffalo Chicken`
    }else if(pizza.meats && pizza.meats === "Chicken" && pizza.sauce === "BBQ"){
        name += `BBQ Chicken Specialty`
    }else if(pizza.meats && pizza.meats === "Chicken" && pizza.sauce === "Buffalo"){
        name += `Buffalo Chicken Specialty`
    }else if (pizza.meats && pizza.meats.constructor !== String && !pizza.veggies ||
        (pizza.meats && pizza.meats.constructor !== String && pizza.veggies && pizza.veggies.constructor === String)){
        name += `Meat Lover`    
    }else if (pizza.meats && pizza.meats.constructor !== String && pizza.meats.length >= 3 &&
        pizza.veggies && pizza.veggies.constructor !== String && pizza.veggies.length >= 3){
        name += `The Works`
    }else if(pizza.meats && pizza.meats.constructor !== String && pizza.meats.length >= 2 &&
        pizza.veggies && pizza.veggies.constructor !== String && pizza.veggies.length >= 2){
        name += `The Supreme`
    }else if (pizza.meats && pizza.meats.constructor === String){
        name += `${pizza.meats}`
    }else if (pizza.veggies && pizza.veggies.constructor === String){
        name += `${pizza.veggies}`
    }else if (pizza.veggies && pizza.veggies.constructor !== String){
        name += `Veggie Lover`
    }else if (pizza.sauce === "Marinara" && pizza.cheese !== "No" && !pizza.meats && !pizza.veggies){
        name += `${pizza.cheese} Cheese Margherita`
    }else {
        name += `${pizza.cheese} Cheese`
    }
    name += ` Pizza`
    return name
}

function pricePizza(pizza){
    let price = 10
    let toppingCost = 1
    if (pizza.cheese === "Extra"){
        price += toppingCost
    }else if (pizza.cheese === "No"){
        price -= toppingCost
    }
    if (pizza.size === "Large"){
        price += toppingCost
    }else if (pizza.size === "Small"){
        price -=  toppingCost
    }
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

function totalOrder(items){
    let total = 0
    items.pizzas.forEach(pizza => {
        total += pizza.price*pizza.quantity
    });
    items.sides.forEach(side => {
        total += side.price*side.quantity
    });
    return total
}

module.exports = {
    namePizza,
    pricePizza,
    totalOrder,
}