import React from 'react';
import { Card, Typography, Button } from 'antd';

const { Title, Text } = Typography;

interface ProductCardProps {
  image: string;
  name: string;
  rent_price: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ image, name, rent_price }) => {
  return (
    <Card
      hoverable
      cover={<img alt={name} src={image} style={{ height: '200px', objectFit: 'cover' }} />}
      style={{ borderRadius: '10px', overflow: 'hidden' }}
      bodyStyle={{ textAlign: 'center', backgroundColor: '#444', color: '#fff' }}
    >
      <Title level={4} style={{ marginBottom: '10px', color: '#fff' }}>
        {name}
      </Title>
      <Text style={{ display: 'block', marginBottom: '20px', color: '#fff' }}>
        {rent_price} VND/day
      </Text>
      <Button type="primary" style={{ backgroundColor: '#f90', borderColor: '#f90' }}>
        Order now
      </Button>
    </Card>
  );
};

export default ProductCard;
