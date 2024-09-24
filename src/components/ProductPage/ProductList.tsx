import React from 'react';
import { Row, Col, Skeleton, Card } from 'antd';
import ProductCard from './ProductCard';
import { Product1 } from '../../services/ProductServices'; // Use correct Product1 type

interface ProductListProps {
  products: Product1[]; // Expecting Product1 array type as a prop
  loading: boolean; // Expecting loading state
}

const ProductList: React.FC<ProductListProps> = ({ products, loading }) => {
  return (
    <Row gutter={[16, 16]} justify="center">
      {loading
        ? // Render skeletons when loading
          Array.from({ length: 12 }).map((_, index) => (
            <Col key={index} xs={24} sm={12} md={8} lg={6}>
              <Card>
                <Skeleton.Image style={{ width: '100%', height: '200px' }} />
                <Skeleton active paragraph={{ rows: 2 }} />
              </Card>
            </Col>
          ))
        : // Render actual product cards when data is available
          products.map((product) => (
            <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
              <ProductCard
                id={product.id.toString()}
                name={product.productName}
                image={product.image}
                rentPrice={product.rentalPrice}
              />
            </Col>
          ))}
    </Row>
  );
};

export default ProductList;
