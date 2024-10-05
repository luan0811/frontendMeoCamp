import React, { useEffect, useState, useCallback } from 'react';
import { Table, Button, Space, Typography, Tag, message } from 'antd';
import { getCartItems, CartItem } from '../../services/CartServices';
import { checkout } from '../../services/OrderServices';

const { Title } = Typography;

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCartItems = useCallback(async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      message.error('Vui lòng đăng nhập để xem giỏ hàng');
      setLoading(false);
      return;
    }

    try {
      const items = await getCartItems(parseInt(userId));
      setCartItems(items);
    } catch (error) {
      console.error('Error fetching cart items:', error);
      message.error('Không thể tải giỏ hàng');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  const handleCheckout = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      message.error('Vui lòng đăng nhập để thanh toán');
      return;
    }

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    try {
      await checkout({
        customerId: parseInt(userId),
        paymentMethod: 'Cash', // Bạn có thể thay đổi phương thức thanh toán tùy ý
        amount: total
      });
      message.success('Thanh toán thành công!');
      // Sau khi thanh toán thành công, làm mới giỏ hàng
      fetchCartItems();
    } catch (error) {
      console.error('Error during checkout:', error);
      message.error('Có lỗi xảy ra trong quá trình thanh toán');
    }
  };

  const columns = [
    {
      title: 'Sản phẩm',
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `${price.toLocaleString()} VND`,
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Tổng',
      key: 'total',
      render: (record: CartItem) => `${(record.price * record.quantity).toLocaleString()} VND`,
    },
    {
      title: 'Trạng thái',
      key: 'status',
      render: (record: CartItem) => (
        <Tag color={record.rentalPrice ? 'blue' : 'green'}>
          {record.rentalPrice ? 'Thuê' : 'Mua'}
        </Tag>
      ),
    },
  ];

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div style={{ padding: '50px' }}>
      <Title level={2}>Giỏ hàng</Title>
      <Table columns={columns} dataSource={cartItems} pagination={false} loading={loading} />
      <div style={{ marginTop: '24px', textAlign: 'right' }}>
        <Space>
          <Title level={4}>Tổng cộng:</Title>
          <Title level={4}>{total.toLocaleString()} VND</Title>
        </Space>
      </div>
      <div style={{ marginTop: '24px', textAlign: 'right' }}>
        <Button type="primary" size="large" onClick={handleCheckout}>
          Thanh toán
        </Button>
      </div>
    </div>
  );
};

export default Cart;
