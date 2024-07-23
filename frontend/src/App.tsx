import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import NavBar from './NavBar';
import Login from './pages/Login';
import Warehouse from './pages/Warehouse';
import Checkout from './pages/Checkout';
import CreateAccount from './pages/CreateAccount';

const Content: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/home" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/warehouse" element={<Warehouse />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/createAccount" element={<CreateAccount />} />
      </Routes>
    </Router>
  )

}

function App() {

  return (
    <>
      <NavBar />
      <Content />
    </>
  )
}

export default App
