import React from 'react';
import { Card, Col, Row, Typography, Image } from 'antd';
import './AboutUs.css';

const { Title, Paragraph } = Typography;

const AboutUs: React.FC = () => {
  return (
    <div>
      {/* about us */}
      <div className="about-us-container">
        <Card className="about-us-content">
          <Row gutter={[16, 16]} justify="center">
            <Col xs={24} md={12} className="about-us-text-section">
              <Title level={2}><strong>Meo Camp</strong></Title>
              <Title level={1}>Về Chúng Tôi</Title>
              <Paragraph>
                Chào mừng bạn đến với <strong>Meo Camp</strong>, điểm đến lý tưởng cho những
                cuộc phiêu lưu ngoài trời! Chúng tôi chuyên cung cấp các loại lều trại
                chất lượng cao và các sản phẩm du lịch khác để giúp bạn khám phá thiên
                nhiên một cách thoải mái và an toàn. Tại <strong>Meo Camp</strong>, chúng tôi
                cam kết mang đến cho bạn những trải nghiệm tuyệt vời trong các chuyến đi
                cắm trại và du lịch, với dịch vụ khách hàng tận tâm và sản phẩm đáng tin cậy.
                Hãy cùng chúng tôi khám phá thế giới tự nhiên và tạo nên những kỷ niệm
                đáng nhớ!
              </Paragraph>
            </Col>
            <Col xs={24} md={12} className="about-us-image-section">
              <Image
                src="src/assets/img/logo_cam.png"
                alt="Camping gear"
                width="100%"
                height="auto"
                style={{ objectFit: 'cover' }}
              />
            </Col>
          </Row>
        </Card>
      </div>
      {/* vision */}
      <div className="about-us-container">
        <Card className="about-us-content">
          <Row gutter={[16, 16]} justify="center">
            <Col xs={24} md={12} className="about-us-image-section">
              <Image
                src="src/assets/img/fire3d.png"
                alt="Camping adventure"
                width="100%"
                height="auto"
                style={{ objectFit: 'cover' }}
              />
            </Col>
            <Col xs={24} md={12} className="about-us-text-section">
              <Title level={1}>Tầm Nhìn</Title>
              <Paragraph>
                <strong>Meo Camp</strong> hướng tới việc trở thành lựa chọn hàng đầu cho
                những tín đồ yêu thích cắm trại và du lịch. Chúng tôi muốn cung cấp các sản
                phẩm và dịch vụ đỉnh cao để mọi cuộc phiêu lưu của bạn đều trở nên dễ
                dàng và thú vị hơn. Với sự đổi mới và sự tập trung vào chất lượng, chúng
                tôi mong muốn trở thành người đồng hành đáng tin cậy trong mỗi chuyến đi
                của bạn.
              </Paragraph>
            </Col>
          </Row>
        </Card>
      </div>
      {/* mission */}
      <div className="about-us-container">
        <Card className="about-us-content">
          <Row gutter={[16, 16]} justify="center">
            <Col xs={24} md={12} className="about-us-text-section">
              <Title level={1}>Sứ Mệnh</Title>
              <Paragraph>
                Sứ mệnh của chúng tôi là mang đến cho bạn những sản phẩm và dịch vụ du
                lịch chất lượng nhất, từ những chiếc lều trại bền bỉ đến những phụ kiện
                tiện ích nhất. Chúng tôi cam kết tạo ra những trải nghiệm cắm trại và
                du lịch không chỉ an toàn mà còn thú vị, giúp bạn tận hưởng từng khoảnh
                khắc ngoài trời với sự thoải mái tối đa.
              </Paragraph>
            </Col>
            <Col xs={24} md={12} className="about-us-image-section">
              <Image
                src="src/assets/img/leu1.png"
                alt="Camping gear"
                width="100%"
                height="auto"
                style={{ objectFit: 'cover' }}
              />
            </Col>
          </Row>
        </Card>
      </div>
      {/* value */}
      <div className="about-us-container">
        <Card className="about-us-content">
          <Row gutter={[16, 16]} justify="center">
            <Col xs={24} md={12} className="about-us-image-section">
              <Image
                src="src/assets/img/leu2.png"
                alt="Outdoor adventure"
                width="100%"
                height="auto"
                style={{ objectFit: 'cover' }}
              />
            </Col>
            <Col xs={24} md={12} className="about-us-text-section">
              <Title level={1}>Giá Trị</Title>
              <Paragraph>
                Tại <strong>Meo Camp</strong>, chúng tôi coi sự tin cậy và chất lượng
                là ưu tiên hàng đầu. Chúng tôi tin vào việc cung cấp những sản phẩm
                xuất sắc, dễ sử dụng và bền bỉ, giúp mỗi chuyến cắm trại của bạn
                trở nên trọn vẹn và thú vị. Chúng tôi không ngừng cải tiến để đáp ứng
                nhu cầu của khách hàng và duy trì sự hài lòng của bạn với các sản phẩm
                và dịch vụ của chúng tôi.
              </Paragraph>
            </Col>
          </Row>
        </Card>
      </div>
    </div>
  );
};

export default AboutUs;
