import { useState, useEffect } from 'react';
import { Table, Space, Button, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { getAllContacts, deleteContact } from '../../services/ContactServices';

interface Contact {
    id: number;
    user_name: string;
    mail: string;
    phone: string;
    description: string;
}

function AdminManageContact() {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        try {
            const data = await getAllContacts();
            setContacts(data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteContact(id);
            setContacts(prevContacts => prevContacts.filter(contact => contact.id !== id));
            message.success('Contact deleted successfully');
        } catch (error) {
            console.error('Error deleting contact:', error);
            message.error('Xóa liên hệ thất bại');
        }
    };

    const columns = [
        {
            title: 'User Name',
            dataIndex: 'user_name',
            key: 'user_name',
        },
        {
            title: 'Email',
            dataIndex: 'mail',
            key: 'mail',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_text: string, record: Contact) => (
                <Space size="middle">
                    <Button 
                        type="primary" 
                        danger 
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(record.id)}
                    >
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <div style={{ padding: '70px' }}>
            <h1>Quản lý liên hệ</h1>
            <Table 
                columns={columns} 
                dataSource={contacts} 
                rowKey="id"
                loading={loading}
            />
        </div>
    );
}

export default AdminManageContact;