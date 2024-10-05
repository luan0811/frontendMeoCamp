import React, { useState, useEffect } from 'react';
import { Table, Tag, message } from 'antd';
import { getAllOrders, OrderResponse } from '../../services/OrderServices';

const AdminManageOrders: React.FC = () => {
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await getAllOrders();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
      message.error('Không thể tải danh sách đơn hàng');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Khách hàng ID',
      dataIndex: 'customerId',
      key: 'customerId',
    },
    {
      title: 'Ngày đặt hàng',
      dataIndex: 'orderDate',
      key: 'orderDate',
      render: (date: string) => new Date(date).toLocaleString(),
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (amount: number) => `${amount.toLocaleString()} VND`,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'orderStatus',
      key: 'orderStatus',
      render: (status: string) => (
        <Tag color={status === 'Pending' ? 'gold' : status === 'Completed' ? 'green' : 'blue'}>
          {status}
        </Tag>
      ),
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h1>Quản lý đơn hàng</h1>
      <Table
        columns={columns}
        dataSource={orders}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default AdminManageOrders;
