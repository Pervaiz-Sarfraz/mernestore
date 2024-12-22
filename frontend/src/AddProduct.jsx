import React, { useState } from 'react';
import { useProductStore } from '../src/store/product';

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    image: null, // Change initial image to null
  });

  const { createProduct } = useProductStore();

  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);
    alert(message);
    if (success) {
      setNewProduct({ name: '', price: '', image: null }); // Reset form
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const blobUrl = URL.createObjectURL(file); // Create a blob URL for the image
      setNewProduct({ ...newProduct, image: blobUrl }); // Update the state with the blob URL
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h1 style={{ textAlign: 'center' }}>Create New Product</h1>
      <div>
        <label>
          Product Name:
          <input
            type="text"
            name="name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            style={{ width: '100%', padding: '8px', margin: '8px 0', borderRadius: '4px', border: '1px solid #ccc' }}
            required
          />
        </label>
        <br />
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            style={{ width: '100%', padding: '8px', margin: '8px 0', borderRadius: '4px', border: '1px solid #ccc' }}
            required
          />
        </label>
        <br />
        <label>
          Image Upload:
          <input
            type="file"
            name="image"
            accept="image/*" // Accept only image files
            onChange={handleImageChange}
            style={{ width: '100%', padding: '8px', margin: '8px 0', borderRadius: '4px', border: '1px solid #ccc' }}
            required
          />
        </label>
        <br />
        <button
          onClick={handleAddProduct}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Add Product
        </button>
      </div>
    </div>
  );
};

export default CreatePage;
