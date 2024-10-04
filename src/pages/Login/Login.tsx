import React, { useState } from "react";
import { Button, Checkbox, Form, Input, Row, Col, Typography, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/img/logo_cam.png";
import { loginUser } from "../../services/AuthServices";

const { Text } = Typography;

interface LoginFormValues {
  username: string;
  password: string;
  remember?: boolean;
}

const Login: React.FC = () => {
  const [registerClicked, setRegisterClicked] = useState<boolean>(false);
  const navigate = useNavigate();

  const onFinish = async (values: LoginFormValues) => {
    try {
      const user = await loginUser(values);
      message.success("Đăng nhập thành công!");

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem('user', JSON.stringify(user));
      // Thêm dòng này để lưu userId riêng
      localStorage.setItem('userId', user.id.toString());
      navigate("/home");
    } catch (error) {
      message.error("Tên đăng nhập hoặc mật khẩu không đúng!");
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
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
          src={logo}
          alt="Logo"
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </Col>
      <Col xs={24} sm={24} md={12} lg={8} xl={6}>
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <h1>Đăng nhập</h1>
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
            label="Tên đăng nhập"
            name="username"
            rules={[
              {
                required: registerClicked,
                message: "Hãy nhập tên đăng nhập của bạn",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
              {
                required: registerClicked,
                message: "Hãy nhập mật khẩu của bạn",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>Nhớ mật khẩu</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => setRegisterClicked(true)}
              style={{
                backgroundColor: "black",
                borderColor: "black",
                color: "white",
                width: "100%",
              }}
            >
              Đăng nhập
            </Button>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Link to="/forgot-password">Quên mật khẩu?</Link>
          </Form.Item>
        </Form>
        <div style={{ textAlign: "center" }}>
          <Text>
            Bạn chưa có tài khoản ?{" "}
            <Link to="/register">Đăng ký tài khoản</Link>
          </Text>
          <br />
        </div>
      </Col>
    </Row>
  );
};

export default Login;
