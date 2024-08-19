import React, { useState } from "react";
import { useCartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";

function CardsGroupSort({ item, restId, restName }) {
  const { cart, updateCart } = useCartContext();
  const [quantity, setQuantity] = useState(1);

  function handlePlus() {
    setQuantity((prev) => prev + 1);
  }

  function handleMinus() {
    setQuantity((prev) => (prev >= 1 ? prev - 1 : 0));
  }

  const handleAddToCart = () => {
    // Check if the item is already in the cart
    const existingCartItemIndex = cart.findIndex(
      (cartItem) => cartItem.item.id === item.id && cartItem.restId === restId
    );

    if (existingCartItemIndex !== -1) {
      // Item already exists in the cart, update the quantity
      const updatedCart = [...cart];
      updatedCart[existingCartItemIndex].quantity += quantity;
      updateCart(updatedCart);
      toast("Product Added");
    } else {
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
    }
  };

  // console.log(cart,"Cart sort");
  return (
    <div className="card-group mb-3 h-5   ">
      <div key={item._id} className="card mx-3">
        <h5 className="card-title">{item.restaurantName}</h5>
        <span style={{ borderRadius: "25px" }}>
          <Link to={`/product/${item._id}`} style={{ textDecoration: "none" }}>
            <img src={item.imageURL} className="card-img-top" alt="Card" />
          </Link>
        </span>
        <div className="card-body">
          <h6><i class="fa fa-cutlery" aria-hidden="true"></i>  {restName}</h6>
          <h5 className="card-title">{item.name}</h5>
          <h5 className="card-text fw-bold">&#8377;{item.price}</h5>
          <div className="d-flex justify-content-center   me-auto">
            {/* <h5>Quantity  &nbsp;</h5> */}
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
        <div className="card-footer ">
          <small className="text-muted">
            <button
              onClick={handleAddToCart}
              className="w-100 btn btn-block btn-primary"
            >
              Add to Cart
            </button>
          </small>
        </div>
      </div>
    </div>
  );
}

export default CardsGroupSort;
