import React, { useEffect } from 'react';
import { useProductStore } from '../src/store/product';
import Card from './comp/Card';

const Main = () => {
  const { products, fetchProducts, deleteProduct, updateProduct } = useProductStore();

  useEffect(() => {
    const fetchData = async () => {
      await fetchProducts(); // Fetch products from API
    };
    fetchData();
  }, [fetchProducts]);

  return (
    <div style={containerStyle}>
      {products.map((product) => (
        <Card
          key={product._id} // Assuming '_id' is the unique identifier
          id={product._id} // Pass the unique ID to the Card
          name={product.name}
          price={product.price}
          image={product.image}
          onDelete={deleteProduct} // Pass delete function
          onUpdate={updateProduct} // Pass update function
        />
      ))}
    </div>
  );
};

// Add some simple styles for the main container
const containerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  padding: '20px',
};

export default Main;
