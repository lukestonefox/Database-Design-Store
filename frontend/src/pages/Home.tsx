import React, { useState } from "react";

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
        console.log(data);
      })
      .catch(error => console.error('There was a problem with the fetch operation:', error));
  };

  return (
    <div className="flex flex-col items-center justify-between w-full h-full">
      <p className="">Store?</p>
      <button className="px-4 py-2 text-white bg-blue-500 rounded-md" onClick={getVersion}>
        Get Version
      </button>
      <div>{version}</div>
    </div>
  );
};

export default Home;
