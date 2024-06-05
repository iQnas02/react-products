import React, { useState, useEffect } from 'react';
import './App.css'

const AllProducts = ({ setProduct }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data => setProducts(data))
        .catch(error => console.error('Error fetching products:', error));
  }, []);

  return (
      <div className="background">
        <h2>All Products</h2>
        <div className="product-list d-flex flex-wrap border">
          {products.map(product => (
              <div className="border m-2 flex-grow-1" key={product.id} onClick={() => setProduct(product)}>
                <img src={product.image} alt={product.title} />
                <p>{product.title}</p>
              </div>
          ))}
        </div>
      </div>
  );
};

const SingleProduct = ({ product, setProduct }) => {
  const handleBack = () => {
    setProduct(null);
  };

  return (
      <div>
        <h2>Product Details</h2>
        <button onClick={handleBack}>Back to All Products</button>
        <div>
          <img src={product.image} alt={product.title} />
          <p>{product.title}</p>
          <p>{product.description}</p>
          {/* Add other details you want to display */}
        </div>
      </div>
  );
};

const App = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
      <div>
        {selectedProduct ? (
            <SingleProduct product={selectedProduct} setProduct={setSelectedProduct} />
        ) : (
            <AllProducts setProduct={setSelectedProduct} />
        )}
      </div>
  );
};

export default App;
