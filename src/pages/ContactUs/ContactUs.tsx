import { Form, Input, Button } from "antd";
import { MailOutlined, PhoneOutlined } from "@ant-design/icons";
import { createContact } from "../../services/ContactServices";
import { message } from "antd";
import "./ContactUs.css";

const ContactUs = () => {
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    try {
      const contactData = {
        id: 0, // This will be assigned by the backend
        user_name: values.name,
        mail: values.email,
        phone: values.phone,
        description: values.message
      };
      await createContact(contactData);
      message.success('Bạn đã gửi thông tin thành công!');
      form.resetFields();
    } catch (error) {
      console.error('Error sending contact:', error);
      message.error('Gửi thông tin thất bại. Vui lòng thử lại.');
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-form-section">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          requiredMark="optional"
        >
          <Form.Item
            label="Tên"
            name="name"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên của bạn!",
              },
            ]}
          >
            <Input placeholder="Tên của bạn" />
          </Form.Item>

          <div className="contact-row">
            <Form.Item
              label="Email"
              name="email"
              className="contact-item"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập email của bạn!",
                },
                {
                  type: "email",
                  message: "Vui lòng nhập địa chỉ email hợp lệ!",
                },
              ]}
            >
              <Input placeholder="Email của bạn" />
            </Form.Item>

            <Form.Item
              label="Số điện thoại"
              name="phone"
              className="contact-item"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập số điện thoại của bạn!",
                },
                {
                  pattern: /^[0-9\s-]+$/,
                  message: "Số điện thoại không hợp lệ!",
                },
              ]}
            >
              <Input placeholder="Số điện thoại của bạn" />
            </Form.Item>
          </div>

          <Form.Item
            label="Lời nhắn"
            name="message"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập lời nhắn của bạn!",
              },
            ]}
          >
            <Input.TextArea placeholder="Lời nhắn" rows={4} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="submit-button">
              Gửi
            </Button>
          </Form.Item>
        </Form>
      </div>

      <div className="contact-info-section">
        <h2>
          Liên lạc với chúng <span>tôi</span>
        </h2>
        <p>
          Để biết thêm thông tin, nhận hỗ trợ kỹ thuật hoặc thảo luận về cơ hội
          hợp tác, hãy liên hệ với chúng tôi qua thông tin được cung cấp hoặc ở
          bảng bên trái. Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn một cách
          tốt nhất. Hãy để chúng tôi đồng hành cùng bạn trên con đường phát
          triển!
        </p>
        <div className="contact-details">
          <p>
            <MailOutlined /> meocamp@gmail.com
          </p>
          <p>
            <PhoneOutlined /> 0706434469 - Nguyễn Trần Thanh Trúc (Project
            Manager)
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
