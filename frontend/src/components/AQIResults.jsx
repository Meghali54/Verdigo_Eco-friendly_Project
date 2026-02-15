import React from "react";
import {
  ArrowLeft,
  MapPin,
  Thermometer,
  Wind,
  Droplets,
  Eye,
  Gauge,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Activity,
  Calendar,
} from "lucide-react";
import {
  getAQIBgColor,
  getAQILevel,
  getHealthRecommendation,
} from "@/utils/AQICalculator";

export const AQIResults = ({ data, onBack }) => {
  const aqiLevel = getAQILevel(data.airQuality.aqi);
  // const aqiColor = getAQIColor(data.airQuality.aqi);
  const aqiBgColor = getAQIBgColor(data.airQuality.aqi);
  const healthRecommendation = getHealthRecommendation(data.airQuality.aqi);

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  const pollutants = [
    {
      name: "PM2.5",
      value: data.airQuality.pm25,
      unit: "μg/m³",
      icon: Activity,
    },
    {
      name: "PM10",
      value: data.airQuality.pm10,
      unit: "μg/m³",
      icon: Activity,
    },
    { name: "Ozone", value: data.airQuality.o3, unit: "μg/m³", icon: Activity },
    { name: "NO₂", value: data.airQuality.no2, unit: "μg/m³", icon: Activity },
    { name: "SO₂", value: data.airQuality.so2, unit: "μg/m³", icon: Activity },
    { name: "CO", value: data.airQuality.co, unit: "μg/m³", icon: Activity },
  ];

  return (
    <div className="min-h-screen bg-theme-gradient">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 animate-fade-in-up">
          <button
            onClick={onBack}
            className="btn btn-outline flex items-center"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-theme-primary">VerdiGo</h1>
            <p className="text-sm text-gray-500">Air Quality Report</p>
          </div>
          <div className="w-20"></div> {/* Spacer for centering */}
        </div>

        {/* Location Info */}
        <div
          className="card mb-6 animate-fade-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <MapPin className="w-6 h-6 text-theme-primary mr-3" />
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {data.location.city}
                  </h2>
                  {data.location.country && (
                    <p className="text-gray-600">{data.location.country}</p>
                  )}
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center text-gray-500 text-sm">
                  <Calendar className="w-4 h-4 mr-1" />
                  {formatDate(data.timestamp)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AQI Main Display */}
        <div
          className={`card mb-6 border-2 ${aqiBgColor} animate-fade-in-up`}
          style={{ animationDelay: "0.2s" }}
        >
          <div className="card-body text-center">
            <div className="mb-4">
              <div className="text-6xl font-bold ${aqiColor} mb-2">
                {data.airQuality.aqi}
              </div>
              <div className="text-xl font-semibold ${aqiColor} mb-2">
                {aqiLevel}
              </div>
              <div className="flex justify-center mb-4">
                {data.airQuality.aqi <= 100 ? (
                  <CheckCircle className="w-8 h-8 text-green-500" />
                ) : data.airQuality.aqi <= 200 ? (
                  <AlertTriangle className="w-8 h-8 text-orange-500" />
                ) : (
                  <XCircle className="w-8 h-8 text-red-500" />
                )}
              </div>
            </div>
            <div className="bg-white/50 rounded-lg p-4">
              <p className="text-gray-700 font-medium">Health Recommendation</p>
              <p className="text-gray-600 text-sm mt-1">
                {healthRecommendation}
              </p>
            </div>
          </div>
        </div>

        {/* Weather Conditions */}
        <div
          className="card mb-6 animate-fade-in-up"
          style={{ animationDelay: "0.3s" }}
        >
          <div className="card-body">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Weather Conditions
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <Thermometer className="w-8 h-8 text-red-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-800">
                  {data.weather.temperature}°C
                </div>
                <div className="text-sm text-gray-600">Temperature</div>
              </div>
              <div className="text-center">
                <Droplets className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-800">
                  {data.weather.humidity}%
                </div>
                <div className="text-sm text-gray-600">Humidity</div>
              </div>
              <div className="text-center">
                <Wind className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-800">
                  {data.weather.windSpeed} m/s
                </div>
                <div className="text-sm text-gray-600">Wind Speed</div>
              </div>
              <div className="text-center">
                <Gauge className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-800">
                  {data.weather.pressure} hPa
                </div>
                <div className="text-sm text-gray-600">Pressure</div>
              </div>
            </div>
          </div>
        </div>

        {/* Pollutant Details */}
        <div
          className="card mb-6 animate-fade-in-up"
          style={{ animationDelay: "0.4s" }}
        >
          <div className="card-body">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Pollutant Concentrations
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {pollutants.map((pollutant, index) => (
                <div
                  index={index}
                  key={pollutant.name}
                  className="bg-gray-50 rounded-lg p-4 text-center"
                >
                  <pollutant.icon className="w-6 h-6 text-theme-primary mx-auto mb-2" />
                  <div className="text-lg font-bold text-gray-800">
                    {pollutant.value}
                  </div>
                  <div className="text-xs text-gray-600">{pollutant.unit}</div>
                  <div className="text-sm font-medium text-gray-700 mt-1">
                    {pollutant.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div
          className="card animate-fade-in-up"
          style={{ animationDelay: "0.5s" }}
        >
          <div className="card-body">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Additional Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <Eye className="w-5 h-5 text-gray-500 mr-3" />
                <div>
                  <div className="font-medium text-gray-800">Visibility</div>
                  <div className="text-sm text-gray-600">
                    {data.weather.visibility} km
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <Activity className="w-5 h-5 text-theme-primary mr-3" />
                <div>
                  <div className="font-medium text-gray-800">
                    Air Quality Index
                  </div>
                  <div className="text-sm text-gray-600">
                    Based on EPA standards
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
