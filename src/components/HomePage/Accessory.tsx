import { useEffect, useState } from 'react';
import { Row, Col, Typography, Button, Card, Tag, Space, Skeleton } from 'antd';
import { getAllProduct, Product1 } from '../../services/ProductServices';
import back from '../../assets/img/image 32.png';
import defaultpic from '../../assets/img/default.jpg';
import { Link } from 'react-router-dom';

const { Title } = Typography;

const Accessory = () => {
  const [products, setProducts] = useState<Product1[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<string>('Tất cả phụ kiện');

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await getAllProduct();
      setProducts(fetchedProducts);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const handleTypeClick = (type: string) => {
    setSelectedType(type);
  };

  const accessoryTypes = ['Tất cả phụ kiện', 'Túi', 'Găng tay', 'Giày/Ủng', 'Mũ', 'Đèn pin'];

  // Filter products based on selectedType and subcate
  const filteredProducts = products.filter(product => {
    if (selectedType === 'Tất cả phụ kiện') {
      return product.categoryId === 2 && product.status === true;
    } else {
      return product.categoryId === 2 && product.status === true && product.subcate === selectedType;
    }
  }).slice(0, 8);

  return (
    <div style={{
      padding: '40px 20px', color: '#fff',
      backgroundImage: `url(${back})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundColor: 'black'
    }}>
      <Title level={2} style={{
        textAlign: 'center',
        marginBottom: '40px',
        color: '#fff',
        fontSize: '2.5rem',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: '2px'
      }}>
        Phụ kiện
      </Title>
      <h1 style={{ marginTop: -40, paddingBottom: '20px' }}>____________________________________________________________________________________________________________________________</h1>
      <Space size="large" style={{ marginBottom: '20px', justifyContent: 'center', display: 'flex' }}>
        {accessoryTypes.map(type => (
          <Tag.CheckableTag
            key={type}
            checked={selectedType === type}
            onChange={() => handleTypeClick(type)}
            style={{
              backgroundColor: selectedType === type ? '#f90' : 'rgba(68, 68, 68, 0.8)',
              color: selectedType === type ? '#000' : '#fff',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '25px',
              fontSize: '16px',
              margin: '5px',
              transition: 'all 0.3s ease',
              boxShadow: selectedType === type ? '0 5px 15px rgba(255, 153, 0, 0.4)' : 'none',
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
                cover={<img alt={product.productName} src={product.images && product.images.length > 0 ? product.images[0] : defaultpic} style={{ height: '250px', objectFit: 'cover' }} />}
                style={{
                  borderRadius: '15px',
                  overflow: 'hidden',
                  backgroundColor: 'rgba(68, 68, 68, 0.8)',
                  color: '#fff',
                  boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
                  transition: 'all 0.3s ease',
                }}
                bodyStyle={{ textAlign: 'center', backgroundColor: 'transparent', color: '#fff', padding: '20px' }}
              >
                <Title level={4} style={{ marginBottom: '10px', color: '#fff', fontSize: '1.2rem' }}>
                  {product.productName}
                </Title>
                <p style={{ marginBottom: '15px', color: '#f90', fontSize: '1.1rem', fontWeight: 'bold' }}>{product.price} VND</p>
                <Button type="primary" style={{ backgroundColor: '#f90', borderColor: '#f90', borderRadius: '20px', padding: '0 25px' }}>
                  <Link to={`/product/${product.id}`} style={{ color: '#fff' }}>Xem chi tiết</Link>
                </Button>
              </Card>
            </Col>
          ))}
      </Row>
      <div style={{
        width: '60px',
        height: '4px',
        margin: '0 auto 40px',
      }}></div>
    </div>
  );
};

export default Accessory;