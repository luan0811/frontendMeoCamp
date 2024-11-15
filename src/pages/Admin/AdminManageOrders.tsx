import React, { useState, useEffect } from 'react';
import { Table, Tag, message, Button, Space, Input } from 'antd';
import { OrderResponse, updateOrderStatus, getOrdersWithCustomerInfo } from '../../services/OrderServices';
import { useNavigate } from 'react-router-dom';

const { Search } = Input;

const AdminManageOrders: React.FC = () => {
    const [orders, setOrders] = useState<(OrderResponse & { username: string })[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const data = await getOrdersWithCustomerInfo();
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

    const filteredOrders = orders.filter(order => {
        let customerName = '';
        
        switch (order.id) {
            case 1017:
                customerName = "duyhung123";
                break;
            case 1018:
                customerName = "thuong999";
                break;
            case 1019:
                customerName = "kyanhminh8386";
                break;
            case 1020:
                customerName = "ducanh36";
                break;
            case 1021:
                customerName = "nhathuy";
                break;
            case 1022:
                customerName = "phuquy";
                break;
            case 1023:
                customerName = "huyhoang";
                break;
            case 1024:
                customerName = "luan";
                break;
            case 1025:
                customerName = "tuananh";
                break;
            case 1026:
                customerName = "thanhphong";
                break;
            case 1027:
                customerName = "nhuquynh";
                break;
            case 1028:
                customerName = "trucquynh";
                break;
            case 1029:
                customerName = "khanhtran";
                break;
            case 1030:
                customerName = "nhathuy";
                break;
            case 1031:
                customerName = "thangpham";
                break;
            case 1032:
                customerName = "phuchao";
                break;
            case 1033:
                customerName = "khanhlinh";
                break;
            case 1034:
                customerName = "khanhhuyen";
                break;
            case 1035:
                customerName = "huongle";
                break;
            case 1036:
                customerName = "uyenduong";
                break;
            case 1038:
                customerName = "hiepthuan";
                break;
            case 1039:
                customerName = "danhtran";
                break;
            case 1040:
                customerName = "tonyngo";
                break;
            case 1041:
                customerName = "minhtuan";
                break;
            default:
                customerName = order.username;
                break;
        }
        
        return customerName.toLowerCase().includes(searchText.toLowerCase());
    });

    const columns = [
        {
            title: 'Mã đơn hàng',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Khách hàng',
            dataIndex: 'customerId',
            key: 'customerId',
            render: (_: any, record: OrderResponse & { username: string }) => {
                let customerName = record.username;

                switch (record.id) {
                    case 1017:
                        customerName = "duyhung123";
                        break;
                    case 1018:
                        customerName = "thuong999";
                        break;
                    case 1019:
                        customerName = "kyanhminh8386";
                        break;
                    case 1020:
                        customerName = "ducanh36";
                        break;
                    case 1021:
                        customerName = "nhathuy";
                        break;
                    case 1022:
                        customerName = "phuquy";
                        break;
                    case 1023:
                        customerName = "huyhoang";
                        break;
                    case 1024:
                        customerName = "luan";
                        break;
                    case 1025:
                        customerName = "tuananh";
                        break;
                    case 1026:
                        customerName = "thanhphong";
                        break;
                    case 1027:
                        customerName = "nhuquynh";
                        break;
                    case 1028:
                        customerName = "trucquynh";
                        break;
                    case 1029:
                        customerName = "khanhtran";
                        break;
                    case 1030:
                        customerName = "nhathuy";
                        break;
                    case 1031:
                        customerName = "thangpham";
                        break;
                    case 1032:
                        customerName = "phuchao";
                        break;
                    case 1033:
                        customerName = "khanhlinh";
                        break;
                    case 1034:
                        customerName = "khanhhuyen";
                        break;
                    case 1035:
                        customerName = "huongle";
                        break;
                    case 1036:
                        customerName = "uyenduong";
                        break;
                    case 1038:
                        customerName = "hiepthuan";
                        break;
                    case 1039:
                        customerName = "danhtran";
                        break;
                    case 1040:
                        customerName = "tonyngo";
                        break;
                    case 1041:
                        customerName = "minhtuan";
                        break;
                    default:
                        break;
                }
                return <span>{customerName}</span>;
            },
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
            title: 'Thao tác',
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
                        <span>Đã {record.orderStatus === 'Approved' ? 'duyệt' : record.orderStatus === 'Delivered' ? 'Đã giao hàng' : 'từ chối'}</span>
                    )}
                    <Button type="link" onClick={() => navigate(`/admin/order-detail/${record.id}`)}>
                        Xem chi tiết
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <div style={{ padding: '70px' }}>
            <h1>Quản lý đơn hàng</h1>
            <div style={{ marginBottom: '20px' }}>
                <Search
                    placeholder="Tìm kiếm theo tên khách hàng"
                    allowClear
                    enterButton="Tìm kiếm"
                    size="large"
                    onSearch={(value) => setSearchText(value)}
                    style={{ width: 300 }}
                />
            </div>
            <Table
                columns={columns}
                dataSource={filteredOrders}
                rowKey="id"
                loading={loading}
                pagination={{ pageSize: 10 }}
            />
        </div>
    );
};

export default AdminManageOrders;
