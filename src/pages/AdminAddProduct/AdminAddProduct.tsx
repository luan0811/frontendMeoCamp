import { useState } from 'react';
import { Form, Input, InputNumber, Button, Select, Upload, Modal } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import AdminServices from '../../services/AdminServices';
import { app } from '../../utils/firebase/firebase';

const { Option } = Select;

interface ProductData {
    productName: string;
    description: string;
    price: number;
    rentalPrice: number;
    isRentable: boolean;
    categoryId: number;
    createdAt: string;
    updatedAt: string;
    status: boolean;
    image: string; // Lưu ý: nếu hình ảnh là nhiều, bạn có thể dùng array `string[]`
    quantity: number;
    rate: number;
}

const AddProductForm = () => {
    const [form] = Form.useForm();
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [previewVisible, setPreviewVisible] = useState(false);
    const [productData, setProductData] = useState<ProductData | null>(null);

    const handleUploadImage = async (file: File) => {
        const storage = getStorage(app);
        const storageRef = ref(storage, `images/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        return new Promise((resolve, reject) => {
            uploadTask.on(
                "state_changed",
                _snapshot => { },
                error => reject(error),
                async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    setImageUrls(prevUrls => [...prevUrls, downloadURL]); // Thêm URL vào mảng
                    resolve(downloadURL);
                }
            );
        });
    };

    const handlePreview = (values: any) => {
        const imagesString = imageUrls.join(','); // Nối các URL thành chuỗi
        setProductData({ ...values, image: imagesString, status: true } as ProductData);
        setPreviewVisible(true);
    };

    const handleConfirm = async () => {
        if (!productData) return;
        try {
            await AdminServices.addNewProduct(productData); // Gửi dữ liệu tới API với nhiều hình ảnh
            Modal.success({ title: 'Sản phẩm đã được thêm thành công!' });
            form.resetFields();
            setPreviewVisible(false);
            setImageUrls([]); // Reset lại sau khi thành công
        } catch (error: any) {
            Modal.error({ title: 'Thêm sản phẩm thất bại', content: error.message });
        }
    };

    return (
        <div style={{ padding: '70px' }}>
            <Form
                form={form}
                layout="vertical"
                onFinish={handlePreview}
            >
                <Form.Item label="Tên sản phẩm" name="productName" rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm' }]}>
                    <Input />
                </Form.Item>

                <Form.Item label="Mô tả" name="description" rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}>
                    <Input.TextArea />
                </Form.Item>

                <Form.Item label="Giá" name="price" rules={[{ required: true, message: 'Vui lòng nhập giá sản phẩm' }]}>
                    <InputNumber min={0} style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item label="Giá thuê" name="rentalPrice" rules={[{ required: true, message: 'Vui lòng nhập giá thuê' }]}>
                    <InputNumber min={0} style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item label="Số lượng" name="quantity" rules={[{ required: true, message: 'Vui lòng nhập số lượng' }]}>
                    <InputNumber min={0} style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item label="Danh mục" name="categoryId" rules={[{ required: true, message: 'Vui lòng chọn danh mục' }]}>
                    <Select>
                        <Option value={1}>Lều</Option>
                        <Option value={2}>Phụ kiện</Option>
                        <Option value={3}>Trang bị</Option>
                    </Select>
                </Form.Item>

                <Form.Item label="Có thể thuê" name="isRentable" rules={[{ required: true }]}>
                    <Select>
                        <Option value={true}>Có</Option>
                        <Option value={false}>Không</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Hình ảnh sản phẩm"
                    name="imageUpload"  // Thêm name để form quản lý giá trị
                    rules={[
                        {
                            required: true,
                            validator: (_, _value) => {
                                if (imageUrls.length > 0) {
                                    return Promise.resolve();
                                } else {
                                    return Promise.reject(new Error('Vui lòng tải lên ít nhất một hình ảnh!'));
                                }
                            },
                        },
                    ]}
                >
                    <Upload
                        customRequest={({ file, onSuccess }) => {
                            if (file instanceof File) {
                                handleUploadImage(file).then(onSuccess);
                            }
                        }}
                        listType="picture"
                        showUploadList={false}
                        multiple={true}
                    >
                        <Button icon={<UploadOutlined />}>Tải ảnh lên</Button>
                    </Upload>
                    {imageUrls.length > 0 && (
                        <div style={{ marginTop: '10px' }}>
                            {imageUrls.map((url, index) => (
                                <img key={index} src={url} alt={`Product ${index}`} style={{ width: '100px', marginRight: '10px' }} />
                            ))}
                        </div>
                    )}
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Xác nhận
                    </Button>
                </Form.Item>
            </Form>

            <Modal
                visible={previewVisible}
                title="Xác nhận thông tin sản phẩm"
                onCancel={() => setPreviewVisible(false)}
                onOk={handleConfirm}
            >
                {productData && (
                    <div>
                        <p><strong>Tên sản phẩm:</strong> {productData.productName}</p>
                        <p><strong>Mô tả:</strong> {productData.description}</p>
                        <p><strong>Giá:</strong> {productData.price}</p>
                        <p><strong>Giá thuê:</strong> {productData.rentalPrice}</p>
                        <p><strong>Số lượng:</strong> {productData.quantity}</p>
                        <p><strong>Danh mục:</strong> {productData.categoryId}</p>
                        <p><strong>Có thể thuê:</strong> {productData.isRentable ? 'Có' : 'Không'}</p>
                        {imageUrls.length > 0 && (
                            <div>
                                {imageUrls.map((url, index) => (
                                    <img key={index} src={url} alt={`Product ${index}`} style={{ width: '100px', marginRight: '10px' }} />
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default AddProductForm;
