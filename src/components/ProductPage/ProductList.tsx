import React from 'react';
import { Row, Col } from 'antd';
import ProductCard from './ProductCard';
import { Product } from '../../services/ProductServices';


interface ProductListProps {
  products: Product[];
  loading: boolean;
}

const ProductList: React.FC<ProductListProps> = ({ products, loading }) => {
  return (
    <Row gutter={[16, 16]} justify="center">
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <p>Loading...</p>
        </div>
      ) : (
        products.map(product => (
          <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
            <ProductCard id={product.id} name={product.name} image={product.image} rentPrice={product.rent_price} />
          </Col>
        ))
      )}
    </Row>
  );
};

export default ProductList;
