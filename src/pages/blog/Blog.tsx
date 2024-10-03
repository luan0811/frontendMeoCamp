import { useEffect, useState } from 'react';
import { Card, Col, Row, Input, Typography, Skeleton } from 'antd';
import { getAllBlogs, getCustomerMap } from '../../services/BlogServices';
import { useNavigate } from 'react-router-dom';

const { Meta } = Card;
const { Search } = Input;
const { Title } = Typography;

// Define the types for the blog posts
interface Blog {
    id: number;
    title: string;
    content: string;
    image: string;
    postDate: string;
    customerId: number;
}

function BlogPage() {
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [customerMap, setCustomerMap] = useState<Map<number, string>>(new Map());

    // Fetch all blogs on component mount
    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const [allBlogs, customerMap] = await Promise.all([
                    getAllBlogs(),
                    getCustomerMap()
                ]);
                setBlogs(allBlogs);
                setFilteredBlogs(allBlogs);
                setCustomerMap(customerMap);
            } catch (error) {
                console.error("Error fetching data", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    // Handle search functionality
    const handleSearch = (value: string) => {
        const searchResult = blogs.filter(blog =>
            blog.title.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredBlogs(searchResult);
    };

    const handleViewBlog = (blogId: number) => {
        navigate(`/blog/${blogId}`);
    };

    return (
        <div style={{ padding: '70px', backgroundColor: '#1e1e1e' }}>
            <Title level={2} style={{ textAlign: 'center', marginBottom: '30px', color: 'white' }}>Bài Viết</Title>
            <Search
                placeholder="Tìm kiếm blog"
                onSearch={handleSearch}
                enterButton
                style={{ marginBottom: '30px', maxWidth: '600px', margin: '0 auto 30px' }}
            />
            <Row gutter={[16, 16]}>
                {loading ? (
                    // Skeleton loading
                    Array.from({ length: 8 }).map((_, index) => (
                        <Col xs={24} sm={12} md={8} lg={6} key={index}>
                            <Card
                                style={{ width: '100%', marginTop: 16 }}
                                cover={<Skeleton.Image active style={{ width: '100%', height: 200 }} />}
                            >
                                <Skeleton active />
                            </Card>
                        </Col>
                    ))
                ) : (
                    // Actual blog posts
                    filteredBlogs.map(blog => (
                        <Col xs={24} sm={12} md={8} lg={6} key={blog.id}>
                            <Card
                                hoverable
                                cover={<img alt={blog.title} src={blog.image} style={{ height: 200, objectFit: 'cover' }} />}
                                style={{ borderRadius: '10px' }}
                                actions={[
                                    <button
                                        key="view"
                                        style={{
                                            backgroundColor: '#ffa500',
                                            border: 'none',
                                            padding: '10px',
                                            borderRadius: '5px',
                                            color: '#fff',
                                            cursor: 'pointer',
                                        }}
                                        onClick={() => handleViewBlog(blog.id)}
                                    >
                                        Xem ngay
                                    </button>,
                                ]}
                            >
                                <Meta
                                    title={blog.title}
                                    description={
                                        <div>
                                            <p style={{ color: '#888', fontSize: '0.9em' }}>
                                                Ngày đăng: {new Date(blog.postDate).toLocaleDateString('vi-VN')}
                                            </p>
                                            <p style={{ color: '#888', fontSize: '0.9em' }}>
                                                Tác giả: {customerMap.get(blog.customerId) || 'Unknown'}
                                            </p>
                                        </div>
                                    }
                                />
                            </Card>
                        </Col>
                    ))
                )}
            </Row>
        </div>
    );
}

export default BlogPage;
