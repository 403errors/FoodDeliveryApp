import React, { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

const CartContext = createContext();

export const useCartContext = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const updateCart = (newCart) => {
    setCart(newCart);
  };

  const removeFromCart = (itemId) => {
    const updatedCart = cart.filter((item) => item.item._id !== itemId);
    setCart(updatedCart);
    toast("Product Removed")
  };

  return (
    <CartContext.Provider value={{ cart, updateCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
