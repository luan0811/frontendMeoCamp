import React from 'react';
import { Card, Typography, Button } from 'antd';

const { Title, Text } = Typography;

interface ProductCardProps {
  image: string;
  title: string;
  price: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ image, title, price }) => {
  return (
    <Card
      hoverable
      cover={<img alt={title} src={image} style={{ height: '200px', objectFit: 'cover' }} />}
      style={{ borderRadius: '10px', overflow: 'hidden' }}
      bodyStyle={{ textAlign: 'center', backgroundColor: '#444', color: '#fff' }}
    >
      <Title level={4} style={{ marginBottom: '10px', color: '#fff' }}>
        {title}
      </Title>
      <Text style={{ display: 'block', marginBottom: '20px', color: '#fff' }}>{price}</Text>
      <Button type="primary" style={{ backgroundColor: '#f90', borderColor: '#f90' }}>
        Order now
      </Button>
    </Card>
  );
};

export default ProductCard;
