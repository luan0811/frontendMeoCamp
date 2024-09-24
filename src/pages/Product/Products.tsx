import { useEffect, useState } from 'react';
import { getAllProduct, Product1 } from '../../services/ProductServices'; // Use real API function
import { Pagination, Input } from 'antd';
import Title from 'antd/es/typography/Title';
import ProductPortfolio from '../../components/ProductPage/ProductPortfolio';
import ProductList from '../../components/ProductPage/ProductList';
import './Products.css'; // Import custom CSS for styling

import back from '../../assets/img/product.png'; // Background image

const { Search } = Input;

const Products = () => {
  const [products, setProducts] = useState<Product1[]>([]); // Adjusted to use Product1 type
  const [filteredProducts, setFilteredProducts] = useState<Product1[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12; // Number of products to display per page

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); // Start loading
      try {
        const fetchedProducts = await getAllProduct(); // Fetch real data
        setProducts(fetchedProducts);
        setFilteredProducts(fetchedProducts);
      } catch (error) {
        console.error('Error fetching products', error);
      } finally {
        setLoading(false); // Stop loading when products are fetched
      }
    };

    fetchProducts();
  }, []);

  const normalizeText = (text: string) => {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (value: string) => {
    const normalizedValue = normalizeText(value.toLowerCase());
    const filtered = products.filter(product =>
      normalizeText(product.productName.toLowerCase()).includes(normalizedValue)
    );
    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to first page after search
  };

  const handleCategorySelect = (type: string) => {
    const filtered = type === 'others'
      ? products.filter(product => !['tent', 'accessory', 'equipment'].includes(product.categoryId.toString()))
      : products.filter(product => product.categoryId.toString() === type);
    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div
      className="products-container"
      style={{
        backgroundColor: 'black',
        backgroundImage: `url(${back})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      <ProductPortfolio onSelectCategory={handleCategorySelect} />
      <div className="product-list">
        <Title level={2} style={{ textAlign: 'center', color: '#fff' }}>
          Tất cả sản phẩm
        </Title>
        <Search
          placeholder="Tìm kiếm sản phẩm"
          onSearch={handleSearch}
          style={{ marginBottom: '20px' }}
        />
        <ProductList products={currentProducts} loading={loading} />
        <Pagination
          current={currentPage}
          pageSize={productsPerPage}
          total={filteredProducts.length}
          onChange={handlePageChange}
          style={{ textAlign: 'center', marginTop: '20px', color: '#fff' }}
        />
      </div>
    </div>
  );
};

export default Products;
