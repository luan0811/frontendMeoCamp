import  { useEffect, useState } from 'react';
import { Row, Col, Typography, Spin } from 'antd';
import ProductCard from './ProductCard';
import { getProducts, Product } from '../../services/ProductServices';

const { Title } = Typography;

const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await getProducts();
      // Sort products by rate in descending order and take the top 3
      const topRatedProducts = fetchedProducts
        .sort((a, b) => b.rate - a.rate)
        .slice(0, 3);

      setProducts(topRatedProducts);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  return (
    <div style={{ padding: '40px 20px' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: '40px', color: '#fff' }}>
        Các sản phẩm nổi bật
      </Title>
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <Spin size="large" />
        </div>
      ) : (
        <Row gutter={[16, 16]} justify="center">
          {products.map((product) => (
            <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
              <ProductCard image={product.image} name={product.name} rent_price={product.rent_price} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default FeaturedProducts;
