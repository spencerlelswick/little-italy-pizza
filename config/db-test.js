const mongoose = require('mongoose');
require('dotenv').config()
mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;
db.on('connected', function () {
    console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.port}`);
});

const Pizza = require('../models/pizza')

const marg = {
    name: "margherita",
    type: "Prebuilt",
    size: "Large",
    crust: "Regular",
    sauce: "Marinara",
    cut: "Normal",
    cheese: "Normal",
    quantity: 1,
    price: 11
}

const mexfiesta = {
    name: "margherita",
    type: "Prebuilt",
    size: "Large",
    crust: "Regular",
    sauce: "Marinara",
    cut: "Normal",
    cheese: "Normal",
    meats: ["Pepperoni"],
    veggies: ["Green Peppers", "Banana Peppers", "Jalapeno Peppers"],
    quantity: 1,
    price: 15
}

const mountain = {
    name: "margherita",
    type: "Prebuilt",
    size: "Large",
    crust: "Regular",
    sauce: "Marinara",
    cut: "Normal",
    cheese: "Normal",
    meats: ["Sausage"],
    veggies: ["Mushrooms"],
    quantity: 1,
    price: 13
}

const napoli = {
    name: "margherita",
    type: "Prebuilt",
    size: "Large",
    crust: "Regular",
    sauce: "Marinara",
    cut: "Normal",
    cheese: "No",
    meats: ["Anchovies"],
    quantity: 1,
    price: 11
}

Pizza.create(marg)
// Pizza.create(napoli)
// Pizza.create(mountain)
// Pizza.create(mexfiesta)


