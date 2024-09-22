// src/components/Layout.tsx
import { Layout as AntLayout } from 'antd';
import Header from './header';
import Footer from './footer';

const { Content } = AntLayout;

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <AntLayout style={{ minHeight: '100vh' }}>
      <Header />
      {/* <Content style={{ padding: '20px' }}>{children}</Content> */}
      <Content>{children}</Content>
      <Footer />
    </AntLayout>
  );
};

export default Layout;
