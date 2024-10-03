import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Typography, Skeleton, Card, Avatar, Divider, Button, Space } from 'antd';
import { UserOutlined, CalendarOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { getBlogById, getCustomerMap } from '../../services/BlogServices';

const { Title, Paragraph } = Typography;

interface Blog {
  id: number;
  title: string;
  content: string;
  image: string;
  post_date: string;
  customerId: number;
}

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [authorName, setAuthorName] = useState<string>('Unknown');

  useEffect(() => {
    const fetchBlogAndAuthor = async () => {
      if (id) {
        setLoading(true);
        try {
          const [fetchedBlog, customerMap] = await Promise.all([
            getBlogById(id),
            getCustomerMap()
          ]);
          if (fetchedBlog) {
            setBlog(fetchedBlog);
            setAuthorName(customerMap.get(fetchedBlog.customerId) || 'Unknown');
          } else {
            console.error("Blog not found");
          }
        } catch (error) {
          console.error("Error fetching blog details", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchBlogAndAuthor();
  }, [id]);

  if (loading) {
    return (
      <div style={{ padding: '70px', backgroundColor: '#f0f2f5' }}>
        <Card style={{ maxWidth: 800, margin: '0 auto' }}>
          <Skeleton.Image active style={{ width: '100%', height: 300 }} />
          <Skeleton active avatar paragraph={{ rows: 4 }} />
        </Card>
      </div>
    );
  }

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <div style={{ padding: '70px', backgroundColor: '#f0f2f5' }}>
      <Card 
        style={{ 
          maxWidth: 800, 
          margin: '0 auto',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          borderRadius: '12px'
        }}
      >
        <Link to="/blogs">
          <Button icon={<ArrowLeftOutlined />} style={{ marginBottom: 16 }}>
            Back to Blogs
          </Button>
        </Link>
        <img 
          src={blog.image} 
          alt={blog.title} 
          style={{ width: '100%', height: 300, objectFit: 'cover', borderRadius: 8 }} 
        />
        <Title level={2} style={{ marginTop: 24, marginBottom: 16, color: '#1890ff' }}>{blog.title}</Title>
        <Space align="center" style={{ marginBottom: 16 }}>
          <Avatar icon={<UserOutlined />} />
          <span>Author: {authorName}</span>
          <Divider type="vertical" />
          <CalendarOutlined />
          <span>{new Date(blog.post_date).toLocaleDateString('vi-VN')}</span>
        </Space>
        <Divider />
        <Paragraph style={{ fontSize: 16, lineHeight: 1.8, color: 'rgba(0, 0, 0, 0.85)' }}>
          {blog.content}
        </Paragraph>
      </Card>
    </div>
  );
};

export default BlogDetail;