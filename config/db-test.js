const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;
	
db.on('connected', function() {
  console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.port}`);
});

const pizzaSchema = new Schema(
    {
    name: {type: String},
    type: {type: String, default: "pizza"},
    size: {type: [String], enum:["Large","Medium","Small"], default:"Large"},
    crust: {type: [String], enum:["Thin","Regular","Deepdish"], default:"Regular"},
    sauce: {type: [String], enum:["Marinara","BBQ","Buffalo"], default:"Marinara"},
    cut: {type: [String], enum:["Normal","Square"], default:"Normal"},
    cheese: {type: [String], enum:["Normal","Light","Extra","No"], default:"Normal"},
    meats: {type: [String], enum:["Anchovies","Sausage","Italian Sausage","Bacon","Pepperoni","Chicken","Salami","Philly Steak","Ham","Beef","Meatballs"]},
    veggie: {type: [String], enum:["Roma Tomatoes","Green Olives","Onions","Black Olives","Green Peppers","Pineapple","Banana Peppers","Spinach","Jalapeno Peppers","Mushrooms"]},
    quantity: {type: Number, min: 1, default: 1},
    id: {},
    price: {type: Number, min: 1},
    },
    {
      timestamps: true,
    }
  )