import React from "react";

const NavBar: React.FC = () => {
    return (
        <header>
            <nav className="h-4 bg-blue-400">
                <div>
                    <a href="/home" className="text-white">Home</a>
                    <a href="/profile" className="text-white">Profile</a>
                </div>
            </nav>
        </header>
    )
}

export default NavBar
