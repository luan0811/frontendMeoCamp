import { useState, useEffect } from 'react';
import { Table, message, Button, Space, Popconfirm } from 'antd';
import { getAllBlogs, getCustomerMap, approveBlog, deleteBlogbyId } from '../../services/BlogServices';

interface Blog {
  id: number;
  title: string;
  content: string;
  image: string;
  post_date: string;
  customerId: number;
  status: boolean;
}

function AdminManageBlog() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [customerMap, setCustomerMap] = useState<Map<number, string>>(new Map());

  useEffect(() => {
    fetchBlogs();
    fetchCustomerMap();
  }, []);

  const fetchBlogs = async () => {
    try {
      const fetchedBlogs = await getAllBlogs();
      setBlogs(fetchedBlogs);
    } catch (error) {
      message.error('Failed to fetch blogs');
    }
  };

  const fetchCustomerMap = async () => {
    try {
      const map = await getCustomerMap();
      setCustomerMap(map);
    } catch (error) {
      message.error('Failed to fetch customer map');
    }
  };

  const handleApprove = async (id: number) => {
    try {
      await approveBlog(id);
      message.success('Blog approved successfully');
      fetchBlogs(); // Refresh the blog list
    } catch (error) {
      message.error('Failed to approve blog');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteBlogbyId(id);
      message.success('Blog deleted successfully');
      fetchBlogs(); // Refresh the blog list
    } catch (error) {
      message.error('Failed to delete blog');
    }
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image: string) => (
        <img src={image} alt="Blog" style={{ width: '100px', height: 'auto' }} />
      ),
    },
    {
      title: 'Content',
      dataIndex: 'content',
      key: 'content',
      ellipsis: true,
    },
    {
      title: 'Post Date',
      dataIndex: 'post_date',
      key: 'post_date',
    },
    {
      title: 'Author',
      dataIndex: 'customerId',
      key: 'customerId',
      render: (customerId: number) => customerMap.get(customerId) || 'Unknown',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: boolean) => status ? 'Approved' : 'Pending',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Blog) => (
        <Space>
          {!record.status && (
            <Button onClick={() => handleApprove(record.id)} type="primary">
              Approve
            </Button>
          )}
          <Popconfirm
            title="Are you sure you want to delete this blog?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: "70px" }}>
      <h1>Manage Blogs</h1>
      <Table columns={columns} dataSource={blogs} rowKey="id" />
    </div>
  );
}

export default AdminManageBlog;