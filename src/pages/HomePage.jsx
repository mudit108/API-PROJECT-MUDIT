import React from 'react';
import { Link } from 'react-router-dom';
import { Cloud, Dog, Film } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col justify-center items-center text-white px-6">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold mb-4 text-white drop-shadow-md">Explore APIs</h1>
        <p className="text-lg text-gray-300 max-w-lg mx-auto">
          Discover powerful APIs with interactive search, filtering, and pagination features.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        <Link 
          to="/weather" 
          className="group bg-gray-700 hover:bg-gray-600 rounded-2xl shadow-lg transition-all transform hover:scale-105 p-6 flex flex-col items-center text-center"
        >
          <div className="bg-blue-500 p-4 rounded-full mb-4 transition-all group-hover:rotate-12">
            <Cloud className="h-12 w-12 text-white" />
          </div>
          <h2 className="text-2xl font-semibold mb-2">Weather API</h2>
          <p className="text-gray-300">Get real-time weather data with ease.</p>
        </Link>

        <Link 
          to="/dogs" 
          className="group bg-gray-700 hover:bg-gray-600 rounded-2xl shadow-lg transition-all transform hover:scale-105 p-6 flex flex-col items-center text-center"
        >
          <div className="bg-yellow-500 p-4 rounded-full mb-4 transition-all group-hover:rotate-12">
            <Dog className="h-12 w-12 text-white" />
          </div>
          <h2 className="text-2xl font-semibold mb-2">Dog API</h2>
          <p className="text-gray-300">Browse high-quality dog images by breed.</p>
        </Link>

        <Link 
          to="/movies" 
          className="group bg-gray-700 hover:bg-gray-600 rounded-2xl shadow-lg transition-all transform hover:scale-105 p-6 flex flex-col items-center text-center"
        >
          <div className="bg-red-500 p-4 rounded-full mb-4 transition-all group-hover:rotate-12">
            <Film className="h-12 w-12 text-white" />
          </div>
          <h2 className="text-2xl font-semibold mb-2">Movie API</h2>
          <p className="text-gray-300">Search for movies with advanced filtering.</p>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;