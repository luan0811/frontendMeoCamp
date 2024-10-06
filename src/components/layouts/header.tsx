import { useState, useEffect } from 'react';
import { Layout, Menu, Badge, Dropdown, Menu as AntMenu } from 'antd';
import { Link } from 'react-router-dom';
import { ShoppingCartOutlined } from '@ant-design/icons';
import logo from '../../assets/img/logo_cam.png';
import avatar from '../../assets/img/avt.png';
import { getCartItems } from '../../services/CartServices';

const { Header: AntHeader } = Layout;

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const storedUser = localStorage.getItem('user');

    try {
      const user = storedUser ? JSON.parse(storedUser) : null;
      setIsLoggedIn(loggedIn);
      if (user) {
        setUsername(user.username);
        setRole(user.role); // Get the user's role
      }
    } catch (error) {
      console.error('Error parsing user data:', error);
      localStorage.removeItem('user');
    }

    // Add this new effect to fetch cart items
    const fetchCartItemCount = async () => {
      if (loggedIn && role !== 'Admin') {
        try {
          const userId = localStorage.getItem('userId');
          if (userId) {
            const items = await getCartItems(parseInt(userId));
            setCartItemCount(items.length);
          }
        } catch (error) {
          console.error('Error fetching cart items:', error);
        }
      }
    };

    fetchCartItemCount();
  }, []);

  const handleMenuClick = (e: any) => {
    if (e.key === 'logout') {
      localStorage.clear();
      window.location.reload();
    }
  };

  const menu = (
    <AntMenu onClick={handleMenuClick}>
      <AntMenu.Item key="profile">
        <Link to="/profile">Thông tin tài khoản</Link>
      </AntMenu.Item>
      <AntMenu.Item key="logout">Đăng xuất</AntMenu.Item>
    </AntMenu>
  );

  const adminMenu = (
    <Menu mode="horizontal" defaultSelectedKeys={['1']} style={{ flexGrow: 1 }}>
      <Menu.Item key="1">
        <Link to="/admin/add-product">Đăng sản phẩm</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/admin/manage-products">Quản lý sản phẩm</Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to="/admin/manage-users">Quản lý người dùng</Link>
      </Menu.Item>
      <Menu.Item key="4">
        <Link to="/admin/manage-blogs">Quản lý bài viết</Link>
      </Menu.Item>
      <Menu.Item key="5">
        <Link to="/admin/manage-orders">Quản lý đơn đặt hàng</Link>
      </Menu.Item>
    </Menu>
  );

  const userMenu = (
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
        {/* Render adminMenu if the user is an admin, otherwise render userMenu */}
        {role === 'Admin' ? adminMenu : userMenu}
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {isLoggedIn && role !== 'Admin' && (
          <Link to="/cart" style={{ marginRight: '16px' }}>
            <Badge count={cartItemCount}>
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
