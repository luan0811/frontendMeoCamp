import { useEffect, useState } from 'react';
import { Card, Col, Row, Input, Typography, Skeleton, Button, Pagination } from 'antd';
import { getAllBlogs, getCustomerMap } from '../../services/BlogServices';
import { useNavigate } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';

const { Meta } = Card;
const { Search } = Input;
const { Title } = Typography;

// Define the types for the blog posts
interface Blog {
    id: number;
    title: string;
    content: string;
    image: string;
    post_date: string;
    customerId: number;
    status: boolean;
}

function BlogPage() {
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [customerMap, setCustomerMap] = useState<Map<number, string>>(new Map());
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    // Fetch all blogs on component mount
    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const [allBlogs, customerMap] = await Promise.all([
                    getAllBlogs(),
                    getCustomerMap()
                ]);
                const activeBlogs = allBlogs.filter(blog => blog.status === true);
                setBlogs(activeBlogs);
                setFilteredBlogs(activeBlogs);
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
        setCurrentPage(1); // Reset to first page when searching
    };

    const handleViewBlog = (blogId: number) => {
        navigate(`/blog/${blogId}`);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const paginatedBlogs = filteredBlogs.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    return (
        <div style={{ padding: '70px', backgroundColor: '#1e1e1e' }}>
            <Title level={2} style={{ textAlign: 'center', marginBottom: '30px', color: 'white' }}>Bài Viết</Title>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <Search
                    placeholder="Tìm kiếm blog"
                    onSearch={handleSearch}
                    enterButton
                    style={{ width: '300px' }}
                />
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => navigate('/addblog')}
                >
                    Thêm Blog
                </Button>
            </div>
            <Row gutter={[16, 16]}>
                {loading ? (
                    // Skeleton loading
                    Array.from({ length: pageSize }).map((_, index) => (
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
                    paginatedBlogs.map(blog => (
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
                                                Ngày đăng: {new Date(blog.post_date).toLocaleString('vi-VN')}
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
            <div style={{ marginTop: '30px', textAlign: 'center' }}>
                <Pagination
                    current={currentPage}
                    total={filteredBlogs.length}
                    pageSize={pageSize}
                    onChange={handlePageChange}
                    showSizeChanger={false}
                    style={{ color: 'white' }}
                />
            </div>
        </div>
    );
}

export default BlogPage;
