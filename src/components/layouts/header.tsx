import { useState, useEffect } from 'react';
import { Layout, Menu, Badge, Dropdown, Menu as AntMenu } from 'antd';
import { Link } from 'react-router-dom';
import { ShoppingCartOutlined } from '@ant-design/icons';
import logo from '../../assets/img/logo_cam.png';
import avatar from '../../assets/img/avt.png';

const { Header: AntHeader } = Layout;

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const storedUsername = localStorage.getItem('username');
    
    setIsLoggedIn(loggedIn);
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleMenuClick = (e: any) => {
    if (e.key === 'logout') {
      localStorage.clear();
      window.location.reload();
    }
  };

  const menu = (
    <AntMenu onClick={handleMenuClick}>
      <AntMenu.Item key="account">Thông tin tài khoản</AntMenu.Item>
      <AntMenu.Item key="logout">Đăng xuất</AntMenu.Item>
    </AntMenu>
  );

  return (
    <AntHeader style={{
      background: '#fff',
      padding: '0 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'fixed', 
      top: 0, 
      width: '100%', 
      zIndex: 1000, 
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
        </Menu>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {isLoggedIn && (
          <Link to="/cart" style={{ marginRight: '16px' }}>
            <Badge count={5}>
              <ShoppingCartOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
            </Badge>
          </Link>
        )}
        {isLoggedIn ? (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '16px' }}>Xin chào, {username}</span>
            <Dropdown overlay={menu} trigger={['click']}>
              <img src={avatar} alt="User Avatar" style={{ width: 32, height: 32, borderRadius: '50%', cursor: 'pointer' }} />
            </Dropdown>
          </div>
        ) : (
          <AntMenu mode="horizontal">
            <AntMenu.Item key="6">
              <Link to="/login">Đăng nhập</Link>
            </AntMenu.Item>
            <AntMenu.Item key="7">
              <Link to="/register">Đăng ký</Link>
            </AntMenu.Item>
          </AntMenu>
        )}
      </div>
    </AntHeader>
  );
};

export default Header;
