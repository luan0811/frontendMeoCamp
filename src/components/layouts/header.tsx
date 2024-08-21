// src/components/Header.tsx
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

const { Header: AntHeader } = Layout;

const Header = () => {
  return (
    <AntHeader style={{ background: '#fff', padding: 0 }}>
      <Menu mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item key="1">
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/login">Login</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/register">Register</Link>
        </Menu.Item>
      </Menu>
    </AntHeader>
  );
};

export default Header;
