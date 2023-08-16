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


module.exports = mongoose.model('Pizza', pizzaSchema);