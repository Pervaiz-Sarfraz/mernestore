import { useEffect } from 'react';
import { useProductStore } from '../src/store/product';
import Card from './comp/Card';

const Main = () => {
  const { products, fetchProducts, deleteProduct, updateProduct } = useProductStore();
console.log('products',products);

  useEffect(() => {
    const fetchData = async () => {
      await fetchProducts();
    };
    fetchData();
  }, [fetchProducts]);

  return (
    <div style={containerStyle}>
      {products?.map((product) => (
        <Card
          key={product._id}
          id={product._id}
          name={product.name}
          price={product.price}
          image={product.image}
          onDelete={deleteProduct}
          onUpdate={updateProduct}
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
