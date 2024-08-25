
import { Row, Col, Typography } from 'antd';
import ProductCard from './ProductCard';

const { Title } = Typography;

const FeaturedProducts = () => {
  return (
    <div style={{ padding: '40px 20px' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: '40px', color: '#fff' }}>
        Sản phẩm nổi bật
      </Title>
      <Row gutter={[16, 16]} justify="center">
        <Col xs={24} sm={12} md={8} lg={6}>
          <ProductCard
            image="path-to-your-image-1"
            title="4-Person Automatic Open Tent"
            price="60.000 VND/day"
          />
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <ProductCard
            image="path-to-your-image-2"
            title="SUPS Basic"
            price="200.000 VND/day"
          />
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <ProductCard
            image="path-to-your-image-3"
            title="Tent for 5-6 Person"
            price="200.000 VND/day"
          />
        </Col>
      </Row>
    </div>
  );
};

export default FeaturedProducts;
