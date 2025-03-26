// src/components/Header.tsx
import React from "react";
import { Link } from "react-router-dom";
import { ToledoColors } from "./ColorScheme";

const Header: React.FC = () => {
  return (
    <header
      className="py-4 shadow-md"
      style={{
        backgroundColor: ToledoColors.primary,
        color: ToledoColors.secondary,
      }}
    >
      <nav className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">UT Indoor Navigation</div>
        <ul className="flex space-x-6">
          <li>
            <Link
              to="/"
              className="hover:text-yellow-200 transition duration-300"
              style={{ color: ToledoColors.secondary }}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/maps"
              className="hover:text-yellow-200 transition duration-300"
              style={{ color: ToledoColors.secondary }}
            >
              Maps
            </Link>
          </li>
          <li>
            <Link
              to="/office-hours"
              className="hover:text-yellow-200 transition duration-300"
              style={{ color: ToledoColors.secondary }}
            >
              Office Hours
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
