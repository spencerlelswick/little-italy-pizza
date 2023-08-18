const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    paymentMethod:{
      type: String,
      enum: ["Card", "Cash"]
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