const { validationResult } = require("express-validator");
const Owner = require("../model/owner.model");

// Controller for creating a new restaurant
exports.createOwner = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: "error", errors: errors.array() });
  }

  try {
    const owner = await Owner.create({
      ...req.body,
      // Assuming the user ID is stored in the JWT token
    });
    res.status(201).json({ status: "success", data: owner });
  } catch (error) {
    res.status(500).json({ status: error, message: "Internal server error" });
  }
};

// Controller for updating restaurant details
exports.updateOwner = async (req, res) => {
  const errors = validationResult(req);
  //   console.log(req.user.user._id,"user ID Controller");
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: "error", errors: errors.array() });
  }

  try {
    // Use req.user to access the user details from the token
    const owner = await Owner.findOneAndUpdate(
      { _id: req.params.id, ownerId: req.user.user._id },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!owner) {
      return res
        .status(404)
        .json({ status: "error", message: "Owner not found" });
    }

    res.status(200).json({ status: "success", data: owner });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

// Controller for deleting a restaurant
exports.deleteOwner = async (req, res) => {
  try {
    // Use req.user to access the user details from the token
    const owner = await Owner.findOneAndDelete({
      _id: req.params.id,
      ownerId: req.user.user._id,
    });

    if (!owner) {
      return res
        .status(404)
        .json({ status: "error", message: "Owner not found" });
    }

    res
      .status(200)
      .json({ status: "success", message: "Owner deleted successfully" });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

// Controller for adding a new food item to a restaurant's menu
exports.addFoodItem = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: "error", errors: errors.array() });
  }

  try {
    const owner = await Owner.findOne({
      _id: req.body.restaurantId,
      ownerId: req.user.user._id,
    });
    // console.log(owner,"FoodItem owner");
    if (!owner) {
      return res
        .status(404)
        .json({ status: "error", message: "Owner not found" });
    }

    console.log(req.body);
    owner.menuItems.push({
      name: req.body.name,
      quantity: req.body.quantity,
      price: req.body.price,
    });
    // console.log(owner.menuItems,"After adding");

    await owner.save();

    res.status(201).json({ status: "success", data: owner.menuItems });
  } catch (error) {
    res.status(500).json({ status: error, message: "Internal server error" });
  }
};

// Controller for updating food item details
exports.updateFoodItem = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: "error", errors: errors.array() });
  }

  try {
    // Use req.user to access the user details from the token
    const owner = await Owner.findOne({
      _id: req.params.restaurantId,
      ownerId: req.user.user._id,
    });

    if (!owner) {
      return res
        .status(404)
        .json({ status: "error", message: "Owner not found" });
    }
   
    const foodItem = owner.menuItems.id(req.params.id);

    if (!foodItem) {
      return res
        .status(404)
        .json({ status: "error", message: "Food item not found" });
    }
    // console.log(req.body);
    foodItem.set(req.body);

    await owner.save();

    res.status(200).json({ status: "success", data: foodItem });
  } catch (error) {
    res.status(500).json({ status: error, message: "Internal server error" });
  }
};

// Controller for deleting a food item
exports.deleteFoodItem = async (req, res) => {
  try {
    // Use req.user to access the user details from the token
    const owner = await Owner.findOne({
      _id: req.params.restaurantId,
      ownerId: req.user.user._id,
    });

    if (!owner) {
      return res
        .status(404)
        .json({ status: "error", message: "Owner not found" });
    }

    console.log(owner);
    const foodItemIndex = owner.menuItems.findIndex(item => item._id.toString() === req.params.id);

    if (foodItemIndex === -1) {
      return res.status(404).json({ status: 'error', message: 'Food item not found' });
    }

    owner.menuItems.splice(foodItemIndex, 1); // Remove the food item from the menuItems array

    await owner.save(); // Save the changes to the database

    res
      .status(200)
      .json({ status: "success", message: "Food item deleted successfully" });
  } catch (error) {

    console.log(error,"error in deleting food item");
    res.status(500).json({ status: error, message: "Internal server error" });
  }
};

exports.getAllResaurants = async (req,res)=>{
  const errors = validationResult(req);
  //   console.log(req.user.user._id,"user ID Controller");
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: "error", errors: errors.array() });
  }

  try {
   
    const owner = await Owner.find({});
   
    if (!owner) {
      return res
        .status(404)
        .json({ status: "error", message: "Owner not found" });
    }

    res.status(200).json({ status: "success", data: owner });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
}



exports.getResaurantsById = async (req,res)=>{
  const errors = validationResult(req);
  //   console.log(req.user.user._id,"user ID Controller");
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: "error", errors: errors.array() });
  }

  try {
   
    const ownerId = req.params.id; // Assuming you pass the owner ID as a parameter in the route
    console.log((ownerId));
    const owner = await Owner.findById(ownerId);
     console.log(owner);
    if (!owner) {
      return res.status(404).json({ status: false, message: 'Owner not found' });
    }

    res.status(200).json({ status:true, owner });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
}

exports.findFoodById = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: "error", errors: errors.array() });
  }

  try {
    const owner = await Owner.findOne({
      'menuItems._id': req.params.foodId,
    });

    if (!owner) {
      return res
        .status(404)
        .json({ status: "error", message: "Owner not found" });
    }
   
    const foodItem = owner.menuItems.id(req.params.foodId);
    // console.log(foodItem);
    if (!foodItem) {
      return res
        .status(404)
        .json({ status: "error", message: "Food item not found" });
    }

    const rest= {
      restaurantName: owner.restaurantName,
      cuisineType:owner.cuisineType,
      address: owner.address,
      status:owner.status,
      phone: owner.phone,
      description: owner.description,
      ownerId: owner.ownerId,
    }
    res.status(200).json({ status: "success", foodItem ,rest});
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};



