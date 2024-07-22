import React, { useState } from "react";
import ProductsRegister from "../ProductsRegister";
import { Product } from "../types";

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])

  const getProducts = () => {
    fetch('http://localhost:3000/product')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json();
      })
      .then(data => {
        setProducts(data);
        console.log(data);
      })
      .catch(error => console.error('There was a problem with the fetch operation:', error));
  };

  return (  
    <div style={{paddingTop: '50px'}}>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <button className="px-4 py-2 text-white bg-blue-500 rounded-md" onClick={getProducts}>Get Products</button>
      </div>
      <div style={{paddingLeft: '20px'}}>
        <ProductsRegister products={products}></ProductsRegister>
      </div>
    </div>
  );
};

export default Home;
