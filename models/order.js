const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    // items: [{
    //   type: Schema.Types.ObjectId,
    //   ref: 'Pizza'
    // }],
    items: [{ name: 'pizza' }],
    total: {
      type: Number,
      default: 0,
      min: 0,
    },
    status: { type: String, enum: ["received", "confirmed", "prepare", "bake", "deliver", "complete"] },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Order', orderSchema);