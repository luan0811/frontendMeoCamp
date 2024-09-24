import React from 'react';

interface ProductPortfolioProps {
  onSelectCategory: (type: string) => void;
}

const ProductPortfolio: React.FC<ProductPortfolioProps> = ({ onSelectCategory }) => {
  return (
    <div className="product-portfolio">
      <h2>Danh mục sản phẩm</h2>
      <ul>
        <li onClick={() => onSelectCategory('1')}>Lều</li>
        <li onClick={() => onSelectCategory('2')}>Phụ kiện</li>
        <li onClick={() => onSelectCategory('3')}>Trang bị</li>
        <li onClick={() => onSelectCategory('others')}>Các sản phẩm còn lại</li>
      </ul>
    </div>
  );
};

export default ProductPortfolio;
