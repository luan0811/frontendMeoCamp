import { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import logo from '../../assets/img/logo_cam.png';
import avatar from '../../assets/img/avt.png';

const { Header: AntHeader } = Layout;

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  return (
    <AntHeader style={{
      background: '#fff',
      padding: '0 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'fixed', // Đặt vị trí cố định
      top: 0, // Đặt cách mép trên cùng
      width: '100%', // Chiếm toàn bộ chiều rộng
      zIndex: 1000, // Đảm bảo header nằm trên các phần tử khác
    }}>
      <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
        <Link to="/">
          <img src={logo} alt="Logo" style={{ height: 50, marginRight: 20, marginBottom: -20 }} />
        </Link>
        <Menu mode="horizontal" defaultSelectedKeys={['1']} style={{ flexGrow: 1 }}>
          <Menu.Item key="1">
            <Link to="/">Trang chủ</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/about">Về chúng tôi</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/products">Sản phẩm</Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/contact">Liên lạc</Link>
          </Menu.Item>
          <Menu.Item key="5">
            <Link to="/blogs">Blogs</Link>
          </Menu.Item>
          {/* Add more Menu.Item as needed */}
        </Menu>
      </div>
      <div style={{ display: 'flex' }}>
        {isLoggedIn ? (
          <img src={avatar} alt="User Avatar" style={{ width: 32, height: 32, borderRadius: '50%' }} />
        ) : (
          <Menu mode="horizontal">
            <Menu.Item key="6">
              <Link to="/login">Đăng nhập</Link>
            </Menu.Item>
            <Menu.Item key="7">
              <Link to="/register">Đăng ký</Link>
            </Menu.Item>
          </Menu>
        )}
      </div>
    </AntHeader>
  );
};

export default Header;
