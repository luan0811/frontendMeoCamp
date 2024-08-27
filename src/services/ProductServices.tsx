import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface Product {
  id: string;
  name: string;
  image: string;
  rent_price: number;
  purchase_price: number;
  type: string;
  quantity: number;
  size: string;
  rate: number;
}

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get<Product[]>(`${API_BASE_URL}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};
