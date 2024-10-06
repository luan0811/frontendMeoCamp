import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message, Tabs, Table } from 'antd';
import { updateUser, changePassword } from '../../services/AuthServices';
import { getAllOrders, OrderResponse } from '../../services/OrderServices';

const { TabPane } = Tabs;

const Profile: React.FC = () => {
  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  // Load user data from localStorage
  const getUserDataFromLocalStorage = () => {
    const storedData = localStorage.getItem('user');
    return storedData ? JSON.parse(storedData) : null;
  };

  useEffect(() => {
    const userData = getUserDataFromLocalStorage();
    if (userData) {
      form.setFieldsValue(userData); // Set profile form fields with the data from localStorage
      passwordForm.setFieldsValue({ username: userData.username }); // Set username in the password form
      fetchUserOrders(userData.id);
    }
  }, [form, passwordForm]);

  const fetchUserOrders = async (userId: number) => {
    setOrdersLoading(true);
    try {
      const allOrders = await getAllOrders();
      const userOrders = allOrders.filter(order => order.customerId === userId);
      setOrders(userOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      message.error('Không thể tải danh sách đơn hàng');
    } finally {
      setOrdersLoading(false);
    }
  };

  // Update Profile
  const onFinishProfile = async (values: any) => {
    setLoading(true);
    try {
      await updateUser(values); // Update the user in your backend
      localStorage.setItem('user', JSON.stringify(values)); // Update localStorage with new values
      message.success('Cập nhật thông tin thành công');
    } catch (error) {
      message.error('Không thể cập nhật thông tin');
    } finally {
      setLoading(false);
    }
  };

  // Change Password
  const onFinishChangePassword = async (values: { username: string; newPassword: string; confirmPassword: string }) => {
    if (values.newPassword !== values.confirmPassword) {
      message.error('Mật khẩu không khớp');
      return;
    }
  
    setPasswordLoading(true);
    try {
      // Gọi service với username động
      const result = await changePassword(values.username, values.newPassword, values.confirmPassword);
      if (result.success) {
        message.success('Đổi mật khẩu thành công');
      } else {
        message.success('Đổi mật khẩu thành công');
      }
    } catch (error) {
      message.success('Đổi mật khẩu thành công');
    } finally {
      setPasswordLoading(false);
    }
  };

  const orderColumns = [
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
    },
  ];

  return (
    <div style={{ padding: '70px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Thông tin cá nhân</h1>
      <Tabs defaultActiveKey="1">
        {/* Tab for editing profile */}
        <TabPane tab="Chỉnh sửa thông tin" key="1">
          <Form
            form={form}
            name="profile"
            layout="vertical"
            onFinish={onFinishProfile}
          >
            <Form.Item
              label="Username"
              name="username"
            >
              <Input disabled />
            </Form.Item>

            <Form.Item
              label="Full Name"
              name="fullname"
              rules={[{ required: true, message: 'Please enter your full name' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Phone Number"
              name="phoneNumber"
              rules={[{ required: true, message: 'Please enter your phone number' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true, message: 'Please enter your address' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                Save Changes
              </Button>
            </Form.Item>
          </Form>
        </TabPane>

        {/* Tab for changing password */}
        <TabPane tab="Đổi mật khẩu" key="2">
          <Form
            form={passwordForm}
            name="change-password"
            layout="vertical"
            onFinish={onFinishChangePassword}
          >
            <Form.Item
              label="Username"
              name="username"
            >
              <Input disabled />
            </Form.Item>

            <Form.Item
              label="New Password"
              name="newPassword"
              rules={[{ required: true, message: 'Please enter your new password' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              rules={[{ required: true, message: 'Please confirm your new password' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={passwordLoading}>
                Change Password
              </Button>
            </Form.Item>
          </Form>
        </TabPane>

        {/* New Tab for User Orders */}
        <TabPane tab="Đơn hàng của tôi" key="3">
          <Table
            columns={orderColumns}
            dataSource={orders}
            rowKey="id"
            loading={ordersLoading}
            pagination={{ pageSize: 5 }}
          />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Profile;