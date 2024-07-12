import { useState } from "react";

function App() {
  const [version, setVersion] = useState('' as string)

  function getVersion() {
    fetch('http://localhost:5173')
      .then(response => response.json())
      .then(data => setVersion(data))
      .then(data => console.log(data))
      .then(() => console.log(version))

  }

  return (
    <div className="w-full flex flex-col items-center h-full justify-between">
      <p className="">Store?</p>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={getVersion}>Get Version</button>
      <div>{version}</div>
    </div>
  )
}

export default App
