
import { Typography } from 'antd';
import pic from '../../assets/img/picture.png';

const { Title } = Typography;

const BackgroundSection = () => {
  return (
    <div
      style={{
        backgroundColor: 'black',
        backgroundImage: `url(${pic})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '800px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      <div
        style={{
          color: '#fff',
          fontFamily: `'Montserrat', sans-serif`, // Or 'Playfair Display', serif
          fontWeight: '700',
          fontSize: '48px', // Adjust the size as needed
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', // Optional shadow for extra effect
        }}
      >
        <Title style={{ color: '#fff'}}>Chào mừng bạn đến với Meo Camp</Title>
      </div>
    </div>
  );
};

export default BackgroundSection;
