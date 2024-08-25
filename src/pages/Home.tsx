
import BackgroundSection from '../components/HomePage/BackgroundSection';
import FeaturedProducts from '../components/HomePage/FeaturedProducts';

const Home = () => {
  return (
    <div style={{ backgroundColor: '#333', color: '#fff', paddingBottom: '20px' }}>
      <BackgroundSection />
      <FeaturedProducts />
    </div>
  );
};

export default Home;
