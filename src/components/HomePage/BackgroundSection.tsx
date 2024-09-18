
import { Typography } from 'antd';
import pic from '../../assets/img/picture.png';

const { Title } = Typography;

const BackgroundSection = () => {
  return (
    <div
      style={{
        backgroundColor: 'black',
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${pic})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      <div
        style={{
          textAlign: 'center',
          color: '#fff',
          fontFamily: `'Montserrat', sans-serif`,
          padding: '20px',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          borderRadius: '10px',
        }}
      >
        <Title style={{ color: '#fff', fontSize: '4rem', marginBottom: '20px' }}>
          Chào mừng bạn đến với Meo Camp
        </Title>
        <p style={{ fontSize: '1.5rem', maxWidth: '600px', margin: '0 auto' }}>
          Khám phá thiên nhiên với trang thiết bị cắm trại chất lượng cao
        </p>
      </div>
    </div>
  );
};

export default BackgroundSection;
