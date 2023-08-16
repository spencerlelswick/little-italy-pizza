const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Pizza = require('../models/pizza')
const Customer = require('../models/customer')

const orderSchema = new Schema(
  {
    items: {
      pizzas: {type: [Schema.Types.ObjectId],
        ref: 'Pizza',
        default:[]
    },
      sides: []
    },
    total: {
      type: Number,
      default: 0,
      min: 0,
    },
    status: {
      type: String,
      default: 'Received',
      enum: ["Received", "Confirmed", "Prepare", "Bake", "Deliver", "Complete"]
    },
    customer:{
      type: Schema.Types.ObjectId,
      ref: 'Customer',
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Order', orderSchema);