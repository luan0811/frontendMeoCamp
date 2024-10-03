import { useState } from 'react';
import { Form, Input, Button, Upload, message, Typography } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { createBlog } from '../../services/BlogServices';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from '../../utils/firebase/firebase';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;
const { TextArea } = Input;

function AddBlog() {
    const [form] = Form.useForm();
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleImageUpload = async (file: File) => {
        const storage = getStorage(app);
        const storageRef = ref(storage, 'blog-images/' + file.name);
        
        try {
            const snapshot = await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(snapshot.ref);
            setImageUrl(downloadURL);
            return downloadURL;
        } catch (error) {
            console.error("Error uploading image: ", error);
            message.error('Failed to upload image');
            return null;
        }
    };

    const onFinish = async (values: any) => {
        setLoading(true);
        try {
            const userId = 1; // Replace with actual user ID from your auth system
            await createBlog(userId, {
                title: values.title,
                content: values.content,
                image: imageUrl,
            });
            message.success('Blog created successfully');
            navigate('/blogs');
        } catch (error) {
            console.error("Error creating blog: ", error);
            message.error('Failed to create blog');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '70px', maxWidth: '800px', margin: '0 auto' }}>
            <Title level={2} style={{ textAlign: 'center', marginBottom: '30px' }}>Thêm Blog Mới</Title>
            <Form form={form} layout="vertical" onFinish={onFinish}>
                <Form.Item name="title" label="Tiêu đề" rules={[{ required: true, message: 'Please input the title!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="content" label="Nội dung" rules={[{ required: true, message: 'Please input the content!' }]}>
                    <TextArea rows={6} />
                </Form.Item>
                <Form.Item name="image" label="Hình ảnh" rules={[{ required: true, message: 'Please upload an image!' }]}>
                    <Upload
                        listType="picture-card"
                        beforeUpload={async (file) => {
                            const url = await handleImageUpload(file);
                            if (url) {
                                form.setFieldsValue({ image: url });
                            }
                            return false;
                        }}
                    >
                        <Button icon={<UploadOutlined />}>Upload Image</Button>
                    </Upload>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Tạo Blog
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default AddBlog;