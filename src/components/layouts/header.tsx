import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import logo from '../../assets/img/logo_cam.png';

const { Header: AntHeader } = Layout;

const Header = () => {
  return (
    <AntHeader style={{ background: '#fff', padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
        <Menu mode="horizontal">
          <Menu.Item key="6">
            <Link to="/login">Đăng nhập</Link>
          </Menu.Item>
          <Menu.Item key="7">
            <Link to="/register">Đăng ký</Link>
          </Menu.Item>
        </Menu>
      </div>
    </AntHeader>
  );
};

export default Header;
