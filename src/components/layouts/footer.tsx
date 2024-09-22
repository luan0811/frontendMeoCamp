import { Layout, Space, Row, Col } from "antd";
import {
  FacebookOutlined,
  InstagramOutlined,
  TikTokOutlined,
  XOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

import logo from "../../assets/img/logo_cam.png";
import text from "../../assets/img/TEXT-01 4.png";

const { Footer: AntFooter } = Layout;

const Footer = () => {
  return (
    <AntFooter style={{ background: "#1a1a1a", color: "#fff" }}>
      <Row gutter={[16, 32]} justify="space-between" align="middle">
        <Col xs={24} md={8} style={{ textAlign: "center" }}>
          <img src={logo} alt="Logo" style={{ height: 50, marginBottom: 16 }} />
          <h3 style={{ color: "#fff", marginBottom: 16 }}>
            <img
              src={text}
              alt="logo"
              style={{ height: 50, marginBottom: 16 }}
            />
          </h3>
          <p style={{ color: "#aaa" }}>
            Địa chỉ: Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ
            Đức, Hồ Chí Minh
          </p>
          <p style={{ color: "#aaa", textAlign: 'left' }}>
            <PhoneOutlined></PhoneOutlined>Số điện thoại: 0706434469 - Nguyễn Trần Thanh Trúc (Project
            Manager)
          </p>
          <p style={{ color: "#aaa", textAlign:'left' }}><MailOutlined></MailOutlined>Email: meocamp@gmail.com</p>
        </Col>
        <Col xs={24} md={8} style={{ textAlign: "center" }}>
          <h3 style={{ color: "#fff", marginBottom: 16 }}>
            Các trang mạng xã hội
          </h3>
          <Space size="large">
            <Link
              to="https://web.facebook.com/profile.php?id=61565637227303"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FacebookOutlined style={{ fontSize: "24px", color: "#fff" }} />
            </Link>
            <Link
              to="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramOutlined style={{ fontSize: "24px", color: "#fff" }} />
            </Link>
            <Link
              to="https://www.tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <TikTokOutlined style={{ fontSize: "24px", color: "#fff" }} />
            </Link>
            <Link
              to="https://www.x.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <XOutlined style={{ fontSize: "24px", color: "#fff" }} />
            </Link>
          </Space>
        </Col>
        <Col xs={24} md={8} style={{ textAlign: "center" }}>
          <h3 style={{ color: "#fff", marginBottom: 16 }}>Chính sách</h3>
          <Space direction="vertical" size="middle">
            <Link to="/blog" style={{ color: "#fff" }}>
              Blog
            </Link>
            <Link to="/privacy-policy" style={{ color: "#fff" }}>
              Chính sách bảo mật
            </Link>
            <Link to="/warranty" style={{ color: "#fff" }}>
              Chính sách bảo hành/trả hàng
            </Link>
            <Link to="/shopping-guide" style={{ color: "#fff" }}>
              Hướng dẫn mua sắm
            </Link>
            <Link to="/general-policy" style={{ color: "#fff" }}>
              Chính sách chung
            </Link>
            <Link to="/delivery-policy" style={{ color: "#fff" }}>
              Chính sách giao hàng
            </Link>
          </Space>
        </Col>
      </Row>
      <Row justify="center" style={{ marginTop: 32 }}>
        <p style={{ color: "#666", textAlign: "center" }}>
          © 2024 Meo Camp. All rights reserved.
        </p>
      </Row>
    </AntFooter>
  );
};

export default Footer;
