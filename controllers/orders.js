const Order = require('../models/order')
const localStorage = require('node-localstorage')

module.exports = {
    index,
}

async function index(req, res) {
    //check localstorage
    //if order exists, set active order to that id
    //otherwise
    //create a new order
    //set localstorage

    if (typeof localStorage === "undefined" || localStorage === null) {
        var LocalStorage = require('node-localstorage').LocalStorage;
        localStorage = new LocalStorage('./scratch');
    }
    localStorage.setItem("orderID", "123456789");
    if (localStorage.getItem("orderID") === null) {
        console.log("NULL CASE, ID:", localStorage.getItem("orderID"))
    } else {
        console.log("NOT NULL CASE, ID;", localStorage.getItem("orderID"))
    }

    res.render('order/index', { title: "Order", order: currOrder })
}