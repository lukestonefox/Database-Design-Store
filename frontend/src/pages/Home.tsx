import React, { useState } from "react";
import ProductsRegister from "../ProductsRegister";

const Home: React.FC = () => {
  const [version, setVersion] = useState<string>('');

  const getVersion = () => {
    fetch('http://localhost:3000/version')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        console.log(response);
        return response.json();
      })
      .then(data => {
        setVersion(data[0].version); // Adjust based on your response structure
        console.log(data[0].version);
      })
      .catch(error => console.error('There was a problem with the fetch operation:', error));
  };

  return (  
    <div>
      <div>
        <h1 style={{fontWeight: 'bold', fontSize: '32px', paddingTop: '50px'}}>Products:</h1>
      </div>
      <div style={{paddingLeft: '20px'}}>
        <ProductsRegister></ProductsRegister>
      </div>
    </div>
  );
};

export default Home;
