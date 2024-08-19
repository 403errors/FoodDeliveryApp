import React, { useState } from "react";
import { useCartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function CardsGroup({ item, restId, restName }) {
  const [quantity, setQuantity] = useState(1);
  const { cart, updateCart } = useCartContext();

  function handlePlus() {
    setQuantity((prev) => prev + 1);
  }

  function handleMinus() {
    setQuantity((prev) => (prev >= 1 ? prev - 1 : 0));
  }
  const handleAddToCart = () => {
    // Check if the item is already in the cart
    const existingCartItemIndex = cart.findIndex(
      (cartItem) => cartItem.item._id === item._id && cartItem.restId === restId
    );

    if (existingCartItemIndex !== -1) {
      // Item already exists in the cart, update the quantity
      const updatedCart = [...cart];
      updatedCart[existingCartItemIndex].quantity += quantity;
      updateCart(updatedCart);
      toast("Product Added");
    } else {
      // Check if the cart is not empty and if the existing items belong to the same restaurant
      const isSameRestaurant = cart.length > 0 && cart[0].restId === restId;

      if (isSameRestaurant) {
        // Item is not in the cart, add it
        const newItem = {
          restId,
          restName,
          quantity,
          item,
        };
        const newCart = [...cart, newItem];
        updateCart(newCart);
        toast("Product Added");
      } else {
        // Clear the cart and add the new item
   
        const newCart = [
          {
            restId,
            restName,
            quantity,
            item,
          },
        ];
        updateCart(newCart);
        toast("New Resturant - Product Added");
      }
    }
  };

  // console.log(item);

  return (
    <div className="card-group  mb-3 h-5">
      <div className="card mx-3 ">
        <span style={{ borderRadius: "25px" }}>
          <Link to={`/product/${item._id}`} style={{ textDecoration: "none" }}>
            <img src={item.imageURL} className="card-img-top" alt="Card" />
          </Link>
        </span>
        <div className="card-body">
          <h6><i class="fa fa-cutlery" aria-hidden="true"></i> &nbsp;{restName}</h6>
          <h5 className="card-title">{item.name}</h5>
          <h5 className="card-text fw-bold">&#8377;{item.price}</h5>
          <div className="d-flex justify-content-center me-auto">
            {/* <h6>Quantity   &nbsp;</h6> */}
            <div
              className="plus"
              onClick={handlePlus}
              style={{
                width: "25px",
                height: "25px",
                backgroundColor: "lightblue",
                borderRadius: "7px",
                boxShadow: "2px 3px 3px gray",
              }}
            >
              +
            </div>
            &nbsp; {quantity} &nbsp;
            <div
              className="minus"
              onClick={handleMinus}
              style={{
                width: "25px",
                height: "25px",
                backgroundColor: "lightblue",
                borderRadius: "7px",
                boxShadow: "2px 3px 3px gray",
              }}
            >
              -
            </div>
          </div>
        </div>
        <div className="card-footer">
          <small className="text-muted">
            <button
              className="w-100 btn btn-block btn-primary"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </small>
        </div>
      </div>
    </div>
  );
}

export default CardsGroup;
