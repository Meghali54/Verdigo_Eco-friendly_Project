import React, { useState, useEffect } from "react";
import {
  MapPin,
  Navigation,
  Award,
  Zap,
  ArrowRight,
  Star,
  Leaf,
  Truck,
  Users,
  Clock,
  Activity,
  CheckCircle2,
} from "lucide-react";
import { LocalHarvestSkeleton } from "./LocalHarvestSkeleton";

const transportModes = [
  { id: "driving", label: "Driving" },
  { id: "cycling", label: "Cycling" },
  { id: "walking", label: "Walking" },
  { id: "motorbike", label: "Motorbike" },
  { id: "transit", label: "Public Transport" },
];

const sustainabilityTags = [
  { id: "organic", label: "✅ Organic", filterKey: "Organic" },
  { id: "farm-direct", label: "🥬 Farm-direct", filterKey: "Farm-direct" },
  { id: "no-plastic", label: "🌾 No plastic", filterKey: "No plastic" },
  {
    id: "local-coop",
    label: "🚜 Local cooperative",
    filterKey: "Local cooperative",
  },
  { id: "seasonal", label: "🍎 Seasonal", filterKey: "Seasonal" },
  { id: "medicinal", label: "🌿 Medicinal", filterKey: "Medicinal" },
  { id: "raw-honey", label: "🍯 Raw honey", filterKey: "Raw honey" },
  { id: "sourdough", label: "🍞 Sourdough", filterKey: "Sourdough" },
];

export default function SideBarLocalHarvest({
  onRouteChange,
  harvestData,
  onTagFilterChange,
}) {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [selectedMode, setSelectedMode] = useState("driving");
  const [selectedTags, setSelectedTags] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [isLoadingData, setIsLoadingData] = useState(false);

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          // Fallback to San Francisco coordinates
          setUserLocation({ lat: 37.7749, lng: -122.4194 });
        },
      );
    } else {
      // Fallback location
      setUserLocation({ lat: 37.7749, lng: -122.4194 });
    }
  }, []);

  // Notify parent when tags change
  useEffect(() => {
    let timeout;

    if (selectedTags.length > 0) {
      setIsLoadingData(true);
      // Simulate loading for harvest data
      timeout = setTimeout(() => {
        setIsLoadingData(false);
      }, 1500);
    } else {
      // If all tags are cleared, ensure loading state is reset
      setIsLoadingData(false);
    }

    if (onTagFilterChange) {
      onTagFilterChange(selectedTags, userLocation);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
      // Ensure we never leave the sidebar stuck in a loading state
      setIsLoadingData(false);
    };
  }, [selectedTags, userLocation, onTagFilterChange]);

  const handlePlanRoute = () => {
    if (source && destination) {
      onRouteChange(source, destination, selectedMode);
    }
  };

  const handleTagSelect = (tag) => {
    setSelectedTags((prev) => {
      const isSelected = prev.some((t) => t.id === tag.id);
      if (isSelected) {
        return prev.filter((t) => t.id !== tag.id);
      } else {
        return [...prev, tag];
      }
    });
  };

  const clearAllTags = () => {
    setSelectedTags([]);
  };

  return (
    <div className="w-96 bg-card shadow-xl border-r border-border flex flex-col h-full overflow-y-auto scrollbar-hidden">
      {/* Route Planning */}
      <div className="p-6">
        <h2 className="text-lg font-semibold text-card-foreground mb-4">
          Plan Your Route
        </h2>

        <div className="space-y-4">
          <div className="relative">
            <MapPin className="w-5 h-5 text-green-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="From where?"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors"
            />
          </div>

          <div className="relative">
            <Navigation className="w-5 h-5 text-blue-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="To where?"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
            />
          </div>

          <button
            onClick={handlePlanRoute}
            disabled={!source || !destination}
            className="w-full py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-xl disabled:opacity-80 disabled:cursor-not-allowed transition-all"
          >
            Find Harvest Route
          </button>
        </div>
      </div>
      {/* Transport Mode Selection */}
      <div className="px-6 pb-6">
        <h2 className="text-lg font-semibold text-card-foreground mb-4">
          Mode
        </h2>

        <div className="relative">
          <select
            value={selectedMode}
            onChange={(e) => setSelectedMode(e.target.value)}
            className="w-full px-4 py-3 border-2 border-border rounded-xl focus:border-green-500 focus:outline-none transition-colors appearance-none bg-card text-card-foreground font-medium"
          >
            {transportModes.map((mode) => (
              <option key={mode.id} value={mode.id}>
                {mode.label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>
      {/* Sustainability Tags Filter */}
      <div className="px-6 pb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Leaf className="w-5 h-5 text-green-500" />
            <h2 className="text-lg font-semibold text-foreground">
              Sustainability Filter
            </h2>
          </div>
          {selectedTags.length > 0 && (
            <button
              onClick={clearAllTags}
              className="text-xs text-destructive hover:text-destructive/80 font-medium"
            >
              Clear All
            </button>
          )}
        </div>

        {selectedTags.length > 0 && (
          <div className="mb-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="text-xs text-yellow-700 mb-1 font-medium">
              🎯 {selectedTags.length} filter
              {selectedTags.length > 1 ? "s" : ""} active
            </div>
            <div className="flex flex-wrap gap-1">
              {selectedTags.map((tag) => (
                <span
                  key={tag.id}
                  className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full"
                >
                  {tag.label}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-2">
          {sustainabilityTags.map((tag) => {
            const isSelected = selectedTags.some((t) => t.id === tag.id);
            return (
              <button
                key={tag.id}
                onClick={() => handleTagSelect(tag)}
                className={`w-full p-3 rounded-xl border-2 transition-all duration-200 text-left group hover:shadow-md cursor-pointer ${
                  isSelected
                    ? "border-yellow-400 bg-yellow-50"
                    : "border-gray-200 hover:border-yellow-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3
                      className={`font-medium transition-colors ${
                        isSelected
                          ? "text-yellow-700"
                          : "text-gray-900 group-hover:text-yellow-700"
                      }`}
                    >
                      {tag.label}
                    </h3>
                  </div>
                  {isSelected ? (
                    <CheckCircle2 className="w-4 h-4 text-yellow-500" />
                  ) : (
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-yellow-500" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
      {/* Filtered Results */}
      {selectedTags.length > 0 && harvestData?.filteredPlaces && (
        <div className="px-6 pb-6">
          <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500" />
            Filtered Results ({harvestData.filteredPlaces.length})
          </h3>

          <div className="space-y-2 max-h-64 overflow-y-auto">
            {harvestData.filteredPlaces.slice(0, 5).map((place, index) => (
              <div
                key={place.id}
                className="p-3 bg-yellow-50 rounded-lg border border-yellow-200"
              >
                <div className="flex justify-between items-start mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-600 font-bold text-xs">
                      #{index + 1}
                    </span>
                    <h4 className="font-medium text-yellow-700 text-sm">
                      {place.name}
                    </h4>
                  </div>
                  <span className="text-xs text-gray-500">
                    {place.distanceFromUser} km
                  </span>
                </div>
                <p className="text-xs text-gray-600 mb-1">{place.type}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-yellow-500 text-xs">⭐</span>
                    <span className="text-xs ml-1">{place.rating}</span>
                  </div>
                  <span className="text-xs text-yellow-600 font-medium">
                    {place.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Real Data Status */}
      {userLocation && (
        <div className="px-6 pb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
              <span style={{ fontSize: "10px" }}>🗺️</span>
            </div>
            Data Source
          </h3>

          <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-blue-800">
                Real Data Source
              </span>
              <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded-full">
                🌍 OpenStreetMap
              </span>
            </div>
            <p className="text-xs text-blue-700">
              Showing real farms, markets, and organic stores from OpenStreetMap
              database within 15km of your location.
            </p>
          </div>

          <div className="mt-3 bg-green-50 p-4 rounded-xl border border-green-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-green-800">
                Location Detected
              </span>
              <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded-full">
                📍 Active
              </span>
            </div>
            <p className="text-xs text-green-700">
              Lat: {userLocation.lat.toFixed(4)}, Lng:{" "}
              {userLocation.lng.toFixed(4)}
            </p>
          </div>
        </div>
      )}

      {/* Filter Results or Loading */}
      {isLoadingData ? (
        <div className="px-6 pb-6">
          <LocalHarvestSkeleton />
        </div>
      ) : (
        harvestData && (
          <div className="px-6 pb-6">
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Leaf className="w-5 h-5 text-green-500" />
              Harvest Route Analysis
            </h2>

            <div className="space-y-3">
              <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-green-800">
                    Safest Route Selected
                  </span>
                  <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded-full">
                    🛡️ Safety Score: {harvestData.route?.safetyScore || 95}
                  </span>
                </div>
                <p className="text-xs text-green-700">
                  Your route has been optimized for safety and proximity to
                  local harvest spots.
                </p>
              </div>

              <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-blue-800">
                    Harvest Spots Found
                  </span>
                  <span className="text-lg font-bold text-blue-600">
                    {harvestData.totalSpots || 0}
                  </span>
                </div>
                <p className="text-xs text-blue-700">
                  Local farms and markets within 5km of your route.
                </p>
              </div>

              <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-yellow-800">
                    Average Distance
                  </span>
                  <span className="text-sm font-bold text-yellow-600">
                    {harvestData.averageDistance || 0} km
                  </span>
                </div>
                <p className="text-xs text-yellow-700">
                  Easy detours to fresh, local produce along your way.
                </p>
              </div>

              {harvestData.harvestPlaces &&
                harvestData.harvestPlaces.length > 0 && (
                  <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-purple-800">
                        Top Recommendation
                      </span>
                      <span className="text-xs bg-purple-200 text-purple-800 px-2 py-1 rounded-full">
                        ⭐ {harvestData.harvestPlaces[0].rating}
                      </span>
                    </div>
                    <p className="text-xs text-purple-700 font-medium">
                      {harvestData.harvestPlaces[0].name}
                    </p>
                    <p className="text-xs text-purple-600">
                      {harvestData.harvestPlaces[0].type} •{" "}
                      {harvestData.harvestPlaces[0].distanceFromRoute} km from
                      route
                    </p>
                  </div>
                )}
            </div>
          </div>
        )
      )}
      {/* Local Harvest Info */}
      <div className="px-6 pb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-500" />
          About Local Harvest
        </h2>

        <div className="space-y-3">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-3 rounded-xl">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <Leaf className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">
                  Sustainable Farming
                </h3>
                <p className="text-sm text-gray-600">
                  Supporting local farms that practice sustainable and organic
                  farming methods.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-yellow-50 p-3 rounded-xl">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Truck className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">
                  Fast Delivery
                </h3>
                <p className="text-sm text-gray-600">
                  Fresh produce delivered within 24 hours of harvest.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-50 to-green-50 p-3 rounded-xl">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Users className="w-4 h-4 text-yellow-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">
                  Community Impact
                </h3>
                <p className="text-sm text-gray-600">
                  Supporting local communities by connecting consumers with
                  farmers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Statistics */}
      <div className="px-6 pb-6 flex-1">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-yellow-500" />
          Statistics
        </h2>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-green-50 p-3 rounded-xl text-center">
            <div className="text-2xl font-bold text-green-600">150+</div>
            <div className="text-sm text-green-700">Local Farms</div>
          </div>
          <div className="bg-blue-50 p-3 rounded-xl text-center">
            <div className="text-2xl font-bold text-blue-600">50+</div>
            <div className="text-sm text-blue-700">Markets</div>
          </div>
          <div className="bg-yellow-50 p-3 rounded-xl text-center">
            <div className="text-2xl font-bold text-yellow-600">24hr</div>
            <div className="text-sm text-yellow-700">Delivery</div>
          </div>
          <div className="bg-purple-50 p-3 rounded-xl text-center">
            <div className="text-2xl font-bold text-purple-600">100%</div>
            <div className="text-sm text-purple-700">Fresh</div>
          </div>
        </div>
      </div>
    </div>
  );
}
