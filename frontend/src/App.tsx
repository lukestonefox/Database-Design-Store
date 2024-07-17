import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';

const Content: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  )

}

function App() {

  return (
    <Content />
  )
}

export default App
