const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pizzaSchema = new Schema(
    {
        name: {
            type: String,
            default: "Pizza"
        },
        type: {
            type: String,
            enum: ["Custom", "Prebuilt"],
            default: "Custom"
        },
        size: {
            type: String,
            enum: ["Large", "Medium", "Small"],
            default: "Large"
        },
        crust: {
            type: String,
            enum: ["Thin", "Regular", "Deepdish"],
            default: "Regular"
        },
        sauce: {
            type: String,
            enum: ["Marinara", "BBQ", "Buffalo"],
            default: "Marinara"
        },
        cut: {
            type: String,
            enum: ["Normal", "Square"],
            default: "Normal"
        },
        cheese: {
            type: String,
            enum: ["Normal", "Light", "Extra", "No"],
            default: "Normal"
        },
        meats: {
            type: [String],
            enum: ["Anchovies", "Sausage", "Italian Sausage", "Bacon", "Pepperoni", "Chicken", "Salami", "Philly Steak", "Ham", "Beef", "Meatballs"],
            default: []
        },
        veggies: {
            type: [String],
            enum: ["Roma Tomatoes", "Green Olives", "Onions", "Black Olives", "Green Peppers", "Pineapple", "Banana Peppers", "Spinach", "Jalapeno Peppers", "Mushrooms"],
            default: []
        },
        quantity: {
            type: Number,
            min: 1,
            default: 1
        },
        price: {
            type: Number,
            min: 1,
            default: 10
        },
    },
    {
        timestamps: true,
    }
)

// NOT USING THIS BUT DIDNT FEEL LIKE DELETING THEM RIGHT NOW
// function namePizza(){
//     let name = `${this.size}, ${this.crust} Crust, `
//     if(this.meats.includes("Ham") && this.veggies === ["Pineapple"]){
//         name += `Hawaiian`
//     }else if(this.meats.includes("Ham") && this.veggies.length > 1 && this.veggies.includes("Pineapple")){
//         name += `Hawaiian Specialty`
//     }else if (this.meats === ["Pepperoni"] && this.veggies.length > 1){
//         name += `Pepperoni Specialty`
//     }else if(this.meats === ["Chicken"] && this.sauce === "BBQ" && !this.veggies.length){
//         name += `BBQ Chicken`
//     }else if(this.meats === ["Chicken"] && this.sauce === "Buffalo" && !this.veggies.length){
//         name += `Buffalo Chicken`
//     }else if(this.meats === ["Chicken"] && this.sauce === "BBQ"){
//         name += `BBQ Chicken Specialty`
//     }else if(this.meats === ["Chicken"] && this.sauce === "Buffalo"){
//         name += `Buffalo Chicken Specialty`
//     }else if (this.meats.length > 1 && this.veggies.length <= 1){
//         name += `Meat Lover`    
//     }else if (this.meats.length >= 3 && this.veggies.length >= 3){
//         name += `The Works`
//     }else if(this.meats.length >= 2 && this.veggies.length >= 2){
//         name += `The Supreme`
//     }else if (this.meats.length === 1){
//         name += `${this.meats}`
//     }else if (this.veggies.length === 1){
//         name += `${this.veggies}`
//     }else if (this.veggies.length > 1){
//         name += `Veggie Lover`
//     }else if (this.sauce === "Marinara" && this.cheese !== "No" && !this.meats.length && !this.veggies.length){
//         name += `${this.cheese} Cheese Margherita`
//     }else {
//         name += `${this.cheese} Cheese`
//     }
//     name += ` Pizza`
//     return name
// }

// function pricePizza(){
//     let price = 10
//     let toppingCost = 1

//     if (this.cheese === "Extra"){
//         price += toppingCost
//     }else if (this.cheese === "No"){
//         price -= toppingCost
//     }

//     if (this.size === "Large"){
//         price += toppingCost
//     }else if (this.size === "Small"){
//         price -=  toppingCost
//     }

//     price += toppingCost * (this.meats.length + this.veggies.length)

//     return price
// }

module.exports = mongoose.model('Pizza', pizzaSchema);