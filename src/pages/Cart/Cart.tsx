import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Typography, Tag, message } from 'antd';
import { getCartItems, CartItem } from '../../services/CartServices';

const { Title } = Typography;

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartItems = async () => {
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
        message.error('Không có sản phẩm trong giỏ hàng');
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

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
      render: (quantity: number) => quantity,
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
        <Button type="primary" size="large">Thanh toán</Button>
      </div>
    </div>
  );
};

export default Cart;
