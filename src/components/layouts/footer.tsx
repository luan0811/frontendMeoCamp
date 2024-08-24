import { Layout, Space, Row, Col } from 'antd';
import { FacebookOutlined, InstagramOutlined, TwitterOutlined, TikTokOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import logo from '../../assets/img/logo_cam.png';
import text from '../../assets/img/TEXT-01 4.png'

const { Footer: AntFooter } = Layout;

const Footer = () => {
  return (
    <AntFooter style={{ background: '#1a1a1a', padding: '40px 20px', color: '#fff' }}>
      <Row gutter={[16, 32]} justify="space-between">
        <Col xs={24} md={8} style={{ textAlign: 'center' }}>
          <img src={logo} alt="Logo" style={{ height: 50, marginBottom: 16 }} />
          <h3 style={{ color: '#fff', marginBottom: 16 }}><img src={text} alt='logo' style={{ height: 50, marginBottom: 16 }}></img></h3>
          <Space direction="vertical" size="middle">

          </Space>
        </Col>
        <Col xs={24} md={8} style={{ textAlign: 'center' }}>
          <h3 style={{ color: '#fff', marginBottom: 16 }}>Kết nối với chúng tôi</h3>
          <Space size="large">
            <Link to="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <FacebookOutlined style={{ fontSize: '24px', color: '#fff' }} />
            </Link>
            <Link to="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <InstagramOutlined style={{ fontSize: '24px', color: '#fff' }} />
            </Link>
            <Link to="https://www.tiktok.com" target="_blank" rel="noopener noreferrer">
              <TikTokOutlined style={{ fontSize: '24px', color: '#fff' }} />
            </Link>
            <Link to="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <TwitterOutlined style={{ fontSize: '24px', color: '#fff' }} />
            </Link>
          </Space>
        </Col>
        <Col xs={24} md={8} style={{ textAlign: 'center' }}>
          <h3 style={{ color: '#fff', marginBottom: 16 }}>Chính sách</h3>
          <Space direction="vertical" size="middle">
            <Link to="/blog" style={{ color: '#fff' }}>Blog</Link>
            <Link to="/privacy-policy" style={{ color: '#fff' }}>Chính sách bảo mật</Link>
            <Link to="/warranty" style={{ color: '#fff' }}>Chính sách bảo hành/trả hàng</Link>
            <Link to="/shopping-guide" style={{ color: '#fff' }}>Hướng dẫn mua sắm</Link>
            <Link to="/general-policy" style={{ color: '#fff' }}>Chính sách chung</Link>
            <Link to="/delivery-policy" style={{ color: '#fff' }}>Chính sách giao hàng</Link>
          </Space>
        </Col>
      </Row>
    </AntFooter>
  );
};

export default Footer;
