import React from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "./context/UserContext";

const NavBar: React.FC = () => {
    const { role } = useUserContext();
    if (role !== 'guest') {
        return (
            <header>
                <nav className="flex w-screen h-12 bg-blue-400">
                    <div className="flex items-center justify-between w-full px-6">
                        <Link to="/home" className="px-4 text-white">Home</Link>
                        <Link to="/warehouse" className="px-4 text-white">Warehouse</Link>
                        <Link to="/profile" className="px-4 text-white">Profile</Link>
                        <Link to="/checkout" className="px-4 text-white">Checkout</Link>
                        <Link to="/login" className="px-4 text-white">Login</Link>
                    </div>
                </nav>
            </header>
        )}
}

export default NavBar
