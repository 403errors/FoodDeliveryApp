const express = require('express');
const ownerRouter = express.Router();
const ownerController = require('../controller/owner.controller');
const jwtVerify = require('../middleware/jwtToken.middlware');

// Define routes for owners
ownerRouter.post('/create', ownerController.createOwner);
ownerRouter.put('/update/:id',jwtVerify,ownerController.updateOwner);
ownerRouter.delete('/delete/:id',jwtVerify, ownerController.deleteOwner);
ownerRouter.post('/food/add',jwtVerify, ownerController.addFoodItem);
ownerRouter.put('/food/update/:restaurantId/:id',jwtVerify, ownerController.updateFoodItem);
ownerRouter.delete('/food/delete/:restaurantId/:id',jwtVerify, ownerController.deleteFoodItem);
ownerRouter.get('/getAll', ownerController.getAllResaurants);
ownerRouter.get('/:id', ownerController.getResaurantsById);
ownerRouter.get('/food/:foodId', ownerController.findFoodById); // Add this line

// Add more routes as needed

module.exports = ownerRouter;
