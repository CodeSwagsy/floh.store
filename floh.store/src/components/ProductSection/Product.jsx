// Product.jsx
import React, { useState } from 'react';

const Product = ({ product }) => {
  const { id, name, description, price, image } = product;

  const [isHovered, setIsHovered] = useState(false);



  const imageStyle = {
    width: '165px',
    height: '165px',
    marginBottom: '10px',
    borderRadius: '5px',
  };

  const textStyle = {
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
    color: '#333',
  };

  const buttonStyle = {
    backgroundColor: isHovered ? '#00FF7F' : '#333333',
    color: 'white',
    padding: '10px 20px',
    marginTop: '15px',
    marginBottom: '10px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.5s ease, transform 0.5s ease', // Add smooth transition + color and scale
  };

  const handleViewDetails = () => {
    // Add logic to navigate to a detailed product page or show a modal
    alert(`View details for ${name}`);
  };

  return (
    <div
      style={productStyle} className="bg-whitesmoke flex flex-col items-center p-2.5 border rounded-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={image} alt={name} style={imageStyle} />
      <div style={textStyle}>
        <h3>{name}</h3>
        <p>{description}</p>
        <p style={{ fontWeight: 'bold' }}>{`Price: $${price}`}</p>
        <button style={buttonStyle} onClick={handleViewDetails}>
          View Details
        </button>
      </div>
    </div>
  );
};

export default Product;
