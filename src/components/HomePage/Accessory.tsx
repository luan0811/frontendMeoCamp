import { useEffect, useState } from 'react';
import { Row, Col, Typography, Button, Card, Tag, Space, Skeleton } from 'antd';
import { getProducts, Product } from '../../services/ProductServices';
import back from '../../assets/img/image 32.png';
import defaultpic from '../../assets/img/default.jpg';
import { Link } from 'react-router-dom';

const { Title } = Typography;

const Accessory = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<string>('All Products');

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const handleTypeClick = (type: string) => {
    setSelectedType(type);
  };

  // Filter products where the type is "Accessory" and limit to 8 cards
  const filteredProducts = selectedType === 'All Products' || selectedType === 'Tất cả phụ kiện'
    ? products.filter(product => product.type === 'Accessory').slice(0, 8)
    : products.filter(product => product.type === selectedType).slice(0, 8);

  return (
    <div style={{
      padding: '40px 20px', color: '#fff',
      backgroundImage: `url(${back})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundColor: 'black'
    }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: '20px', color: '#fff' }}>Phụ kiện</Title>
      <h1 style={{ marginTop: -40, paddingBottom: '20px' }}>____________________________________________________________________________________________________________________________</h1>
      <Space size="large" style={{ marginBottom: '20px', justifyContent: 'center', display: 'flex' }}>
        {['Tất cả phụ kiện', 'Túi', 'Găng tay', 'Giày/Ủng', 'Mũ', 'Đèn pin'].map(type => (
          <Tag.CheckableTag
            key={type}
            checked={selectedType === type}
            onChange={() => handleTypeClick(type)}
            style={{
              backgroundColor: selectedType === type ? '#f90' : '#444',
              color: selectedType === type ? '#000' : '#fff',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '20px',
              fontSize: '16px',
            }}
          >
            {type}
          </Tag.CheckableTag>
        ))}
      </Space>

      <Row gutter={[16, 16]} justify="center">
        {loading
          ? Array.from({ length: 8 }).map((_, index) => (
            <Col key={index} xs={24} sm={12} md={8} lg={6}>
              <Card
                cover={<Skeleton.Image style={{ height: '200px' }} />}
                style={{ borderRadius: '10px', overflow: 'hidden', backgroundColor: '#444', color: '#fff' }}
                bodyStyle={{ textAlign: 'center', backgroundColor: '#444', color: '#fff' }}
              >
                <Skeleton active />
              </Card>
            </Col>
          ))
          : filteredProducts.map(product => (
            <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                cover={<img alt={product.name} src={Array.isArray(product.image) ? product.image[0] : product.image || defaultpic} style={{ height: '200px', objectFit: 'cover' }} />}
                style={{ borderRadius: '10px', overflow: 'hidden', backgroundColor: '#444', color: '#fff' }}
                bodyStyle={{ textAlign: 'center', backgroundColor: '#444', color: '#fff' }}
              >
                <Title level={4} style={{ marginBottom: '10px', color: '#fff' }}>
                  {product.name}
                </Title>
                <p style={{ marginBottom: '10px', color: '#fff' }}>{product.rent_price} VND/ngày</p>
                <Button type="primary" style={{ backgroundColor: '#f90', borderColor: '#f90' }}>
                  <Link to={`/product/${product.id}`} style={{ color: '#fff' }}>Xem chi tiết</Link>
                </Button>
              </Card>
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default Accessory;
