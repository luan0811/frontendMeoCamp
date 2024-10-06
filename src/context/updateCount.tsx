import { useState, useCallback } from 'react';
import { getCartItems } from '../services/CartServices';

export const useCart = () => {
  const [cartItemCount, setCartItemCount] = useState(0);

  const updateCartItemCount = useCallback(async () => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      try {
        const items = await getCartItems(parseInt(userId));
        setCartItemCount(items.length);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    }
  }, []);

  return { cartItemCount, updateCartItemCount };
};
