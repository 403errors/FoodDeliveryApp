const mongoose = require("mongoose");

const ownerSchema = new mongoose.Schema({
  restaurantName: {
    type: String,
    required: true,
  },
  menuItems: [
    {
      name: {
        type: String,
        required: true,
      },
      imageURL:{
        type:String,
        required:true
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
  cuisineType: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  ownerId: {
    type: mongoose.Schema.ObjectId,
    ref: 'user',
    required: true,
  },
});

const ownerModel = mongoose.model('owner', ownerSchema);
module.exports = ownerModel;
