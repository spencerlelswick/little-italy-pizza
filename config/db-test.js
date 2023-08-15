const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on('connected', function() {
  console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.port}`);
});

const Schema = mongoose.Schema;
const Pizza = require('../models/pizza')

const marg = {
    id: "64db8ca1363eef85247c2f43",
    name: "The Margherita",
    type: "Prebuilt",
    size: "Large",
    crust: "Regular",
    sauce: "Marinara",
    cut: "Normal",
    cheese: "Normal",
    quantity: 1,
    price: 11
}
await Pizza.create(marg)

const mexfiesta = {
    id: "64db8e7595e832f5b7bdc200",
    name: "The Mexican Fiesta",
    type: "Prebuilt",
    size: "Large",
    crust: "Regular",
    sauce: "Marinara",
    cut: "Normal",
    cheese: "Normal",
    meats: ["Pepperoni"],
    veggies: ["Green Peppers", "Banana Peppers","Jalapeno Peppers"],
    quantity: 1,
    price: 15
}
await Pizza.create(mexfiesta)

const mountain = {
    id: "64db8e32c0e60d7bc01d35bd",
    name: "The Mountain",
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
await Pizza.create(mountain)

const napoli = {
    id: "64db9464f2964aa53e4b51e4",
    name: "The Napoli",
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
await Pizza.create(napoli)