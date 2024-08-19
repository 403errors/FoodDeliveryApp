const { validationResult } = require('express-validator');
const Order = require('../model/order.model');

// Controller for creating a new order
exports.createOrder = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: 'error', errors: errors.array() });
  }

  try {
    // Use req.user to access the user details from the token
    const order = await Order.create({
      ...req.body,
      userId: req.user.user._id, // Assuming the user ID is stored in the JWT token
    });
    res.status(201).json({ status: true, data: order });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, error,message: 'Internal server error' });
  }
};

// Controller for getting an order by ID
exports.getOrderById = async (req, res) => {
  try {

    console.log(req.params.orderId,req.user.user._id);
    const order = await Order.findOne({ _id: req.params.orderId, userId: req.user.user._id });
    if (!order) {
      return res.status(404).json({ status: 'error', message: 'Order not found' });
    }
    res.status(200).json({ status: 'success', data: order });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

// Controller for getting orders by user ID
exports.getOrdersByUser = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.status(200).json({ status: 'success', data: orders });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

// Controller for getting orders by restaurant ID
exports.getOrdersByRestaurant = async (req, res) => {
  try {
    const orders = await Order.find({ restaurantId: req.params.restaurantId });
    res.status(200).json({ status: 'success', data: orders });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};
// Add more controllers as needed
