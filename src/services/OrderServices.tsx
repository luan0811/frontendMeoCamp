import axios from 'axios';
import { getAllCustomer } from './AuthServices';
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

interface CustomerOrder extends OrderResponse {
  username: string;
  phoneNumber: string;
  email: string;
}

export const getOrdersWithCustomerInfo = async (): Promise<CustomerOrder[]> => {
  try {
    // Fetch both orders and customers in parallel
    const [orders, customers] = await Promise.all([
      getAllOrders(),
      getAllCustomer()
    ]);

    // Map orders to include customer username
    const ordersWithCustomers = orders.map(order => {
      const customer = customers.find((c: any) => c.id === order.customerId);
      return {
        ...order,
        username: customer?.username || 'Unknown User',
        phoneNumber: customer?.phoneNumber || 'N/A',
        email: customer?.email || 'N/A'
      };
    });

    return ordersWithCustomers;
  } catch (error) {
    console.error('Error fetching orders with customer info:', error);
    throw error;
  }
};

export const getOrderById = async (orderId: number): Promise<OrderResponse> => {
  try {
    const response = await axiosInstance.get<OrderResponse>(`api/Orders/${orderId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching order by ID:', error);
    throw error;
  }
};

export const getOrderWithCustomerInfo = async (orderId: number): Promise<CustomerOrder> => {
  try {
    const [order, customers] = await Promise.all([
      getOrderById(orderId),
      getAllCustomer()
    ]);

    const customer = customers.find((c: any) => c.id === order.customerId);
    
    return {
      ...order,
      username: customer?.username || 'Unknown User',
      phoneNumber: customer?.phoneNumber || 'N/A',
      email: customer?.email || 'N/A'
    };
  } catch (error) {
    console.error('Error fetching order with customer info:', error);
    throw error;
  }
};