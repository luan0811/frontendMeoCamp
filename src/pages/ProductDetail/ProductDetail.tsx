import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Rate, Radio, Typography, Row, Col } from 'antd';
import { getProductById, Product } from '../../services/ProductServices';
import './ProductDetail.css';

const { Title, Paragraph } = Typography;

const ProductDetail = () => {
  const { id } = useParams(); // Assuming you are using React Router for dynamic routing
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [rentDuration, setRentDuration] = useState(1); // For rent duration

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        const fetchedProduct = await getProductById(id);
        setProduct(fetchedProduct);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleRentChange = (e: any) => {
    setRentDuration(e.target.value);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="product-detail-container">
      <Row gutter={[32, 16]}>
        {/* Product Image and Gallery */}
        <Col xs={24} md={12}>
          <div className="product-image-gallery">
            <img className="main-product-image" src={product.image} alt={product.name} />
            <div className="product-thumbnail-gallery">
              {/* Add other thumbnails here */}
              <img className="product-thumbnail" src="path_to_image1" alt="Thumbnail" />
              <img className="product-thumbnail" src="path_to_image2" alt="Thumbnail" />
              <img className="product-thumbnail" src="path_to_image3" alt="Thumbnail" />
            </div>
          </div>
        </Col>

        {/* Product Info, Buy/Rent Section */}
        <Col xs={24} md={12}>
          <div className="product-info">
            <Title level={4}>Hãng: {product.name}</Title>
            <Paragraph>
              <strong>Tên sản phẩm:</strong> {product.name} <br />
              <strong>Đánh giá:</strong> {product.rate} (từ người dùng) <br />
              <strong>Số lượng:</strong> {product.quantity} <br />
              <strong>Kích cỡ:</strong> {product.size} <br />
              <strong>Giá mua:</strong> {product.purchase_price} VND <br />
              <strong>Giá thuê:</strong> {product.rent_price} VND/ngày
            </Paragraph>

            {/* Rating from users */}
            <div className="product-rating">
              <Title level={5}>Đánh giá sản phẩm này</Title>
              <Rate style={{ color: '#ff4d4f' }} />
            </div>

            {/* Buy or Rent Buttons */}
            <div className="product-buy-rent">
              <Radio.Group onChange={handleRentChange} value={rentDuration}>
                <Radio.Button value={1}>1 ngày</Radio.Button>
                <Radio.Button value={2}>2 ngày</Radio.Button>
                <Radio.Button value={3}>3 ngày</Radio.Button>
                <Radio.Button value={4}>4 ngày</Radio.Button>
              </Radio.Group>
              <div className="price-section">
                <Title level={3} style={{ color: '#ff4d4f' }}>
                  {product.rent_price} VND/ngày
                </Title>
                <Button type="primary" className="add-to-cart-btn">
                  Thêm vào giỏ hàng
                </Button>
              </div>
            </div>
          </div>
        </Col>
      </Row>

      {/* Product Description */}
      <div className="product-description">
        <Title style={{color: 'white'}} level={4}>Chi tiết sản phẩm</Title>
        <Paragraph style={{color:'white'}}>
          {/* Example of product description */}
          {product.des}
        </Paragraph>
      </div>
    </div>
  );
};

export default ProductDetail;
