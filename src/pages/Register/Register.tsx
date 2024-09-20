import { Button, Form, Input, Checkbox, Row, Col, Typography, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import fire from "../../assets/img/fire3d.png";
import { registerUser } from '../../services/AuthServices'; // Import the service

const { Text } = Typography;

const Register = () => {
  const navigate = useNavigate(); // Khai báo navigate để điều hướng

  const onFinish = async (values: any) => {
    try {
      const data = await registerUser(values); // Gọi service đăng ký
      message.success("Đăng ký thành công!"); // Hiển thị thông báo thành công
      navigate("/login"); // Điều hướng về trang đăng nhập
    } catch (error) {
      console.error('Registration Failed:', error);
      message.error("Đăng ký thất bại! Vui lòng thử lại."); // Hiển thị thông báo thất bại
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
      <Col
        xs={0}
        sm={0}
        md={12}
        lg={8}
        xl={6}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={fire}
          alt="Logo"
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </Col>
      <Col xs={24} sm={24} md={12} lg={8} xl={6}>
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <h1>Đăng ký tài khoản của bạn</h1>
        </div>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          style={{ maxWidth: 400, margin: "auto" }}
        >
          <Form.Item
            label="Họ và tên"
            name="fullname"
            rules={[{ required: true, message: "Hãy nhập họ và tên của bạn" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Tên đăng nhập"
            name="username"
            rules={[{ required: true, message: "Hãy nhập tên đăng nhập" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { type: "email", message: "Phải nhập đúng định dạng email" },
              { required: true, message: "Hãy nhập email của bạn" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Hãy nhập mật khẩu của bạn" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Xác nhận"
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Hãy nhập lại mật khẩu của bạn" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Hai mật khẩu bạn nhập không khớp!")
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="agree"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
            rules={[
              {
                required: true,
                message: "Hãy đồng ý với các điều khoản",
              },
            ]}
          >
            <Checkbox>
              Tôi đã đọc và đồng ý với <a href="/terms">các điều khoản</a>
            </Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                backgroundColor: "black",
                borderColor: "black",
                color: "white",
                width: "100%",
              }}
            >
              Đăng ký
            </Button>
          </Form.Item>
        </Form>
        <div style={{ textAlign: "center" }}>
          <Text>
            Bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link>
          </Text>
          <br />
        </div>
      </Col>
    </Row>
  );
};

export default Register;
