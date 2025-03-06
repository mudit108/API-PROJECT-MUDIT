import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Cloud, CloudRain, Thermometer, Wind, Droplets, Sun, MapPin } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import Loader from '../components/Loader';
import { fetchWeather } from '../store/slices/weatherSlice';

const WeatherPage = () => {
  const dispatch = useDispatch();
  const { data: weather, loading, error } = useSelector(state => state.weather);

  const handleSearch = (city) => {
    if (city) {
      dispatch(fetchWeather(city));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 text-white px-4">
      <div className="w-full max-w-2xl">
        <h1 className="text-4xl font-bold text-center mb-6">Weather Finder</h1>
        <SearchBar onSearch={handleSearch} className="text-black" placeholder="Search city..." />
      </div>

      {loading && <Loader />}
      {error && (
        <div className="bg-red-500 px-6 py-3 rounded-lg mt-4">{error}</div>
      )}

      {weather && !loading && (
        <div className="w-full max-w-lg bg-white text-gray-900 rounded-2xl shadow-lg p-6 mt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold flex items-center">
              <MapPin className="h-5 w-5 text-red-500 mr-2" />
              {weather.name}, {weather.sys.country}
            </h2>
            <div className="text-sm text-gray-500">
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          </div>

          <div className="flex flex-col items-center mt-4">
            <div className="text-6xl font-bold">{Math.round(weather.main.temp)}°C</div>
            <div className="capitalize text-gray-600 text-lg">{weather.weather[0]?.description}</div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="flex items-center bg-gray-100 p-4 rounded-lg">
              <Thermometer className="h-6 w-6 text-red-500 mr-3" />
              <div>
                <div className="text-gray-500 text-sm">Feels Like</div>
                <div className="font-medium">{Math.round(weather.main.feels_like)}°C</div>
              </div>
            </div>
            <div className="flex items-center bg-gray-100 p-4 rounded-lg">
              <Droplets className="h-6 w-6 text-blue-500 mr-3" />
              <div>
                <div className="text-gray-500 text-sm">Humidity</div>
                <div className="font-medium">{weather.main.humidity}%</div>
              </div>
            </div>
            <div className="flex items-center bg-gray-100 p-4 rounded-lg">
              <Wind className="h-6 w-6 text-gray-500 mr-3" />
              <div>
                <div className="text-gray-500 text-sm">Wind Speed</div>
                <div className="font-medium">{Math.round(weather.wind.speed * 3.6)} km/h</div>
              </div>
            </div>
            <div className="flex items-center bg-gray-100 p-4 rounded-lg">
              <Cloud className="h-6 w-6 text-gray-400 mr-3" />
              <div>
                <div className="text-gray-500 text-sm">Cloudiness</div>
                <div className="font-medium">{weather.clouds.all}%</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {!weather && !loading && !error && (
        <div className="bg-white text-gray-800 px-6 py-8 rounded-lg shadow-lg mt-6 text-center">
          <Cloud className="h-12 w-12 mx-auto mb-4 text-blue-500" />
          <h3 className="text-lg font-semibold">No Weather Data</h3>
          <p>Enter a city name above to get current weather information.</p>
        </div>
      )}
    </div>
  );
};

export default WeatherPage;
