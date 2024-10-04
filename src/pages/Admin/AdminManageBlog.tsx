import { useState, useEffect } from 'react';
import { Table, message } from 'antd';
import { getAllBlogs, getCustomerMap } from '../../services/BlogServices';

interface Blog {
  id: number;
  title: string;
  content: string;
  image: string;
  post_date: string;
  customerId: number;
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


  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
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

  ];

  return (
    <div style={{ padding: "70px" }}>
      <h1>Manage Blogs</h1>
      <Table columns={columns} dataSource={blogs} rowKey="id" />
    </div>
  );
}

export default AdminManageBlog;