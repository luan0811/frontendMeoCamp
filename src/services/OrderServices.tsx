import axios from 'axios';

const API_BE_URL = import.meta.env.VITE_API_BE_URL;

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
    const response = await axios.post<OrderResponse>(`${API_BE_URL}api/Orders/checkout`, checkoutData);
    return response.data;
  } catch (error) {
    console.error('Error during checkout:', error);
    throw error;
  }
};

export const getAllOrders = async (): Promise<OrderResponse[]> => {
  try {
    const response = await axios.get<OrderResponse[]>(`${API_BE_URL}api/Orders`);
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

export const updateOrderStatus = async (orderId: number, newStatus: string): Promise<OrderResponse> => {
  try {
    // Đầu tiên, lấy thông tin hiện tại của đơn hàng
    const currentOrder = await axios.get<OrderResponse>(`${API_BE_URL}api/Orders/${orderId}`);
    
    // Sau đó, cập nhật trạng thái mới
    const response = await axios.put<OrderResponse>(`${API_BE_URL}api/Orders/${orderId}`, {
      orderStatus: newStatus,
      deliveryAddress: currentOrder.data.deliveryAddress, // Giữ nguyên địa chỉ giao hàng hiện tại
      updatedAt: new Date().toISOString()
    });
    
    return response.data;
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
};

