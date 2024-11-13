import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Descriptions, Tag, Button, Spin, message } from 'antd';
import { getOrderWithCustomerInfo } from '../../services/OrderServices';
import { fakeData } from '../../services/FakeData';

const OrderDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState<any>(null);

    useEffect(() => {
        fetchOrderDetail();
    }, [id]);

    const fetchOrderDetail = async () => {
        try {
            setLoading(true);
            const data = await getOrderWithCustomerInfo(Number(id));
            setOrder(data);
        } catch (error) {
            console.error('Error fetching order detail:', error);
            message.error('Không thể tải thông tin đơn hàng');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Spin size="large" />;
    if (!order) return <div>Không tìm thấy đơn hàng</div>;

    const product = fakeData.product.find(p => p.id === order.id);

    return (
        <div style={{ padding: '70px' }}>
            <Button onClick={() => navigate('/admin/manage-orders')} style={{ marginBottom: 16 }}>
                Quay lại
            </Button>
            
            <Card title="Chi tiết đơn hàng">
                <Descriptions bordered column={1}>
                    <Descriptions.Item label="Mã đơn hàng">{order.id}</Descriptions.Item>
                    <Descriptions.Item label="Khách hàng">{order.username}</Descriptions.Item>
                    <Descriptions.Item label="Email">{order.email}</Descriptions.Item>
                    <Descriptions.Item label="Số điện thoại">{order.phoneNumber}</Descriptions.Item>
                    <Descriptions.Item label="Địa chỉ giao hàng">{order.deliveryAddress}</Descriptions.Item>
                    <Descriptions.Item label="Ngày đặt hàng">
                        {new Date(order.orderDate).toLocaleString()}
                    </Descriptions.Item>
                    <Descriptions.Item label="Tổng tiền">
                        {order.totalAmount.toLocaleString()} VND
                    </Descriptions.Item>
                    <Descriptions.Item label="Trạng thái">
                        <Tag color={
                            order.orderStatus === 'Pending' ? 'gold' : 
                            order.orderStatus === 'Approved' ? 'green' : 
                            order.orderStatus === 'Delivered' ? 'blue' :
                            'red'
                        }>
                            {order.orderStatus}
                        </Tag>
                    </Descriptions.Item>
                    <Descriptions.Item label="Mã sản phẩm">{product?.subid.join(', ') || 'Không xác định'}</Descriptions.Item>
                    <Descriptions.Item label="Tên sản phẩm">{product?.name.join(', ') || 'Không xác định'}</Descriptions.Item>
                    <Descriptions.Item label="Giá từng sản phẩm">
                        {product?.price.map(price => price.toLocaleString('vi-VN') + ' VND').join(', ') || 'Không xác định'}
                    </Descriptions.Item>
                </Descriptions>
            </Card>
        </div>
    );
};

export default OrderDetail;
