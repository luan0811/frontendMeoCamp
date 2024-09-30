import axios from "axios";

const API_BE_URL = import.meta.env.VITE_API_BE_URL;

const AdminServices = {
  addNewProduct: async (productData: {
    productName: string;
    description: string;
    price: number;
    rentalPrice: number;
    isRentable: boolean;
    categoryId: number;
    createdAt: string;
    updatedAt: string;
    status: boolean;
    image: string; // Lưu ý: nếu hình ảnh là nhiều, bạn có thể dùng array `string[]`
    quantity: number;
    rate: number;
  }) => {
    try {
      const response = await axios.post(`${API_BE_URL}Product/add-new-product`, productData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error adding new product:", error);
      throw error;
    }
  },
};

export default AdminServices;
