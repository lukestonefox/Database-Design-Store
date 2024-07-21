import React from "react";

const NavBar: React.FC = () => {
    return (
        <header>
            <nav className="flex h-12 w-screen bg-blue-400 fixed">
                <div className="flex items-center justify-between w-full px-6">
                    <a href="/home" className="px-4 text-white">Home</a>
                    <a href="/warehouse" className="px-4 text-white">Warehouse</a>
                    <a href="/profile" className="px-4 text-white">Profile</a>
                    <a href="/checkout" className="px-4 text-white">Checkout</a>
                    <a href="/login" className="px-4 text-white">Login</a>
                </div>
            </nav>
        </header>
    )
}

export default NavBar
