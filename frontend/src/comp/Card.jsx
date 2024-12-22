import React from 'react';

const Card = ({ id, name, price, image, onDelete, onUpdate }) => {
  const handleUpdate = () => {
    const updatedProduct = {
      name: prompt("Enter new name", name),
      price: prompt("Enter new price", price),
      image: prompt("Enter new image URL", image),
    };
    if (updatedProduct.name && updatedProduct.price && updatedProduct.image) {
      onUpdate(id, updatedProduct);
    }
  };

  return (
    <div style={cardStyle}>
      <img src={image} alt={name} style={imageStyle} />
      <h2 style={titleStyle}>{name}</h2>
      <p style={priceStyle}>${price}</p>
      <button onClick={handleUpdate} style={buttonStyle}>Update</button>
      <button onClick={() => onDelete(id)} style={buttonStyle}>Delete</button>
    </div>
  );
};

const cardStyle = {
  border: '1px solid #ccc',
  borderRadius: '8px',
  padding: '16px',
  margin: '16px',
  textAlign: 'center',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  width: '200px',
};

const imageStyle = {
  width: '100%',
  height: '150px',
  objectFit: 'cover',
  borderRadius: '4px',
};

const titleStyle = {
  fontSize: '18px',
  margin: '8px 0',
};

const priceStyle = {
  fontSize: '16px',
  color: '#007bff',
};

const buttonStyle = {
  margin: '5px',
  padding: '8px 12px',
  borderRadius: '4px',
  border: 'none',
  backgroundColor: '#007bff',
  color: 'white',
  cursor: 'pointer',
};

export default Card;
