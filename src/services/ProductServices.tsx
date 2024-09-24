import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_BE_URL = import.meta.env.VITE_API_BE_URL;

export interface Product {
  id: string;
  name: string;
  image: Array<string>;
  rent_price: number;
  purchase_price: number;
  type: string;
  quantity: number;
  size: string;
  rate: number;
  des: string;
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

// New function to get a product by its ID
export const getProductById = async (id: string): Promise<Product | null> => {
  try {
    const response = await axios.get<Product>(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    return null;
  }
};



// Định nghĩa kiểu dữ liệu cho Product
export interface Product1 {
  id: number;
  productName: string;
  description: string;
  price: number;
  rentalPrice: number;
  isRentable: boolean;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
  status: boolean;
  image: string;
  cartItems: any[];
  orderDetails: any[];
  rentals: any[];
}

// Định nghĩa các giá trị cho categoryId
const CATEGORY_MAP: { [key: number]: string } = {
  1: 'Leu',
  2: 'Phu Kien',
  3: 'Trang Bi',
};

// Hàm lấy tất cả sản phẩm
export const getAllProduct = async (): Promise<Product1[]> => {
  try {
    const response = await axios.get<Product1[]>(`${API_BE_URL}Product/getAll`); // Thay bằng URL thật của API
    const products = response.data.map((product) => {
      return {
        ...product,
        categoryName: CATEGORY_MAP[product.categoryId], // Thêm tên category dựa vào categoryId
      };
    });
    console.log(products)
    return products;
  } catch (error) {
    console.error('Error fetching products', error);
    throw error;
  }
};
