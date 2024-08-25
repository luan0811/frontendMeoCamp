
import { Typography } from 'antd';
import pic from '../../assets/img/picture.png';

const { Title } = Typography;

const BackgroundSection = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${pic})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '400px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          padding: '20px 40px',
          borderRadius: '10px',
          textAlign: 'center',
        }}
      >
        <Title style={{ color: '#fff' }}>Chào mùng bạn đến với Meo Camp</Title>
      </div>
    </div>
  );
};

export default BackgroundSection;
