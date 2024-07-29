import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "./context/UserContext";

const NavBar: React.FC = () => {
    const { role, setRole } = useUserContext();
    const navigate = useNavigate();

    function handleLogout() {
        setRole('guest');
        navigate('/login');
    }

    if (role !== 'guest') {
        return (
            <header>
                <nav className="flex w-screen h-12 bg-blue-400">
                    <div className="flex items-center justify-between w-full px-6">
                        <Link to="/home" className="px-4 text-white">Home</Link>
                        <Link to="/warehouse" className="px-4 text-white">Warehouse</Link>
                        <Link to="/profile" className="px-4 text-white">Profile</Link>
                        <Link to="/checkout" className="px-4 text-white">Checkout</Link>
                        <button onClick={handleLogout} className="px-4 text-white">Sign Out</button>
                    </div>
                </nav>
            </header>
        )}
}

export default NavBar
