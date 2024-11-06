import axios from 'axios';

const API_BE_URL = import.meta.env.VITE_API_BE_URL;

// Tạo instance Axios với cấu hình mặc định
const axiosInstance = axios.create({
  baseURL: API_BE_URL,
  headers: {
    'ngrok-skip-browser-warning': '69420'
  }
});

export interface CartItem {
    id: number;
    productId: number;
    productName: string;
    price: number;
    rentalPrice: number;
    quantity: number;
    addedAt: string;
}

export interface AddToCartRequest {
    customerId: number;
    productId: number;
    quantity: number;
}

export const addToCart = async (customerId: number, productId: number, quantity: number) => {
    try {
        const request: AddToCartRequest = {
            customerId,
            productId,
            quantity
        };
        const response = await axiosInstance.post('api/ShoppingCarts/add-to-cart', request);
        return response.data;
    } catch (error) {
        console.error('Error adding to cart:', error);
        throw error;
    }
};

export const getCartItems = async (customerId: number): Promise<CartItem[]> => {
    try {
        const response = await axiosInstance.get<CartItem[]>(`api/ShoppingCarts/cart-items/${customerId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching cart items:', error);
        throw error;
    }
};

export const removeFromCart = async (productId: number) => {
    try {
        await axiosInstance.delete(`api/ShoppingCarts/remove-from-cart/${productId}`);
    } catch (error) {
        console.error('Error removing from cart:', error);
        throw error;
    }
};

export const updateCartItemQuantity = async (cartItemId: number, quantity: number) => {
    try {
        await axiosInstance.put(`api/ShoppingCarts/${cartItemId}`, { quantity });
    } catch (error) {
        console.error('Error updating cart item quantity:', error);
        throw error;
    }
};
