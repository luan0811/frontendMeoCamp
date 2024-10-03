import React from 'react';
import { Card, Typography, Button } from 'antd';
import { Link } from 'react-router-dom';
import defaultImage from '../../assets/img/default.jpg'; // Đảm bảo đường dẫn này chính xác

const { Title, Text } = Typography;

interface ProductCardProps {
  id: number; // Add id as a prop for routing
  image: string;
  name: string;
  rent_price: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, image, name, rent_price }) => {
  return (
    <Card
      hoverable
      cover={<img alt={name} src={image || defaultImage} style={{ height: '250px', objectFit: 'cover' }} />}
      style={{
        borderRadius: '15px',
        overflow: 'hidden',
        backgroundColor: 'rgba(68, 68, 68, 0.8)',
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
        transition: 'all 0.3s ease',
      }}
      bodyStyle={{
        textAlign: 'center',
        backgroundColor: 'transparent',
        color: '#fff',
        padding: '20px'
      }}
    >
      <Title level={4} style={{ marginBottom: '10px', color: '#fff', fontSize: '1.2rem' }}>
        {name}
      </Title>
      <Text style={{
        display: 'block',
        marginBottom: '20px',
        color: '#f90',
        fontSize: '1.1rem',
        fontWeight: 'bold'
      }}>
        {rent_price} VND/ngày
      </Text>

      {/* Link to Product Detail page */}
      <Link to={`/product/${id}`}>
        <Button 
          type="primary" 
          style={{
            backgroundColor: '#f90',
            borderColor: '#f90',
            borderRadius: '20px',
            padding: '0 25px',
            height: '36px',
            fontSize: '14px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: '1px',
          }}
        >
          Xem chi tiết
        </Button>
      </Link>
    </Card>
  );
};

export default ProductCard;
