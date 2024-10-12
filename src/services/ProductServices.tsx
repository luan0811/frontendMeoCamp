import axios from 'axios';

const API_BE_URL = import.meta.env.VITE_API_BE_URL;

// Tạo một instance Axios với cấu hình mặc định
const axiosInstance = axios.create({
  baseURL: API_BE_URL,
  headers: {
    'ngrok-skip-browser-warning': '69420'
  }
});

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
    const response = await axiosInstance.get<Product1[] | { data: Product1[] }>('Product/getAll');
    
    // Kiểm tra cấu trúc của response.data
    let productsData: Product1[];
    if (Array.isArray(response.data)) {
      productsData = response.data;
    } else if (response.data && Array.isArray(response.data.data)) {
      productsData = response.data.data;
    } else {
      console.error('Unexpected response structure:', response.data);
      return [];
    }

    const products = productsData.map((product) => {
      return {
        ...product,
        categoryName: CATEGORY_MAP[product.categoryId],
      };
    });
    console.log(products);
    return products;
  } catch (error) {
    console.error('Error fetching products', error);
    throw error;
  }
};

// Cập nhật các hàm khác để sử dụng axiosInstance
export const getProductDetail = async (id: string): Promise<Product1 | null> => {
  try {
    const response = await axiosInstance.get<Product1>(`Product/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    return null;
  }
};

export const deleteProduct = async (id: string): Promise<Product1 | null> => {
  try {
    const response = await axiosInstance.delete<Product1>(`Product/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting product with id ${id}:`, error);
    return null;
  }
};

export const updateProduct = async (id: string, updatedProduct: Product1): Promise<Product1 | null> => {
  try {
    const response = await axiosInstance.put<Product1>(`Product/${id}`, updatedProduct);
    return response.data;
  } catch (error) {
    console.error(`Error updating product with id ${id}:`, error);
    return null;
  }
};
