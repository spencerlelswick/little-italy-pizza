const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;
	
db.on('connected', function() {
  console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.port}`);
});

const pizzaSchema = new Schema(
    {
      items: {
        pizzas:[],
        sides: []
      },
      total: {
        type: Number,
        default: 0,
        min: 0,
      },
      status: {
        type: String,
        default: 'received',
        enum: ["received", "confirmed", "prepare", "bake", "deliver", "complete"]
      },
    },
    {
        

    

    },
    {
      timestamps: true,
    }
  );