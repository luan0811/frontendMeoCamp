import { Button, Form, Input, Checkbox,  Row, Col, Typography } from 'antd';
import { Link } from 'react-router-dom';
import fire from "../../assets/img/fire3d.png";

const { Text } = Typography;
const Register = () => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
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
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { type: "email", message: "The input is not valid E-mail!" },
            { required: true, message: "Please input your email!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Xác nhận"
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Please confirm your password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error(
                    "The two passwords that you entered do not match!"
                  )
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        {/* <Form.Item
          label="Số điện thoại"
          name="phoneNumber"
          rules={[
            { required: true, message: "Please input your phone number!" },
            {
              pattern: /^(\+84|0)(3|5|7|8|9|1[2|6|8|9])+([0-9]{8})\b/,
              message: "Invalid phone number, must be a Vietnamese number!",
            },
          ]}
        >
          <Input />
        </Form.Item> */}

        <Form.Item
          name="agree"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
          rules={[
            {
              required: true,
              message: "Please agree to terms and conditions!",
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
