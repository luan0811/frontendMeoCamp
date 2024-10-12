import axios from "axios";

const API_BE_URL = import.meta.env.VITE_API_BE_URL;

// Tạo instance Axios với cấu hình mặc định
const axiosInstance = axios.create({
  baseURL: API_BE_URL,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'ngrok-skip-browser-warning': '69420'
  }
});

interface ProductData {
  productName: string;
  description: string;
  price: number;
  rentalPrice: number;
  isRentable: boolean;
  categoryId: number;
  status: boolean;
  images: string[];
  quantity: number;
  subcate: string;
}

const AdminServices = {
  addNewProduct: async (productData: ProductData) => {
    try {
      const response = await axiosInstance.post('Product/add-new-product', productData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error adding new product:", error.response?.data);
      } else {
        console.error("Error adding new product:", error);
      }
      throw error;
    }
  },
};

export default AdminServices;
