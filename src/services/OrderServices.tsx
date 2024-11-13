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

export const getMonthlyRevenue = (orders: OrderResponse[]) => {
    const monthlyData = Array(31).fill(0); // Mảng 31 ngày, giá trị ban đầu = 0
    
    orders.forEach(order => {
        const date = new Date(order.orderDate);
        const day = date.getDate();
        monthlyData[day - 1] += order.totalAmount;
    });
    
    return monthlyData;
};

export const getTotalRevenue = (orders: OrderResponse[]) => {
    return orders.reduce((total, order) => total + order.totalAmount, 0);
};

export const getOrdersByStatus = (orders: OrderResponse[]) => {
    return {
        pending: orders.filter(order => order.orderStatus === 'Pending').length,
        approved: orders.filter(order => order.orderStatus === 'Approved').length,
        rejected: orders.filter(order => order.orderStatus === 'Rejected').length,
        delivered: orders.filter(order => order.orderStatus === 'Delivered').length
    };
};

export const getRevenueByMonths = (orders: OrderResponse[], year: number) => {
    // Tạo mảng 12 tháng, mỗi tháng có 31 ngày
    const monthlyData = Array(12).fill(null).map(() => ({
        month: 0,
        data: Array(31).fill(0)
    }));

    orders.forEach(order => {
        const date = new Date(order.orderDate);
        if (date.getFullYear() === year) {
            const month = date.getMonth();
            const day = date.getDate();
            monthlyData[month].month = month + 1;
            monthlyData[month].data[day - 1] += order.totalAmount;
        }
    });

    return monthlyData;
};