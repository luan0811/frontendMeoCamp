import React, { useState, useEffect } from 'react';
import { Table, Space, Button, Modal, message } from 'antd';
import { getAllCustomer } from '../../services/AuthServices';
import { ColumnsType } from 'antd/es/table';

interface Customer {
    id: number;
    username: string;
    email: string;
    phoneNumber: string;
    fullname: string;
    address: string;
    role: string;
}

function AdminGetAllUsers() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            setLoading(true);
            const data = await getAllCustomer();
            setCustomers(data);
        } catch (error) {
            message.error('Không thể tải danh sách khách hàng');
        } finally {
            setLoading(false);
        }
    };

    // const handleDelete = (id: number) => {
    //     Modal.confirm({
    //         title: 'Bạn có chắc chắn muốn xóa khách hàng này?',
    //         content: 'Hành động này không thể hoàn tác.',
    //         onOk() {
    //             // Implement delete logic here
    //             message.success('Đã xóa khách hàng');
    //         },
    //     });
    // };

    const columns: ColumnsType<Customer> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Tên đăng nhập',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: 'Họ tên',
            dataIndex: 'fullname',
            key: 'fullname',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Vai trò',
            dataIndex: 'role',
            key: 'role',
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="primary" onClick={() => message.info('Chức năng chỉnh sửa chưa được triển khai')}>
                        Chỉnh sửa
                    </Button>
                    {/* <Button danger onClick={() => handleDelete(record.id)}>
                        Xóa
                    </Button> */}
                </Space>
            ),
        },
    ];

    return (
        <div style={{ padding: '70px' }}>
            <h1>Danh sách khách hàng</h1>
            <Table 
                columns={columns} 
                dataSource={customers} 
                rowKey="id"
                loading={loading}
                pagination={{ pageSize: 10 }}
            />
        </div>
    );
}

export default AdminGetAllUsers;