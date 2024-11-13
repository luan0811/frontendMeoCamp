import { useEffect, useState } from 'react';
import { Row, Col, Typography, Spin } from 'antd';
import ProductCard from './ProductCard';
import { getAllProduct, Product1 } from '../../services/ProductServices';
import back from '../../assets/img/image 72.png'
const { Title } = Typography;

const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product1[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await getAllProduct();
      const topRatedProducts = fetchedProducts
        .filter(product => product.status === true)
        .sort((a, b) => b.rate - a.rate)
        .slice(0, 3);

      setProducts(topRatedProducts);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  // Hàm để lấy ảnh đầu tiên từ mảng ảnh
  const getFirstImage = (images: string[]) => {
    return images && images.length > 0 ? images[0] : ''; // Trả về ảnh đầu tiên hoặc chuỗi rỗng nếu không có ảnh
  };

  return (
    <div style={{
      padding: '80px 20px',
      backgroundImage: `url(${back})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
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
        Các sản phẩm nổi bật
      </Title>
      <div style={{
        width: '60px',
        height: '4px',
        margin: '0 auto 60px',
      }}></div>
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <Spin size="large" />
        </div>
      ) : (
        <Row gutter={[32, 32]} justify="center">
          {products.map((product) => (
            <Col key={product.id} xs={24} sm={12} md={8} lg={8}>
              <ProductCard 
                id={product.id} 
                image={getFirstImage(product.images)} 
                name={product.productName} 
                price={product.price} 
              />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default FeaturedProducts;
