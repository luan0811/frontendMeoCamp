import BackgroundSection from '../../components/HomePage/BackgroundSection';
import FeaturedProducts from '../../components/HomePage/FeaturedProducts';
import Tent from '../../components/HomePage/Tent';
import Accessory from '../../components/HomePage/Accessory';
import Device from '../../components/HomePage/Device';

import { Layout } from 'antd';

const { Content } = Layout;

const Home = () => {
  return (
    <Layout style={{ background: 'transparent' }}>
      <Content>
        <BackgroundSection />
        <FeaturedProducts />
        <Tent />
        <Accessory />
        <Device />
      </Content>
    </Layout>
  );
};

export default Home;
