import React from "react";
import "./Nav.css";

const Nav = () => {
    return (
        <nav className="bg-blue-600 text-white shadow-md">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <div className="logo">
                    <img src="/coke.webp" alt="Logo" className="nav-logo"  />
                </div>
                <ul className="flex space-x-4">
                    <li>
                        <a href="/" className="nav-link hover:text-gray-200">
                            Home
                        </a>
                    </li>
                    <li>
                        <a href="/agregarproduct" className="nav-link hover:text-gray-200">
                            Products
                        </a>
                    </li>
                    <li>
                        <a href="/agregarcustomer" className="nav-link hover:text-gray-200">
                            Customers
                        </a>
                    </li>
                    <li>
                        <a href="/agregaremployee" className="nav-link hover:text-gray-200">
                            Employees
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Nav;
