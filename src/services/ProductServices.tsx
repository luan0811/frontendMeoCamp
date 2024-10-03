import axios from 'axios';

const API_BE_URL = import.meta.env.VITE_API_BE_URL;




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
  quantity: number;
  images: string[];
  cartItems: any[];
  orderDetails: any[];
  rentals: any[];
  rate: number;
  subcate: string;
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

// Update the getProductDetail function to return Product1
export const getProductDetail = async (id: string): Promise<Product1 | null> => {
  try {
    const response = await axios.get<Product1>(`${API_BE_URL}Product/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    return null;
  }
};

export const deleteProduct = async (id: string): Promise<Product1 | null> => {
  try {
    const response = await axios.delete<Product1>(`${API_BE_URL}Product/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    return null;
  }
};

export const updateProduct = async (id: string, updatedProduct: Product1): Promise<Product1 | null> => {
  try {
    const response = await axios.put<Product1>(`${API_BE_URL}Product/${id}`, updatedProduct);
    return response.data;
  } catch (error) {
    console.error(`Error updating product with id ${id}:`, error);
    return null;
  }
};