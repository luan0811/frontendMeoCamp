import { useEffect, useState } from "react";
import { Table, Button, Space, message, Modal } from "antd";
import { getAllProduct, deleteProduct, Product1 } from "../../services/ProductServices";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function AdminGetAllProduct() {
  const [products, setProducts] = useState<Product1[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedProduct, setSelectedProduct] = useState<Product1 | null>(null); // Sản phẩm được chọn để xóa
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false); // Trạng thái hiển thị modal
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProduct();
        setProducts(data);
      } catch (error) {
        message.error("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleNavigateUpdate = (id: number) => {
    navigate(`/admin/manage-products/update/${id}`); // Navigate to the update page
  };

  // Hiển thị modal xác nhận xóa
  const showDeleteConfirm = (product: Product1) => {
    setSelectedProduct(product);
    setIsModalVisible(true);
  };

  // Thực hiện soft delete sản phẩm
  const handleDelete = async () => {
    if (selectedProduct) {
      try {
        const deletedProduct = await deleteProduct(selectedProduct.id.toString());
        if (deletedProduct) {
          message.success(`Product ${selectedProduct.productName} has been set to inactive.`);
          // Cập nhật lại danh sách sản phẩm
          const updatedProducts = products.map((product) =>
            product.id === selectedProduct.id ? { ...product, status: false } : product
          );
          setProducts(updatedProducts);
        }
      } catch (error) {
        message.error("Failed to delete product");
      } finally {
        setIsModalVisible(false);
      }
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Rental Price",
      dataIndex: "rentalPrice",
      key: "rentalPrice",
    },
    {
      title: "Category",
      dataIndex: "categoryName",
      key: "categoryName",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (images: string) => {
        const imageArray = images.split(",");
        return (
          <div style={{ display: 'flex', gap: '5px' }}>
            {imageArray.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Product ${index + 1}`}
                style={{ width: "80px", height: "80px", objectFit: "cover" }}
              />
            ))}
          </div>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: boolean) => (status ? "Active" : "Inactive"),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: Product1) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleNavigateUpdate(record.id)}>Update</Button>
          <Button type="primary" danger onClick={() => showDeleteConfirm(record)}>Delete</Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: "70px" }}>
      <h1>Admin: Manage Products</h1>
      <Table
        columns={columns}
        dataSource={products}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />

      {/* Modal xác nhận xóa */}
      <Modal
        title="Confirm Delete"
        visible={isModalVisible}
        onOk={handleDelete}
        onCancel={() => setIsModalVisible(false)}
        okText="Yes"
        cancelText="No"
      >
        <p>Are you sure you want to set the product "{selectedProduct?.productName}" to inactive?</p>
      </Modal>
    </div>
  );
}

export default AdminGetAllProduct;
