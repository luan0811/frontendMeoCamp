import axios from 'axios';

const API_BE_URL = import.meta.env.VITE_API_BE_URL;

// Tạo instance Axios với cấu hình mặc định
const axiosInstance = axios.create({
  baseURL: API_BE_URL,
  headers: {
    'ngrok-skip-browser-warning': '69420'
  }
});

interface CheckoutRequest {
  customerId: number;
  paymentMethod: string;
  amount: number;
  deliveryAddress: string;
}

export interface OrderResponse {
  id: number;
  customerId: number;
  orderDate: string;
  totalAmount: number;
  orderStatus: string;
  createdAt: string;
  updatedAt: string;
  deliveryAddress: string;
}

export const checkout = async (checkoutData: CheckoutRequest): Promise<OrderResponse> => {
  try {
    const response = await axiosInstance.post<OrderResponse>('api/Orders/checkout', checkoutData);
    return response.data;
  } catch (error) {
    console.error('Error during checkout:', error);
    throw error;
  }
};

export const getAllOrders = async (): Promise<OrderResponse[]> => {
  try {
    const response = await axiosInstance.get<OrderResponse[]>('api/Orders');
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

export const updateOrderStatus = async (orderId: number, newStatus: string): Promise<OrderResponse> => {
  try {
    // Đầu tiên, lấy thông tin hiện tại của đơn hàng
    const currentOrder = await axiosInstance.get<OrderResponse>(`api/Orders/${orderId}`);
    
    // Sau đó, cập nhật trạng thái mới
    const response = await axiosInstance.put<OrderResponse>(`api/Orders/${orderId}`, {
      orderStatus: newStatus,
      deliveryAddress: currentOrder.data.deliveryAddress,
      updatedAt: new Date().toISOString()
    });
    
    return response.data;
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
};
