import React from 'react';
import { Link } from 'react-router-dom';
import { Cloud, Dog, Film } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6">
      <div className="text-center mb-12">
        <h1 className="text-6xl font-extrabold text-white drop-shadow-lg">Discover APIs</h1>
        <p className="text-xl text-gray-200 max-w-xl mx-auto mt-4">
          Unlock powerful APIs with interactive search, filtering, and pagination features.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full max-w-6xl">
        <Link 
          to="/weather" 
          className="group relative bg-white/20 backdrop-blur-lg shadow-xl rounded-3xl overflow-hidden transform hover:scale-105 transition-all p-8 flex flex-col items-center text-center"
        >
          <div className="bg-blue-500 p-5 rounded-full mb-6 group-hover:rotate-12 transition-all">
            <Cloud className="h-14 w-14 text-white" />
          </div>
          <h2 className="text-3xl font-semibold text-white">Weather API</h2>
          <p className="text-gray-200 mt-2">Real-time weather updates.</p>
        </Link>

        <Link 
          to="/movies" 
          className="group relative bg-white/20 backdrop-blur-lg shadow-xl rounded-3xl overflow-hidden transform hover:scale-105 transition-all p-8 flex flex-col items-center text-center"
        >
          <div className="bg-red-500 p-5 rounded-full mb-6 group-hover:rotate-12 transition-all">
            <Film className="h-14 w-14 text-white" />
          </div>
          <h2 className="text-3xl font-semibold text-white">Movie API</h2>
          <p className="text-gray-200 mt-2">Find and filter movies.</p>
        </Link>

        <Link 
          to="/dogs" 
          className="group relative bg-white/20 backdrop-blur-lg shadow-xl rounded-3xl overflow-hidden transform hover:scale-105 transition-all p-8 flex flex-col items-center text-center"
        >
          <div className="bg-yellow-500 p-5 rounded-full mb-6 group-hover:rotate-12 transition-all">
            <Dog className="h-14 w-14 text-white" />
          </div>
          <h2 className="text-3xl font-semibold text-white">Dog API</h2>
          <p className="text-gray-200 mt-2">Browse dog images.</p>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
