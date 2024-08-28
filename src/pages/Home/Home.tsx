import BackgroundSection from '../../components/HomePage/BackgroundSection';
import FeaturedProducts from '../../components/HomePage/FeaturedProducts';
import Tent from '../../components/HomePage/Tent';
import Accessory from '../../components/HomePage/Accessory';
import Camera from '../../components/HomePage/Camera';

const Home = () => {
  return (
    <div style={{ color: '#fff', paddingBottom: '20px' }}>
      <BackgroundSection />
      <FeaturedProducts />
      <Tent />
      <Accessory />
      <Camera />
    </div>
  );
};

export default Home;
