import React, { useState } from 'react';
import { Search, MapPin, Loader2 } from 'lucide-react';

export const LocationInput = ({ onLocationSelect }) => {
  const [cityInput, setCityInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cityInput.trim()) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onLocationSelect({
        city: cityInput.trim(),
        country: null,
        lat: null,
        lon: null
      });
      setIsLoading(false);
    }, 500);
  };

  const quickCities = [
    'New York', 'London', 'Tokyo', 'Paris', 'Delhi', 'Mumbai', 'Kolkata', 'Bangalore'
  ];

  const handleQuickSelect = (city) => {
    setCityInput(city);
    onLocationSelect({
      city,
      country: null,
      lat: null,
      lon: null
    });
  };

  return (
    <div className="space-y-6">
      {/* Search Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={cityInput}
            onChange={(e) => setCityInput(e.target.value)}
            placeholder="Enter city name (e.g., New York, London, Delhi)"
            className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white"
            disabled={isLoading}
          />
        </div>
        
        <button
          type="submit"
          disabled={!cityInput.trim() || isLoading}
          className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center space-x-2 cursor-pointer"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Getting Air Quality Data...</span>
            </>
          ) : (
            <>
              <MapPin className="w-5 h-5" />
              <span>Get Air Quality Data</span>
            </>
          )}
        </button>
      </form>

      {/* Quick Select Cities */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Select</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {quickCities.map((city) => (
            <button
              key={city}
              onClick={() => handleQuickSelect(city)}
              disabled={isLoading}
              className="bg-white hover:bg-blue-50 border-2 border-gray-200 hover:border-blue-300 text-gray-700 hover:text-blue-700 font-medium py-3 px-4 rounded-lg transition-all duration-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {city}
            </button>
          ))}
        </div>
      </div>

      {/* Location Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start space-x-3">
          <MapPin className="w-5 h-5 text-blue-500 mt-0.5" />
          <div>
            <h4 className="text-blue-900 font-medium mb-1">Location Tips</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Enter major city names for best results</li>
              <li>• Try variations like "New York City" or "NYC"</li>
              <li>• Include country name for smaller cities</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};