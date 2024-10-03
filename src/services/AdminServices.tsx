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
    status: boolean;
    images: string[];
    quantity: number;
    subcate: string;
  }) => {
    try {
      const response = await axios.post(`${API_BE_URL}Product/add-new-product`, productData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
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
