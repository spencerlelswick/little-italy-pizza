require('dotenv').config()
require('./database')
mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;
db.on('connected', function () {
    console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.port}`);
});

const Pizza = require('../models/pizza')

console.log("Baking pizzas")

await Pizza.create({
    id: 1111111111,
    name: "Margherita",
    type: "Prebuilt",
    price: 11
})

await Pizza.create({
    id: 2222222222,
    name: "Mexican Fiesta",
    type: "Prebuilt",
    meats: ["Pepperoni"],
    veggies: ["Green Peppers", "Banana Peppers", "Jalapeno Peppers"],
    price: 15
})

await Pizza.create({
    id: 3333333333,
    name: "Mountain",
    type: "Prebuilt",
    meats: ["Sausage"],
    veggies: ["Mushrooms"],
    price: 13
})

await Pizza.create({
    id: 4444444444,
    name: "Napoli",
    type: "Prebuilt",
    cheese: "No",
    meats: ["Anchovies"],
    price: 11
})

await Pizza.create({
    id: 4444444444,
    name: "Hawaiian Fantasy",
    type: "Prebuilt",
    meats: ["Sausage"],
    veggies: ["Pineapple","Black Olives", "Green Peppers"],
    price: 13
})


