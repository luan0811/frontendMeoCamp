import React from 'react';
import { Table, Button, InputNumber, Space, Typography, Tag } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const { Title } = Typography;

interface CartItem {
  key: string;
  name: string;
  price: number;
  quantity: number;
  status: 'buy' | 'rent';
  rentalPeriod?: { start: string; end: string };
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = React.useState<CartItem[]>([
    { key: '1', name: 'Product 1', price: 100000, quantity: 2, status: 'buy' },
    { key: '2', name: 'Product 2', price: 150000, quantity: 1, status: 'rent', rentalPeriod: { start: '01/05', end: '15/05' } },
  ]);

  const columns = [
    {
      title: 'Sản phẩm',
      dataIndex: 'name',
      key: 'name',
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
      render: (_: any, record: CartItem) => (
        <InputNumber
          min={1}
          value={record.quantity}
          onChange={(value) => updateQuantity(record.key, value)}
        />
      ),
    },
    {
      title: 'Tổng',
      key: 'total',
      render: (record: CartItem) => `${(record.price * record.quantity).toLocaleString()} VND`,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: 'buy' | 'rent') => (
        <Tag color={status === 'buy' ? 'green' : 'blue'}>
          {status === 'buy' ? 'Mua' : 'Thuê'}
        </Tag>
      ),
    },
    {
      title: 'Thời hạn thuê',
      key: 'rentalPeriod',
      render: (record: CartItem) => 
        record.status === 'rent' && record.rentalPeriod
          ? `${record.rentalPeriod.start} - ${record.rentalPeriod.end}`
          : '-',
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (record: CartItem) => (
        <Button type="text" danger icon={<DeleteOutlined />} onClick={() => removeItem(record.key)} />
      ),
    },
  ];

  const updateQuantity = (key: string, quantity: number | null) => {
    if (quantity === null) return;
    setCartItems(cartItems.map(item => 
      item.key === key ? { ...item, quantity } : item
    ));
  };

  const removeItem = (key: string) => {
    setCartItems(cartItems.filter(item => item.key !== key));
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div style={{ padding: '50px' }}>
      <Title level={2}>Giỏ hàng</Title>
      <Table columns={columns} dataSource={cartItems} pagination={false} />
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
