import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import NavBar from './NavBar';
import Login from './pages/Login';
import Warehouse from './pages/Warehouse';
import Checkout from './pages/Checkout';
import CreateAccount from './pages/CreateAccount';
import { useState } from 'react';
import { Product } from './types';
import StaffLogin from './pages/StaffLogin';
import { UserProvider } from './context/UserContext';

const Content: React.FC = () => {
  const [order, setOrder] = useState<Product[]>([]);

  const addToOrder = (product: Product) => {
    setOrder(prevOrder => prevOrder ? [...prevOrder, product] : [product]);
    console.log('Testing adding to order: ', order);
  };

  const removeFromOrder = (productId: number) => {
    setOrder(prevOrder => prevOrder.filter(p => p.productid !== productId));
    console.log('')
  };
  
  return (
      <Routes>
        <Route path="/home" element={<Home addToOrder={addToOrder} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/home" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/warehouse" element={<Warehouse />} />
        <Route path="/checkout" element={<Checkout order={order} removeFromOrder={removeFromOrder} />} />
        <Route path="/createAccount" element={<CreateAccount />} />
        <Route path="/staffLogin" element={<StaffLogin />} />
      </Routes>
  )

}

function App() {

  return (
    <UserProvider>
      <Router>
        <NavBar />
        <Content />
      </Router>
    </UserProvider>
  )
}

export default App
