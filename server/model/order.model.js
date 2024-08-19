const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'user',
    required: true,
  },
  restaurantId: {
    type: mongoose.Schema.ObjectId,
    ref: 'owner',
    required: true,
  },
  items: [
    {
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
  orderStatus: {
    type: String,
    required: true,
  },
}, {timestamps: true});

const orderModel = mongoose.model('order', orderSchema);

module.exports = orderModel;
