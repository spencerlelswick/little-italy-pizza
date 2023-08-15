const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Pizza = require('../models/pizza')

// const orderSchema = new Schema(  //old working
//   {
//     items: {
//       pizzas:[],
//       sides: []
//     },
//     total: {
//       type: Number,
//       default: 0,
//       min: 0,
//     },
//     status: {
//       type: String,
//       default: 'received',
//       enum: ["received", "confirmed", "prepare", "bake", "deliver", "complete"]
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

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
      default: 'received',
      enum: ["received", "confirmed", "prepare", "bake", "deliver", "complete"]
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Order', orderSchema);