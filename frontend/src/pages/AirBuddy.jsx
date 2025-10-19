import React, { useState, useEffect } from "react";
import {
  Wind,
  Eye,
  Droplets,
  ThermometerSun,
  MapPin,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { LocationInput } from "../components/LocationInput";
import { generateMockData } from "../utils/mockData";
import ThemeToggle from "../components/ThemeToggle";

function AirBuddy() {
  const [currentData, setCurrentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLocationSelect = async (location) => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const data = generateMockData(location);
      setCurrentData(data);
    } catch (err) {
      setError("Failed to fetch air quality data");
    } finally {
      setLoading(false);
    }
  };

  const getAQIColor = (aqi) => {
    if (aqi <= 50) return "bg-green-500";
    if (aqi <= 100) return "bg-yellow-500";
    if (aqi <= 150) return "bg-orange-500";
    if (aqi <= 200) return "bg-red-500";
    if (aqi <= 300) return "bg-purple-500";
    return "bg-red-800";
  };

  const getAQILabel = (aqi) => {
    if (aqi <= 50) return "Good";
    if (aqi <= 100) return "Moderate";
    if (aqi <= 150) return "Unhealthy for Sensitive Groups";
    if (aqi <= 200) return "Unhealthy";
    if (aqi <= 300) return "Very Unhealthy";
    return "Hazardous";
  };

  const getAQIIcon = (aqi) => {
    if (aqi <= 50) return <CheckCircle className="w-6 h-6 text-green-500" />;
    if (aqi <= 100)
      return <AlertTriangle className="w-6 h-6 text-yellow-500" />;
    return <XCircle className="w-6 h-6 text-red-500" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-card shadow-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-500 to-green-500 p-3 rounded-xl">
                <Wind className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  Air Buddy
                </h1>
                <p className="text-muted-foreground">
                  Real-time air quality monitoring
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              {currentData && (
                <button
                  onClick={() => handleLocationSelect(currentData.location)}
                  disabled={loading}
                  className="flex items-center space-x-2 px-4 py-2 bg-primary hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground text-primary-foreground rounded-lg transition-colors"
                >
                  <RefreshCw
                    className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
                  />
                  <span>Refresh</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Location Input */}
        <div className="bg-card rounded-2xl shadow-xl border border-border p-6 mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-blue-500" />
            Select Location
          </h2>
          <LocationInput onLocationSelect={handleLocationSelect} />
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-card rounded-2xl shadow-xl border border-border p-12 text-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              <p className="text-muted-foreground text-lg">
                Fetching air quality data...
              </p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8">
            <div className="flex items-center space-x-3">
              <XCircle className="w-6 h-6 text-red-500" />
              <div>
                <h3 className="text-red-800 font-medium">Error</h3>
                <p className="text-red-600">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        {currentData && !loading && (
          <div className="space-y-8">
            {/* Current Location Info */}
            <div className="bg-card rounded-2xl shadow-xl border border-border p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-foreground flex items-center">
                  <MapPin className="w-6 h-6 mr-2 text-blue-500" />
                  {currentData.location.city}
                  {currentData.location.country && (
                    <span className="text-gray-500 font-normal ml-2">
                      , {currentData.location.country}
                    </span>
                  )}
                </h2>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Last updated</p>
                  <p className="text-sm font-medium text-gray-700">
                    {new Date(currentData.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>

            {/* AQI Main Card */}
            <div className="bg-card rounded-2xl shadow-xl border border-border overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-foreground">
                    Air Quality Index
                  </h3>
                  {getAQIIcon(currentData.airQuality.aqi)}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* AQI Score */}
                  <div className="text-center">
                    <div
                      className={`inline-flex items-center justify-center w-32 h-32 rounded-full ${getAQIColor(currentData.airQuality.aqi)} text-white mb-4`}
                    >
                      <span className="text-4xl font-bold">
                        {currentData.airQuality.aqi}
                      </span>
                    </div>
                    <h4 className="text-xl font-semibold text-foreground mb-2">
                      {getAQILabel(currentData.airQuality.aqi)}
                    </h4>
                    <p className="text-muted-foreground">
                      {currentData.airQuality.aqi <= 50
                        ? "Air quality is satisfactory and poses little or no risk."
                        : currentData.airQuality.aqi <= 100
                          ? "Air quality is acceptable, but may be a concern for sensitive individuals."
                          : "Air quality may be unhealthy for sensitive groups."}
                    </p>
                  </div>

                  {/* Health Recommendations */}
                  <div className="bg-muted rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-foreground mb-4">
                      Health Recommendations
                    </h4>
                    <div className="space-y-3">
                      {currentData.airQuality.aqi <= 50 ? (
                        <>
                          <div className="flex items-start space-x-3">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                            <p className="text-sm text-gray-700">
                              Perfect for outdoor activities
                            </p>
                          </div>
                          <div className="flex items-start space-x-3">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                            <p className="text-sm text-gray-700">
                              Open windows for fresh air
                            </p>
                          </div>
                        </>
                      ) : currentData.airQuality.aqi <= 100 ? (
                        <>
                          <div className="flex items-start space-x-3">
                            <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
                            <p className="text-sm text-gray-700">
                              Limit outdoor activities if sensitive
                            </p>
                          </div>
                          <div className="flex items-start space-x-3">
                            <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
                            <p className="text-sm text-gray-700">
                              Consider air purifiers indoors
                            </p>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex items-start space-x-3">
                            <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                            <p className="text-sm text-gray-700">
                              Avoid outdoor activities
                            </p>
                          </div>
                          <div className="flex items-start space-x-3">
                            <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                            <p className="text-sm text-gray-700">
                              Keep windows closed
                            </p>
                          </div>
                          <div className="flex items-start space-x-3">
                            <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                            <p className="text-sm text-gray-700">
                              Use N95 masks if going outside
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pollutant Details */}
            <div className="bg-card rounded-2xl shadow-xl border border-border p-6">
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Pollutant Breakdown
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* PM2.5 */}
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-purple-900">PM2.5</h4>
                    <div className="text-2xl font-bold text-purple-700">
                      {currentData.airQuality.pm25}
                    </div>
                  </div>
                  <p className="text-sm text-purple-600">
                    Fine particles µg/m³
                  </p>
                  <div className="mt-3 bg-purple-200 rounded-full h-2">
                    <div
                      className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min((currentData.airQuality.pm25 / 150) * 100, 100)}%`,
                      }}
                    ></div>
                  </div>
                </div>

                {/* PM10 */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-blue-900">PM10</h4>
                    <div className="text-2xl font-bold text-blue-700">
                      {currentData.airQuality.pm10}
                    </div>
                  </div>
                  <p className="text-sm text-blue-600">
                    Coarse particles µg/m³
                  </p>
                  <div className="mt-3 bg-blue-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min((currentData.airQuality.pm10 / 250) * 100, 100)}%`,
                      }}
                    ></div>
                  </div>
                </div>

                {/* Ozone */}
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-orange-900">O₃</h4>
                    <div className="text-2xl font-bold text-orange-700">
                      {currentData.airQuality.o3}
                    </div>
                  </div>
                  <p className="text-sm text-orange-600">Ozone µg/m³</p>
                  <div className="mt-3 bg-orange-200 rounded-full h-2">
                    <div
                      className="bg-orange-500 h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min((currentData.airQuality.o3 / 200) * 100, 100)}%`,
                      }}
                    ></div>
                  </div>
                </div>

                {/* NO2 */}
                <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6 border border-red-200">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-red-900">NO₂</h4>
                    <div className="text-2xl font-bold text-red-700">
                      {currentData.airQuality.no2}
                    </div>
                  </div>
                  <p className="text-sm text-red-600">Nitrogen dioxide µg/m³</p>
                  <div className="mt-3 bg-red-200 rounded-full h-2">
                    <div
                      className="bg-red-500 h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min((currentData.airQuality.no2 / 100) * 100, 100)}%`,
                      }}
                    ></div>
                  </div>
                </div>

                {/* SO2 */}
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-green-900">SO₂</h4>
                    <div className="text-2xl font-bold text-green-700">
                      {currentData.airQuality.so2}
                    </div>
                  </div>
                  <p className="text-sm text-green-600">Sulfur dioxide µg/m³</p>
                  <div className="mt-3 bg-green-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min((currentData.airQuality.so2 / 80) * 100, 100)}%`,
                      }}
                    ></div>
                  </div>
                </div>

                {/* CO */}
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-foreground">CO</h4>
                    <div className="text-2xl font-bold text-gray-700">
                      {currentData.airQuality.co}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Carbon monoxide mg/m³
                  </p>
                  <div className="mt-3 bg-muted rounded-full h-2">
                    <div
                      className="bg-gray-500 h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min((currentData.airQuality.co / 10) * 100, 100)}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Weather Information */}
            <div className="bg-card rounded-2xl shadow-xl border border-border p-6">
              <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                <ThermometerSun className="w-6 h-6 mr-2 text-orange-500" />
                Weather Conditions
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="bg-orange-100 rounded-full p-4 inline-flex mb-3">
                    <ThermometerSun className="w-8 h-8 text-orange-500" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">
                    {currentData.weather.temperature}°C
                  </div>
                  <div className="text-sm text-gray-500">Temperature</div>
                </div>

                <div className="text-center">
                  <div className="bg-blue-100 rounded-full p-4 inline-flex mb-3">
                    <Droplets className="w-8 h-8 text-blue-500" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">
                    {currentData.weather.humidity}%
                  </div>
                  <div className="text-sm text-gray-500">Humidity</div>
                </div>

                <div className="text-center">
                  <div className="bg-green-100 rounded-full p-4 inline-flex mb-3">
                    <Wind className="w-8 h-8 text-green-500" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">
                    {currentData.weather.windSpeed} km/h
                  </div>
                  <div className="text-sm text-gray-500">Wind Speed</div>
                </div>

                <div className="text-center">
                  <div className="bg-purple-100 rounded-full p-4 inline-flex mb-3">
                    <Eye className="w-8 h-8 text-purple-500" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">
                    {currentData.weather.visibility || "N/A"} km
                  </div>
                  <div className="text-sm text-gray-500">Visibility</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AirBuddy;
