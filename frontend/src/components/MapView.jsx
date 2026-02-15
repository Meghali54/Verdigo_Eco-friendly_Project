/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapLoadingSkeleton } from "./MapLoadingSkeleton";

// Fix for default markers in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const MapView = ({ source, destination, mode, onRouteDataUpdate }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(0);
  const [loading, setLoading] = useState(false);
  const routeLayersRef = useRef([]);

  // Route color configuration
  const routeColors = ["#10B981", "#3B82F6", "#F59E0B", "#8B5CF6", "#EF4444"];

  // Initialize OpenStreetMap
  useEffect(() => {
    if (mapRef.current && !mapInstanceRef.current) {
      const map = L.map(mapRef.current).setView([37.7749, -122.4194], 13);

      // Add OpenStreetMap tiles
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
        maxZoom: 19,
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Clear existing routes
  const clearRoutes = () => {
    routeLayersRef.current.forEach((layer) => {
      mapInstanceRef.current.removeLayer(layer);
    });
    routeLayersRef.current = [];
  };

  // Calculate routes when source/destination changes

  useEffect(() => {
    if (source && destination && mapInstanceRef.current) {
      calculateRoutes();
    }
  }, [source, destination, mode, calculateRoutes]);

  const calculateRoutes = async () => {
    setLoading(true);
    clearRoutes();

    try {
      // Get coordinates for source and destination
      const sourceCoords = await geocodeAddress(source);
      const destCoords = await geocodeAddress(destination);

      if (!sourceCoords || !destCoords) {
        throw new Error("Could not geocode addresses");
      }

      // Get routes using OpenRouteService or OSRM
      const routesData = await getRoutesWithFallback(
        sourceCoords,
        destCoords,
        mode,
      );

      // Process routes with environmental data
      const processedRoutes = await Promise.all(
        routesData.map(async (route, index) => {
          const environmentalData = await calculateEnvironmentalData(
            route,
            mode,
          );
          const safetyScore = calculateSafetyScore(route);

          return {
            ...route,
            index,
            environmentalData,
            safetyScore,
            coordinates: route.geometry,
          };
        }),
      );

      // Sort by safety score (highest first)
      processedRoutes.sort((a, b) => b.safetyScore - a.safetyScore);

      // Display routes on map
      processedRoutes.forEach((route, index) => {
        const color = routeColors[index] || routeColors[routeColors.length - 1];
        const weight = index === 0 ? 6 : 4;
        const opacity = index === selectedRoute ? 1.0 : 0.7;

        const polyline = L.polyline(route.coordinates, {
          color: color,
          weight: weight,
          opacity: opacity,
        }).addTo(mapInstanceRef.current);

        routeLayersRef.current.push(polyline);

        // Add click event
        polyline.on("click", () => selectRoute(index));
      });

      // Add markers
      L.marker(sourceCoords)
        .addTo(mapInstanceRef.current)
        .bindPopup(`Start: ${source}`);
      L.marker(destCoords)
        .addTo(mapInstanceRef.current)
        .bindPopup(`End: ${destination}`);

      // Fit map to route bounds
      if (processedRoutes.length > 0) {
        const group = new L.featureGroup(routeLayersRef.current);
        mapInstanceRef.current.fitBounds(group.getBounds().pad(0.1));
      }

      setRoutes(processedRoutes);
      setSelectedRoute(0);

      // Pass data back to parent
      if (onRouteDataUpdate && processedRoutes.length > 0) {
        onRouteDataUpdate(processedRoutes[0].environmentalData);
      }
    } catch (error) {
      console.error("Error calculating routes:", error);
    } finally {
      setLoading(false);
    }
  };

  // Geocode address using Nominatim (OpenStreetMap's geocoding service)
  const geocodeAddress = async (address) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`,
      );
      const data = await response.json();

      if (data.length > 0) {
        return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
      }
      return null;
    } catch (error) {
      console.error("Geocoding error:", error);
      return null;
    }
  };

  // Main routing function with fallback strategy
  const getRoutesWithFallback = async (start, end, transportMode) => {
    try {
      // First try OpenRouteService (better routing)
      if (import.meta.env.VITE_OPENROUTE_API_KEY) {
        console.log("Trying OpenRouteService with API key...");
        const orsRoutes = await getOpenRouteServiceRoutes(
          start,
          end,
          transportMode,
        );

        if (orsRoutes && orsRoutes.length > 0) {
          console.log(
            "OpenRouteService success:",
            orsRoutes.length,
            "routes found",
          );
          return orsRoutes;
        }

        console.log(
          "OpenRouteService failed or no routes, falling back to OSRM...",
        );
      } else {
        console.log("No OpenRouteService API key, using OSRM...");
      }

      // Fallback to OSRM (free but limited)
      return await getOSRMRoutes(start, end, transportMode);
    } catch (error) {
      console.error("All routing services failed:", error);
      return [
        {
          geometry: [start, end],
          distance: getDistance(start, end) * 1000,
          duration: getDistance(start, end) * 60,
          summary: "Direct route",
        },
      ];
    }
  };

  // OpenRouteService routing (premium with API key)
  const getOpenRouteServiceRoutes = async (start, end, transportMode) => {
    try {
      console.log("OpenRouteService request:", { start, end, transportMode });

      const profile = getOpenRouteProfile(transportMode);
      const url = `https://api.openrouteservice.org/v2/directions/${profile}`;

      // Prepare request body with proper format
      const requestBody = {
        coordinates: [
          [start[1], start[0]],
          [end[1], end[0]],
        ], // [longitude, latitude] format
        format: "geojson",
        instructions: false,
        geometry_simplify: false,
      };

      // Only add alternative routes for driving (some profiles don't support alternatives)
      if (transportMode === "driving") {
        requestBody.alternative_routes = {
          target_count: 2,
          weight_factor: 1.4,
          share_factor: 0.6,
        };
      }

      console.log("Request URL:", url);
      console.log("Request body:", requestBody);

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: import.meta.env.VITE_OPENROUTE_API_KEY,
          Accept: "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("OpenRouteService error response:", errorText);

        // Try to parse error details
        try {
          const errorData = JSON.parse(errorText);
          console.error("Parsed error:", errorData);
        } catch (e) {
          console.error("Failed to parse error JSON:", e);
          console.error("Raw error text:", errorText);
        }

        throw new Error(`OpenRouteService API error: ${response.status}`);
      }

      const data = await response.json();
      console.log("OpenRouteService success:", data);

      if (data.features && data.features.length > 0) {
        return data.features.map((feature, index) => ({
          geometry: feature.geometry.coordinates.map((coord) => [
            coord[1],
            coord[0],
          ]), // Convert to [lat, lng]
          distance:
            feature.properties.summary?.distance ||
            feature.properties.segments?.[0]?.distance ||
            0,
          duration:
            feature.properties.summary?.duration ||
            feature.properties.segments?.[0]?.duration ||
            0,
          summary: `Route ${index + 1}`,
        }));
      }

      return [];
    } catch (error) {
      console.error("OpenRouteService error:", error);
      // Return null to trigger fallback to OSRM
      return null;
    }
  };

  // OSRM routing (free fallback)
  const getOSRMRoutes = async (start, end, transportMode) => {
    try {
      const profile = getOSRMProfile(transportMode);
      const url = `https://router.project-osrm.org/route/v1/${profile}/${start[1]},${start[0]};${end[1]},${end[0]}?alternatives=true&geometries=geojson&overview=full`;

      console.log("OSRM request URL:", url);

      const response = await fetch(url);
      const data = await response.json();

      console.log("OSRM response:", data);

      if (data.routes && data.routes.length > 0) {
        console.log("OSRM success:", data.routes.length, "routes found");
        return data.routes.map((route, index) => ({
          geometry: route.geometry.coordinates.map((coord) => [
            coord[1],
            coord[0],
          ]),
          distance: route.distance,
          duration: route.duration,
          summary: route.legs?.[0]?.summary || `Route ${index + 1}`,
        }));
      }

      console.log("OSRM also failed, returning direct route...");
      return [
        {
          geometry: [start, end],
          distance: getDistance(start, end) * 1000,
          duration: getDistance(start, end) * 60,
          summary: "Direct route",
        },
      ];
    } catch (error) {
      console.error("OSRM routing failed:", error);
      return [
        {
          geometry: [start, end],
          distance: getDistance(start, end) * 1000,
          duration: getDistance(start, end) * 60,
          summary: "Direct route",
        },
      ];
    }
  };

  const getOpenRouteProfile = (mode) => {
    const profileMap = {
      driving: "driving-car",
      walking: "foot-walking",
      cycling: "cycling-regular",
      motorbike: "driving-car",
      transit: "driving-car",
    };
    return profileMap[mode] || "driving-car";
  };

  const getOSRMProfile = (mode) => {
    const profileMap = {
      driving: "driving",
      walking: "foot",
      cycling: "cycling",
      motorbike: "driving",
      transit: "driving", // Fallback to driving
    };
    return profileMap[mode] || "driving";
  };

  // Calculate distance between two points (Haversine formula)
  const getDistance = (point1, point2) => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = ((point2[0] - point1[0]) * Math.PI) / 180;
    const dLon = ((point2[1] - point1[1]) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((point1[0] * Math.PI) / 180) *
        Math.cos((point2[0] * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const calculateEnvironmentalData = async (route, transportMode) => {
    const distance = route.distance / 1000; // Convert to km

    const emissionFactors = {
      driving: 0.21,
      motorbike: 0.113,
      cycling: 0,
      walking: 0,
      transit: 0.089,
    };

    const co2Emissions = (
      distance * (emissionFactors[transportMode] || 0.21)
    ).toFixed(2);
    const mockAQI = Math.floor(Math.random() * (150 - 50) + 50);
    const aqiCategory = getAQICategory(mockAQI);
    const ecoPoints = calculateEcoPoints(transportMode, distance);

    return {
      co2Emissions: parseFloat(co2Emissions),
      aqi: mockAQI,
      aqiCategory,
      ecoPoints,
      fuelConsumption:
        transportMode === "driving" ? (distance * 0.08).toFixed(2) : null,
    };
  };

  const calculateSafetyScore = (route) => {
    // Base safety score
    let safetyScore = 85;

    // Adjust based on route characteristics
    const distance = route.distance / 1000;
    if (distance > 50) safetyScore -= 5; // Long routes are potentially less safe
    if (distance < 5) safetyScore += 5; // Short routes are safer

    // Add some randomization for demo purposes
    safetyScore += Math.floor(Math.random() * 10) - 5;

    return Math.max(60, Math.min(100, safetyScore));
  };

  const getAQICategory = (aqi) => {
    if (aqi <= 50) return { category: "Good", color: "text-green-600" };
    if (aqi <= 100) return { category: "Moderate", color: "text-yellow-600" };
    if (aqi <= 150)
      return { category: "Unhealthy for Sensitive", color: "text-orange-600" };
    return { category: "Unhealthy", color: "text-red-600" };
  };

  const calculateEcoPoints = (mode, distance) => {
    const pointsPerKm = {
      walking: 10,
      cycling: 8,
      transit: 5,
      driving: 1,
      motorbike: 2,
    };

    return Math.round(distance * (pointsPerKm[mode] || 1));
  };

  const selectRoute = (routeIndex) => {
    setSelectedRoute(routeIndex);

    // Update route styling
    routeLayersRef.current.forEach((layer, index) => {
      const weight = index === routeIndex ? 6 : 4;
      const opacity = index === routeIndex ? 1.0 : 0.7;
      layer.setStyle({ weight, opacity });
    });

    // Update parent with selected route data
    if (onRouteDataUpdate && routes[routeIndex]) {
      onRouteDataUpdate(routes[routeIndex].environmentalData);
    }
  };

  const getRouteColorBadge = (index) => {
    if (index === 0)
      return { bg: "bg-green-500", text: "Safest Route", icon: "🛡️" };
    if (index === routes.length - 1 && routes.length > 1)
      return { bg: "bg-red-500", text: "Least Safe", icon: "⚠️" };
    return { bg: "bg-blue-500", text: `Route ${index + 1}`, icon: "🚗" };
  };

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const formatDistance = (meters) => {
    if (meters < 1000) {
      return `${Math.round(meters)}m`;
    }
    return `${(meters / 1000).toFixed(1)}km`;
  };

  return (
    <div className="flex-1 relative">
      {/* Always render the map container so Leaflet can initialize */}
      <div ref={mapRef} className="w-full h-full" />

      {/* Show full map skeleton as an overlay when initially loading or when no map instance */}
      {(!mapInstanceRef.current || (loading && routes.length === 0)) && (
        <div className="absolute inset-0 z-[1000]">
          <MapLoadingSkeleton />
        </div>
      )}

      {loading && (
        <div className="absolute top-4 left-4 bg-card rounded-lg shadow-lg p-3 z-[1000]">
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-500"></div>
            <span className="text-sm text-muted-foreground">
              Calculating routes...
            </span>
          </div>
        </div>
      )}
      {/* Route Legend */}
      {routes.length > 0 && (
        <div className="absolute top-4 left-4 bg-card rounded-lg shadow-lg p-3 z-[1000]">
          <h4 className="font-semibold text-foreground mb-2 text-sm">
            Route Colors
          </h4>
          <div className="space-y-1">
            {routes.map((_, index) => {
              const color =
                routeColors[index] || routeColors[routeColors.length - 1];
              const badge = getRouteColorBadge(index);
              return (
                <div
                  key={index}
                  className="flex items-center space-x-2 text-xs"
                >
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: color }}
                  ></div>
                  <span className="text-muted-foreground">{badge.text}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {routes.length > 0 && (
        <div className="absolute top-4 right-4 bg-card rounded-lg shadow-lg p-4 max-w-sm max-h-96 overflow-y-auto z-[1000]">
          <h3 className="font-semibold text-foreground mb-3">Route Options</h3>

          {routes.map((route, index) => {
            const color =
              routeColors[index] || routeColors[routeColors.length - 1];
            const badge = getRouteColorBadge(index);

            return (
              <div
                key={index}
                className={`p-3 rounded-lg cursor-pointer mb-2 transition-all border-2 ${
                  selectedRoute === index
                    ? "bg-accent border-border"
                    : "bg-muted border-border hover:bg-accent"
                }`}
                onClick={() => selectRoute(index)}
                style={{
                  borderLeftColor: color,
                  borderLeftWidth: "4px",
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`${badge.bg} text-white text-xs px-2 py-1 rounded-full font-medium`}
                  >
                    {badge.icon} {badge.text}
                  </span>
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: color }}
                  ></div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Duration:</span>
                    <div className="font-medium">
                      {formatDuration(route.duration)}
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Distance:</span>
                    <div className="font-medium">
                      {formatDistance(route.distance)}
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">CO₂:</span>
                    <div className="font-medium text-green-600">
                      {route.environmentalData.co2Emissions} kg
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Safety:</span>
                    <div
                      className={`font-medium ${
                        route.safetyScore >= 85
                          ? "text-green-600"
                          : route.safetyScore >= 75
                            ? "text-blue-600"
                            : route.safetyScore >= 65
                              ? "text-orange-600"
                              : "text-red-600"
                      }`}
                    >
                      {route.safetyScore}/100
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">AQI:</span>
                    <div
                      className={`font-medium ${route.environmentalData.aqiCategory.color}`}
                    >
                      {route.environmentalData.aqi}
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Eco Points:</span>
                    <div className="font-medium text-purple-600">
                      +{route.environmentalData.ecoPoints}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MapView;
