import React from 'react';
// import { useAuthContext } from "../../context/AuthContext"; // Update the import path
// import useOwnerData from '../../hooks/useOwnerData';

const Cart = () => {
  // const auth = useAuthContext();
  // const {cart}=useOwnerData();

  // if (!auth.isLogged) {
  //   return <h2 style={{marginTop:"20%"}}>Please log in to view your shopping cart.</h2>;
  // }

  return (
    <div>
      <h2>Your Shopping Cart</h2>
      {/* {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                <img src={item.imageURL} alt={item.name} style={{ width: '50px', height: '50px' }} />
                <div>
                  <h3>{item.name}</h3>
                  <p>Price: ${item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
              </li>
            ))}
          </ul>
          <p>Total: ${calculateTotal(cart)}</p>
          <button onClick={() => handleCheckout()}>Checkout</button>
        </div>
      )} */}
    </div>
  );
};

// const calculateTotal = (cart) => {
//   return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
// };

// const handleCheckout = () => {
//   // Implement your checkout logic here
//   alert('Checkout clicked! Implement your checkout logic.');
// };

export default Cart;
