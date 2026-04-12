import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

const API_URL = process.env.REACT_APP_BACKEND_URL + '/api';

export const CartProvider = ({ children }) => {
  const { token, user } = useAuth();
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token && user) {
      fetchCart();
    } else {
      setCart({ items: [], total: 0 });
    }
  }, [token, user]);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/cart/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCart(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (account) => {
    if (!token) {
      return { success: false, error: 'Please login to add items to cart' };
    }

    try {
      const cartItem = {
        account_id: account.id,
        title: account.title,
        price: account.price,
        image: account.image
      };

      const response = await axios.post(
        `${API_URL}/cart/add`,
        cartItem,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setCart(response.data.cart);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.detail || 'Failed to add item'
      };
    }
  };

  const removeFromCart = async (accountId) => {
    try {
      await axios.delete(`${API_URL}/cart/remove/${accountId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      await fetchCart();
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.detail || 'Failed to remove item'
      };
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete(`${API_URL}/cart/clear`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCart({ items: [], total: 0 });
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to clear cart' };
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart,
        removeFromCart,
        clearCart,
        fetchCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
