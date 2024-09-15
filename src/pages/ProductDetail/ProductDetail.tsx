import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Rate, Radio, Typography, Row, Col, Skeleton } from "antd";
import { getProductById, Product } from "../../services/ProductServices";
import "./ProductDetail.css";

const { Title, Paragraph } = Typography;

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [rentDuration, setRentDuration] = useState(1);
  const [mainImage, setMainImage] = useState<string>(""); // State for the main image

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        const fetchedProduct = await getProductById(id);
        setProduct(fetchedProduct);
        if (fetchedProduct && fetchedProduct.image.length > 0) {
          setMainImage(fetchedProduct.image[0]); // Set the first image as the initial main image
        }
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleRentChange = (e: any) => {
    setRentDuration(e.target.value);
  };

  if (loading) {
    // Render skeletons while loading
    return (
      <div className="product-detail-container">
        <Row gutter={[32, 16]}>
          <Col xs={24} md={12}>
            <Skeleton.Image style={{ width: '100%', height: '400px' }} />
            <div style={{ marginTop: '10px' }}>
              <Skeleton.Image style={{ width: '80px', height: '80px', marginRight: '10px' }} />
              <Skeleton.Image style={{ width: '80px', height: '80px', marginRight: '10px' }} />
              <Skeleton.Image style={{ width: '80px', height: '80px', marginRight: '10px' }} />
            </div>
          </Col>
          <Col xs={24} md={12}>
            <Skeleton active paragraph={{ rows: 4 }} />
            <Skeleton.Button active style={{ width: '200px', marginBottom: '10px' }} />
            <Skeleton.Button active style={{ width: '200px' }} />
          </Col>
        </Row>
        <Skeleton active paragraph={{ rows: 3 }} style={{ marginTop: '20px' }} />
      </div>
    );
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="product-detail-container">
      <Row gutter={[32, 16]}>
        <Col xs={24} md={12}>
          <div className="product-image-gallery">
            <img
              className="main-product-image"
              src={mainImage} // Display the main image
              alt={product.name}
            />
            <div className="product-thumbnail-gallery">
              {product.image.map((thumbnail, index) => (
                <img
                  key={index}
                  className="product-thumbnail"
                  src={thumbnail}
                  alt={`Thumbnail ${index + 1}`}
                  onMouseEnter={() => setMainImage(thumbnail)} // Update main image on hover
                />
              ))}
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
              <Rate style={{ color: "#ff4d4f" }} />
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
                <Title level={3} style={{ color: "#ff4d4f" }}>
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
        <Title style={{ color: "white" }} level={4}>
          Chi tiết sản phẩm
        </Title>
        <Paragraph style={{ color: "white" }}>{product.des}</Paragraph>
      </div>
    </div>
  );
};

export default ProductDetail;
