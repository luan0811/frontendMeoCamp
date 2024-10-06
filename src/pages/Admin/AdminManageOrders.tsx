import React, { useState, useEffect } from 'react';
import { Table, Tag, message, Button, Space } from 'antd';
import { getAllOrders, OrderResponse, updateOrderStatus } from '../../services/OrderServices';

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

    const handleStatusUpdate = async (orderId: number, newStatus: string) => {
        try {
            await updateOrderStatus(orderId, newStatus);
            message.success(`Đã cập nhật trạng thái đơn hàng thành ${newStatus}`);
            fetchOrders(); // Refresh the orders list
        } catch (error) {
            console.error('Error updating order status:', error);
            message.error('Không thể cập nhật trạng thái đơn hàng');
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
                <Tag color={status === 'Pending' ? 'gold' : status === 'Approved' ? 'green' : status === 'Rejected' ? 'red' : 'blue'}>
                    {status}
                </Tag>
            ),
        },
        {
            title: 'Duyệt bài',
            key: 'action',
            render: (_: any, record: OrderResponse) => (
                <Space>
                    {record.orderStatus === 'Pending' && (
                        <>
                            <Button type="primary" size="small" onClick={() => handleStatusUpdate(record.id, 'Approved')}>
                                Duyệt
                            </Button>
                            <Button danger size="small" onClick={() => handleStatusUpdate(record.id, 'Rejected')}>
                                Từ chối
                            </Button>
                        </>
                    )}
                    {record.orderStatus !== 'Pending' && (
                        <span>Đã {record.orderStatus === 'Approved' ? 'duyệt' : 'từ chối'}</span>
                    )}
                </Space>
            ),
        },
    ];

    return (
        <div style={{ padding: '70px' }}>
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
