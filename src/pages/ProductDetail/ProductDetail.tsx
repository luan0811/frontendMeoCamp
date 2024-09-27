import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Rate, Radio, Typography, Row, Col, Skeleton } from "antd";
import { getProductDetail, Product1 } from "../../services/ProductServices";
import "./ProductDetail.css";

const { Title, Paragraph } = Typography;

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product1 | null>(null);
  const [loading, setLoading] = useState(true);
  const [rentDuration, setRentDuration] = useState(1);
  const [mainImage, setMainImage] = useState<string>("");
  const [imageArray, setImageArray] = useState<string[]>([]); // Tạo state để lưu mảng ảnh

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        const fetchedProduct = await getProductDetail(id);
        setProduct(fetchedProduct);

        // Chuyển đổi `image` từ string thành array
        if (fetchedProduct && fetchedProduct.image) {
          const images = fetchedProduct.image.split(","); // Tách chuỗi ảnh bằng dấu phẩy
          setImageArray(images); // Lưu mảng ảnh vào state
          setMainImage(images[0]); // Gán ảnh đầu tiên làm main image
        }
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
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
              src={mainImage} // Hiển thị hình ảnh chính từ `mainImage`
              alt={product.productName}
            />
            {/* Hiển thị các hình ảnh thumbnail */}
            <div className="product-thumbnail-gallery">
              {imageArray.map((thumbnail, index) => (
                <img
                  key={index}
                  className="product-thumbnail"
                  src={thumbnail}
                  alt={`Thumbnail ${index + 1}`}
                  onMouseEnter={() => setMainImage(thumbnail)} // Cập nhật hình ảnh chính khi hover vào thumbnail
                />
              ))}
            </div>
          </div>
        </Col>

        {/* Thông tin sản phẩm */}
        <Col xs={24} md={12}>
          <div className="product-info">
            <Title level={4}>Hãng: {product.productName}</Title>
            <Paragraph>
              <strong>Tên sản phẩm:</strong> {product.productName} <br />
              <strong>Đánh giá:</strong> {product.rate} (từ người dùng) <br />
              <strong>Số lượng:</strong> {product.quantity} <br />
              <strong>Mô tả:</strong> {product.description} <br />
              <strong>Giá mua:</strong> {product.price} VND <br />
              {product.isRentable && (
                <>
                  <strong>Giá thuê:</strong> {product.rentalPrice} VND/ngày
                </>
              )}
            </Paragraph>

            {/* Đánh giá sản phẩm */}
            <div className="product-rating">
              <Title level={5}>Đánh giá sản phẩm này</Title>
              <Rate style={{ color: "#ff4d4f" }} defaultValue={product.rate} />
            </div>

            {/* Mua hoặc Thuê */}
            {product.isRentable && (
              <div className="product-buy-rent">
                <Radio.Group onChange={(e) => setRentDuration(e.target.value)} value={rentDuration}>
                  <Radio.Button value={1}>1 ngày</Radio.Button>
                  <Radio.Button value={2}>2 ngày</Radio.Button>
                  <Radio.Button value={3}>3 ngày</Radio.Button>
                  <Radio.Button value={4}>4 ngày</Radio.Button>
                </Radio.Group>
                <div className="price-section">
                  <Title level={3} style={{ color: "#ff4d4f" }}>
                    {product.rentalPrice} VND/ngày
                  </Title>
                  <Button type="primary" className="add-to-cart-btn">
                    Thêm vào giỏ hàng
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Col>
      </Row>

      {/* Mô tả sản phẩm */}
      <div className="product-description">
        <Title style={{ color: "white" }} level={4}>
          Chi tiết sản phẩm
        </Title>
        <Paragraph style={{ color: "white" }}>{product.description}</Paragraph>
      </div>
    </div>
  );
};

export default ProductDetail;
