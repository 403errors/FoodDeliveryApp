const express = require('express');
const router = express.Router();
const orderController = require('../controller/order.controller');
const jwtVerify = require('../middleware/jwtToken.middlware');

// Define routes for orders
router.post('/create', jwtVerify, orderController.createOrder);
router.get('/:orderId', jwtVerify, orderController.getOrderById);
router.get('/user/:userId', jwtVerify, orderController.getOrdersByUser);
router.get('/restaurant/:restaurantId', jwtVerify, orderController.getOrdersByRestaurant);
// Add more routes as needed

module.exports = router;
