// ProductSections.jsx
import React from 'react';
import Product from './Product';

const ProductSections = ({ products }) => {
  const maxVisibleProducts = 5;

  const sectionStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#8AFFC4',
    overflowX: 'hidden',
    marginTop: '80px', 
  };

  const titleStyle = {
    fontSize: '24px',
    marginBottom: '10px',
  };

  const scrollableProductsStyle = {
    display: 'flex',
    gap: '10px',
    padding: '10px 0',
  };

  // Add event handlers to change overflow property on hover
  const handleMouseEnter = () => {
    sectionStyle.overflowX = 'auto';
  };

  const handleMouseLeave = () => {
    sectionStyle.overflowX = 'hidden';
  };

  return (
    <div
      style={sectionStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <h2 style={titleStyle}>New Products</h2>
      <div style={scrollableProductsStyle}>
        {products.slice(0, maxVisibleProducts).map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export { ProductSections };
