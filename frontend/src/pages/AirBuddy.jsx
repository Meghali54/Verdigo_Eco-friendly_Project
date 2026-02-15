/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { Wind, RefreshCw, AlertTriangle, Loader2 } from "lucide-react";
import { Button } from "../components/ui/button";
import ThemeToggle from "../components/ThemeToggle";
import { LocationDetector } from "../components/airbuddy/LocationDetector";
import { AQIHeader } from "../components/airbuddy/AQIHeader";
import { PollutantGrid } from "../components/airbuddy/PollutantGrid";
import { HealthAdvisory } from "../components/airbuddy/HealthAdvisory";
import { TrendChart } from "../components/airbuddy/TrendChart";
import { LoadingSkeleton } from "../components/airbuddy/LoadingSkeleton";
import {
  getAQIData,
  getAQIByCity,
  convertToStandardAQI,
  generateMockAQIData,
} from "../lib/api/airbuddy";

function AirBuddy() {
  const [aqiData, setAqiData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);

  // Auto-detect location on component mount

  useEffect(() => {
    const handleAutoDetect = async () => {
      setLoading(true);
      setError(null);

      try {
        const { getCurrentLocation } = await import("../lib/api/airbuddy");
        const location = await getCurrentLocation();
        await fetchAQIData(location);
      } catch (err) {
        setError(err.message);
        // Use mock data as fallback
        const mockData = generateMockAQIData();
        processAQIData(mockData);
      } finally {
        setLoading(false);
      }
    };

    handleAutoDetect();
  }, []);

  const handleLocationDetected = async (location) => {
    setLoading(true);
    setError(null);

    try {
      if (location.city) {
        await fetchAQIDataByCity(location.city);
      } else {
        await fetchAQIData(location);
      }
    } catch (err) {
      setError(err.message);
      // Use mock data as fallback
      const mockData = generateMockAQIData(location);
      processAQIData(mockData);
    } finally {
      setLoading(false);
    }
  };

  const fetchAQIData = async (location) => {
    try {
      const data = await getAQIData(location.lat, location.lon);
      processAQIData(data);
    } catch (err) {
      console.error("Error fetching AQI data:", err);
      throw new Error("Failed to fetch AQI data");
    }
  };

  const fetchAQIDataByCity = async (cityName) => {
    try {
      const data = await getAQIByCity(cityName);
      processAQIData(data);
    } catch (err) {
      console.error("Error fetching AQI data by city:", err);
      throw new Error(`Failed to fetch data for ${cityName}`);
    }
  };

  const processAQIData = (data) => {
    const current = data.current.list[0];
    const aqi = convertToStandardAQI(current.main.aqi, current.components);

    setAqiData({
      aqi,
      pollutants: current.components,
      location: data.location,
      history: data.history.list,
      lastUpdated: new Date().toLocaleTimeString(),
    });

    setCurrentLocation(data.location);
  };

  const handleRefresh = () => {
    if (currentLocation) {
      handleLocationDetected(currentLocation);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="bg-card shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-500 to-green-500 p-3 rounded-xl">
                <Wind className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">AirBuddy</h1>
                <p className="text-muted-foreground">
                  Real-time air quality monitoring
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              {aqiData && (
                <Button
                  onClick={handleRefresh}
                  disabled={loading}
                  className="flex items-center gap-2"
                >
                  <RefreshCw
                    className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
                  />
                  Refresh
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Location Detector */}
        {!aqiData && !loading && (
          <LocationDetector
            onLocationDetected={handleLocationDetected}
            onError={setError}
          />
        )}

        {/* Loading State */}
        {loading && <LoadingSkeleton />}

        {/* Error State */}
        {error && !aqiData && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-6 h-6 text-red-500" />
              <div>
                <h3 className="text-red-800 font-medium">Error</h3>
                <p className="text-red-600">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        {aqiData && (
          <div className="space-y-8">
            {/* AQI Header */}
            <AQIHeader
              aqi={aqiData.aqi}
              location={aqiData.location}
              lastUpdated={aqiData.lastUpdated}
            />

            {/* Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Pollutants and Health */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-4">
                    Pollutant Levels
                  </h3>
                  <PollutantGrid pollutants={aqiData.pollutants} />
                </div>
              </div>

              {/* Right Column - Health Advisory */}
              <div>
                <HealthAdvisory aqi={aqiData.aqi} />
              </div>
            </div>

            {/* Trend Chart */}
            <TrendChart historyData={aqiData.history} />
          </div>
        )}
      </div>
    </div>
  );
}

export default AirBuddy;
