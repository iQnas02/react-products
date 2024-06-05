import React, { useState, useEffect } from 'react';
import './App.css'

const AllProducts = ({ setProduct }) => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(response => response.json())
            .then(data => {
                setProducts(data);
                setFilteredProducts(data); // Set filtered products initially same as all products
            })
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    const filterProductsByCategory = (category) => {
        const filtered = products.filter(product => product.category === category);
        setFilteredProducts(filtered);
    };

    const handleProductClick = (product) => {
        setProduct(product);
    };

    return (
        <div className="background">
            <h2>All Products</h2>
            <div className="buttons">
                <button onClick={() => filterProductsByCategory('clothing')}>Clothes</button>
                <button onClick={() => filterProductsByCategory('jewelery')}>Jewelry</button>
                <button onClick={() => filterProductsByCategory('electronics')}>Electronics</button>
                <button onClick={() => setFilteredProducts(products)}>All products</button>
            </div>
            <div className="product-list d-flex flex-wrap border">
                {filteredProducts.map(product => (
                    <div className="border m-2 flex-grow-1" key={product.id} onClick={() => handleProductClick(product)}>
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
