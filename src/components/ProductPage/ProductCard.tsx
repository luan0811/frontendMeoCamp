import React from 'react';
import { Card, Button } from 'antd';
import Title from 'antd/es/typography/Title';


interface ProductCardProps {
  name: string;
  image: string;
  rentPrice: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, image, rentPrice }) => {
  return (
    <Card
      hoverable
      cover={<img alt={name} src={image} style={{ height: '200px', objectFit: 'cover' }} />}
      style={{ borderRadius: '10px', overflow: 'hidden', backgroundColor: '#444', color: '#fff' }}
      bodyStyle={{ textAlign: 'center', backgroundColor: '#444', color: '#fff' }}
    >
      <Title level={4} style={{ marginBottom: '10px', color: '#fff' }}>
        {name}
      </Title>
      <p style={{ marginBottom: '10px', color: '#fff' }}>{rentPrice} VND/day</p>
      <Button type="primary" style={{ backgroundColor: '#f90', borderColor: '#f90' }}>
        Order now
      </Button>
    </Card>
  );
};

export default ProductCard;
