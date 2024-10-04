import axios from 'axios';

const API_BE_URL = import.meta.env.VITE_API_BE_URL;

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
        const response = await axios.post(`${API_BE_URL}api/ShoppingCarts/add-to-cart`, request);
        return response.data;
    } catch (error) {
        console.error('Error adding to cart:', error);
        throw error;
    }
};

export const getCartItems = async (customerId: number): Promise<CartItem[]> => {
    try {
        const response = await axios.get<CartItem[]>(`${API_BE_URL}api/ShoppingCarts/cart-items/${customerId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching cart items:', error);
        throw error;
    }
};

