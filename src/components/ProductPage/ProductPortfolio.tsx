import React from 'react';

interface ProductPortfolioProps {
  onSelectCategory: (type: string) => void;
}

const ProductPortfolio: React.FC<ProductPortfolioProps> = ({ onSelectCategory }) => {
  return (
    <div className="product-portfolio">
      <h2>Danh mục sản phẩm</h2>
      <ul>
        <li onClick={() => onSelectCategory('Tent')}>Lều</li>
        <li onClick={() => onSelectCategory('Accessory')}>Phụ kiện</li>
        <li onClick={() => onSelectCategory('Equipment')}>Trang bị</li>
        <li onClick={() => onSelectCategory('others')}>Các sản phẩm còn lại</li>
      </ul>
    </div>
  );
};

export default ProductPortfolio;
