import { useEffect, useState } from 'react';
import { Form, Input, InputNumber, Button, Select, Upload, Modal } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductDetail, updateProduct, Product1 } from '../../services/ProductServices';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from '../../utils/firebase/firebase';

const { Option } = Select;

const AdminUpdateProduct = () => {
  const { id } = useParams<{ id: string }>(); // Lấy ID sản phẩm từ URL
  const [form] = Form.useForm();
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [productData, setProductData] = useState<Product1 | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      const product = await getProductDetail(id!);
      if (product) {
        setProductData(product);
        form.setFieldsValue({
          productName: product.productName,
          description: product.description,
          price: product.price,
          rentalPrice: product.rentalPrice,
          quantity: product.quantity,
          categoryId: product.categoryId,
          isRentable: product.isRentable,
        });
        setImageUrls(product.image.split(',')); // Giả định rằng image là chuỗi ngăn cách bằng dấu phẩy
      }
    };

    fetchProduct();
  }, [id, form]);

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
          setImageUrls(prevUrls => {
            const updatedUrls = [...prevUrls, downloadURL];
            console.log('Updated image URLs:', updatedUrls); // In ra URLs đã cập nhật
            return updatedUrls;
          });
          resolve(downloadURL);
        }
      );
    });
  };

  const handleConfirm = async () => {
    if (!productData) return;
    try {
      const updatedProductData = {
        ...productData,
        ...form.getFieldsValue(),
        image: imageUrls.join(','), // Nối URLs thành một chuỗi
      };
      console.log('Updated Product Data:', updatedProductData); // In ra dữ liệu sản phẩm đã cập nhật
      await updateProduct(id!, updatedProductData); // Gửi ID và dữ liệu sản phẩm đã cập nhật
      Modal.success({ title: 'Product updated successfully!' });
      navigate('/admin/manage-products'); // Chuyển hướng về trang danh sách sản phẩm
    } catch (error: any) {
      Modal.error({ title: 'Update product failed', content: error.message });
    }
  };

  return (
    <div style={{ padding: '70px' }}>
      <h1>Update Product</h1>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleConfirm}
      >
        <Form.Item label="Product Name" name="productName" rules={[{ required: true, message: 'Please enter product name' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Please enter description' }]}>
          <Input.TextArea />
        </Form.Item>

        <Form.Item label="Price" name="price" rules={[{ required: true, message: 'Please enter product price' }]}>
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item label="Rental Price" name="rentalPrice" rules={[{ required: true, message: 'Please enter rental price' }]}>
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item label="Quantity" name="quantity" rules={[{ required: true, message: 'Please enter quantity' }]}>
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item label="Category" name="categoryId" rules={[{ required: true, message: 'Please select a category' }]}>
          <Select>
            <Option value={1}>Leu</Option>
            <Option value={2}>Phu Kien</Option>
            <Option value={3}>Trang Bi</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Is Rentable" name="isRentable" rules={[{ required: true }]}>
          <Select>
            <Option value={true}>Yes</Option>
            <Option value={false}>No</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Product Images" name="imageUpload">
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
            <Button icon={<UploadOutlined />}>Upload Image</Button>
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
            Confirm
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AdminUpdateProduct;
