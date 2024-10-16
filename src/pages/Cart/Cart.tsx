import React, { useEffect, useState, useCallback } from 'react';
import { Table, Button, Space, Typography, Tag, message, Popconfirm, Modal, Radio, Image, Input } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { getCartItems, CartItem, removeFromCart } from '../../services/CartServices';
import { checkout } from '../../services/OrderServices';
import momo from '../../assets/img/momoCuaLuan.png'
const { Title } = Typography;

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDeliveryModalVisible, setIsDeliveryModalVisible] = useState(false);
  const [isPaymentModalVisible, setIsPaymentModalVisible] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isMomoModalVisible, setIsMomoModalVisible] = useState(false);
  const [customerAddress, setCustomerAddress] = useState('');

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

  const showDeliveryModal = () => {
    setIsDeliveryModalVisible(true);
  };

  const handleDeliveryOk = () => {
    if (deliveryMethod) {
      if (deliveryMethod === 'Home Delivery' && !customerAddress.trim()) {
        message.error('Vui lòng nhập địa chỉ giao hàng');
      } else {
        setIsDeliveryModalVisible(false);
        setIsPaymentModalVisible(true);
      }
    } else {
      message.error('Vui lòng chọn phương thức nhận hàng');
    }
  };

  const handlePaymentOk = () => {
    if (paymentMethod === 'Cash') {
      handleCheckout();
    } else if (paymentMethod === 'E-Wallet') {
      setIsPaymentModalVisible(false);
      setIsMomoModalVisible(true);
    }
  };

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
        paymentMethod: paymentMethod,
        amount: total,
        deliveryAddress: deliveryMethod === 'Home Delivery' ? customerAddress : deliveryMethod,
      });
      message.success('Thanh toán thành công!');
      fetchCartItems();
      setIsPaymentModalVisible(false);
      setIsMomoModalVisible(false);
    } catch (error) {
      console.error('Error during checkout:', error);
      message.error('Có lỗi xảy ra trong quá trình thanh toán');
    }
  };

  const handleRemoveItem = async (cartItemId: number) => {
    try {
      await removeFromCart(cartItemId);
      message.success('Đã xóa sản phẩm khỏi giỏ hàng');
      fetchCartItems(); // Cập nhật lại giỏ hàng sau khi xóa
    } catch (error) {
      console.error('Error removing item from cart:', error);
      message.error('Không thể xóa sản phẩm khỏi giỏ hàng');
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
          {record.rentalPrice ? 'Mua' : 'Thuê'}
        </Tag>
      ),
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_text: string, record: CartItem) => (
        <Popconfirm
          title="Bạn có chắc chắn muốn xóa sản phẩm này?"
          onConfirm={() => handleRemoveItem(record.id)}
          okText="Có"
          cancelText="Không"
        >
          <Button type="link" danger icon={<DeleteOutlined />}>
            Xóa
          </Button>
        </Popconfirm>
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
        <Button type="primary" size="large" onClick={showDeliveryModal}>
          Thanh toán
        </Button>
      </div>

      <Modal
        title="Chọn phương thức nhận hàng"
        visible={isDeliveryModalVisible}
        onOk={handleDeliveryOk}
        onCancel={() => setIsDeliveryModalVisible(false)}
      >
        <Radio.Group onChange={(e) => setDeliveryMethod(e.target.value)} value={deliveryMethod}>
          <Space direction="vertical">
            <Radio value="FPT University">Nhận tại đại học FPT</Radio>
            <Radio value="Student Cultural House">Nhận tại nhà văn hóa sinh viên</Radio>
            <Radio value="Home Delivery">Giao hàng tận nhà</Radio>
          </Space>
        </Radio.Group>
        {deliveryMethod === 'Home Delivery' && (
          <Input
            style={{ marginTop: '10px' }}
            placeholder="Nhập địa chỉ giao hàng"
            value={customerAddress}
            onChange={(e) => setCustomerAddress(e.target.value)}
          />
        )}
      </Modal>

      <Modal
        title="Chọn phương thức thanh toán"
        visible={isPaymentModalVisible}
        onOk={handlePaymentOk}
        onCancel={() => setIsPaymentModalVisible(false)}
      >
        <Radio.Group onChange={(e) => setPaymentMethod(e.target.value)} value={paymentMethod}>
          <Space direction="vertical">
            <Radio value="Cash">Tiền mặt</Radio>
            <Radio value="E-Wallet">Ví điện tử/ ngân hàng</Radio>
          </Space>
        </Radio.Group>
      </Modal>

      <Modal
        title="Quét mã QR để thanh toán"
        visible={isMomoModalVisible}
        onOk={handleCheckout}
        onCancel={() => setIsMomoModalVisible(false)}
      >
        <Image src={momo} alt="Momo QR Code" />
      </Modal>
    </div>
  );
};

export default Cart;
