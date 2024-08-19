import React from "react";
import { useCartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../ConnectionServer";
import { useAuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const Offcanvas = () => {
  const { cart, removeFromCart } = useCartContext();
  const auth = useAuthContext();
  const calculateTotal = () => {
    return cart
      .reduce((total, item) => total + item.quantity * item.item.price, 0)
      .toFixed(2);
  };

  const handleRemoveFromCart = (itemId) => {
    removeFromCart(itemId);
  };

  const handleOrder = async () => {
    const token = auth.user.token;

    try {
      const orderItems = cart.map((cartItem) => ({
        name: cartItem.item.name,
        quantity: cartItem.quantity,
        price: cartItem.item.price,
      }));

      const newOrder = {
        restaurantId: cart[0].restId, // Assuming all items in the cart are from the same restaurant
        items: orderItems,
        totalPrice: calculateTotal(), // Total price of all items in the cart
        orderStatus: "Pending",
      };

      const response = await axios.post(`${BASE_URL}/order/create`, newOrder, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast("Order Placed ");
      // console.log(response.data); // Log the response from the server
    } catch (error) {
      console.log(error);
    }
  };

  //  console.log(cart);
  return (
    <div
      className="offcanvas offcanvas-end"
      tabIndex={-1}
      id="offcanvasRight"
      aria-labelledby="offcanvasRightLabel"
    >
      <div
        className="offcanvas-header"
        style={{
          backgroundColor: "#f0f0f0",
          borderBottom: "1px solid #999898",
        }}
      >
        <div className="">Cart</div>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        />
      </div>
      <div className="offcanvas-body">
        <div className="table-responsive">
          <h4>{cart.length > 0 && cart[0].restName}</h4>
          <table className="table table-bordered m-0">
            <thead>
              <tr>
                <th className="text-center py-3 px-1" style={{ minWidth: 150 }}>
                  Product
                </th>
                <th className="text-right py-3 px-1" style={{ width: 100 }}>
                  Price
                </th>
                <th className="text-center py-3 px-1" style={{ width: 120 }}>
                  Quantity
                </th>
                <th className="text-right py-3 px-1" style={{ width: 100 }}>
                  Total
                </th>
                <th
                  className="text-center align-middle py-3 px-0"
                  style={{ width: 60 }}
                >
                  Clear Cart
                </th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.item._id}>
                  <td className="">
                    <Link
                      to={`/resturant/${item.restId}`}
                      style={{ textDecoration: "none" }}
                    >
                      <div className="d-flex align-items-center">
                        <img
                          src={item ? item.item.imageURL : "/image/food.jpg"}
                          className="mr-2"
                          width={"40px"}
                          height={"40px"}
                          alt=""
                        />
                        <div className="">
                          <Link className="d-block text-dark">
                            {item.item.name}
                          </Link>
                        </div>
                      </div>
                    </Link>
                  </td>
                  <td className="text-right font-weight-semibold align-middle p-2">
                    {item.item.price}
                  </td>
                  <td className="align-middle p-2">{item.quantity}</td>
                  <td className="text-right font-weight-semibold align-middle p-2">
                    {(item.quantity * item.item.price).toFixed(2)}
                  </td>
                  <td className="text-center align-middle px-0">
                    <button
                      className="btn btn-link shop-tooltip close float-none text-danger"
                      onClick={() => handleRemoveFromCart(item.item._id)}
                      title="Remove"
                    >
                      ×
                    </button>
                  </td>
                </tr>
              ))}
              <tr>
                <td className="text-center align-middle px-0" colSpan="5">
                  Total: {calculateTotal()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <button className="btn btn-danger w-100" onClick={handleOrder}>
          <h4>Place Order</h4>
        </button>
      </div>
    </div>
  );
};

export default Offcanvas;
