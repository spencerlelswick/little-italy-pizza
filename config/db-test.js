require('dotenv').config()
require('./database')
mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;
db.on('connected', function () {
    console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.port}`);
});

const Pizza = require('../models/pizza')

console.log("Baking pizzas")

Pizza.create({
    id: 1111111111,
    name: "The Verace",
    type: "Prebuilt",
    price: 11
})

Pizza.create({
    id: 2222222222,
    name: "The Mexican Fiesta",
    type: "Prebuilt",
    meats: ["Pepperoni"],
    veggies: ["Green Peppers", "Jalapeno Peppers"],
    price: 15
})

Pizza.create({
    id: 3333333333,
    name: "The Mountain",
    type: "Prebuilt",
    meats: ["Canadian Bacon"],
    veggies: ["Mushrooms"],
    price: 13
})

Pizza.create({
    id: 4444444444,
    name: "El Diablo",
    type: "Prebuilt",
    meats: ["Salami"],
    veggies: ["Green Peppers","Banana Peppers", "Jalapeno Peppers"],
    price: 11
})

Pizza.create({
    id: 5555555555,
    name: "The First Love",
    type: "Prebuilt",
    meats: ["Pepperoni", "Bacon"],
    veggies: ["Onions"],
    price: 13
})

Pizza.create({
    id: 666666666,
    name: "The Cheesy",
    type: "Prebuilt",
    cheese: ["Extra"],
    meats: ["Sausage"],
    veggies: ["Green Olives"],
    price: 13
})

Pizza.create({
    id: 777777777,
    name: "The Smelly",
    type: "Prebuilt",
    meats: ["Sausage"],
    veggies: ["Onions"],
    price: 13
})

Pizza.create({
    id: 777777777,
    name: "The Italian Nightmare",
    type: "Prebuilt",
    meats: ["Canadian Bacon"],
    veggies: ["Pineapple"],
    price: 13
})


console.log("Pizzas are ready")
