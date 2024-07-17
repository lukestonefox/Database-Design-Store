import React from "react";
import { useState } from "react";

const Home: React.FC = () => {

    const [version, setVersion] = useState('' as string)

  function getVersion() {
    fetch('/api')
      .then(response => response.json())
      .then(data => setVersion(data))
      .then(data => console.log(data))
      .then(() => console.log(version)), {mode: 'no-cors'}
  }

    return (
      <div className="flex flex-col items-center justify-between w-full h-full">
        <p className="">Store?</p>
        <button className="px-4 py-2 text-white bg-blue-500 rounded-md" onClick={getVersion}>Get Version</button>
        <div>{version}</div>
      </div>
    )
}

export default Home;