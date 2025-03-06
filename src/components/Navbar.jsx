import React from 'react';
import { NavLink } from 'react-router-dom';
import { Cloud, Dog, Film, Home } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-gray-900 to-gray-700 text-white shadow-md py-4">
      <div className="container mx-auto flex items-center justify-between px-6">
        <NavLink to="/" className="text-4xl font-extrabold text-red-500 tracking-wide">
          API Explorer
        </NavLink>
        <div className="flex space-x-6">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `flex items-center px-4 py-2 rounded-lg text-lg font-medium transition-all duration-300 ${
                isActive 
                  ? 'bg-red-500 text-white shadow-lg scale-105' 
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`
            }
          >
            <Home className="mr-2 h-5 w-5" /> Home
          </NavLink>
          <NavLink 
            to="/weather" 
            className={({ isActive }) => 
              `flex items-center px-4 py-2 rounded-lg text-lg font-medium transition-all duration-300 ${
                isActive 
                  ? 'bg-blue-500 text-white shadow-lg scale-105' 
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`
            }
          >
            <Cloud className="mr-2 h-5 w-5" /> Weather
          </NavLink>
          <NavLink 
            to="/dogs" 
            className={({ isActive }) => 
              `flex items-center px-4 py-2 rounded-lg text-lg font-medium transition-all duration-300 ${
                isActive 
                  ? 'bg-yellow-500 text-white shadow-lg scale-105' 
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`
            }
          >
            <Dog className="mr-2 h-5 w-5" /> Dogs
          </NavLink>
          <NavLink 
            to="/movies" 
            className={({ isActive }) => 
              `flex items-center px-4 py-2 rounded-lg text-lg font-medium transition-all duration-300 ${
                isActive 
                  ? 'bg-purple-500 text-white shadow-lg scale-105' 
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`
            }
          >
            <Film className="mr-2 h-5 w-5" /> Movies
          </NavLink> 
        </div>
      </div>
    </nav>
  );
};

export default Navbar;