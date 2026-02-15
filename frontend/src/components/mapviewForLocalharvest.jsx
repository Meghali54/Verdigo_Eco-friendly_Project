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

const MapViewLocalHarvest = ({
  source,
  destination,
  mode,
  selectedTags,
  userLocation,
  onHarvestDataUpdate,
}) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [harvestPlaces, setHarvestPlaces] = useState([]);
  const routeLayersRef = useRef([]);
  const harvestMarkersRef = useRef([]);

  // 🆕 NEW: OSM state management
  const [realHarvestData, setRealHarvestData] = useState([]);
  const [osmLoading, setOsmLoading] = useState(false);

  // 🆕 NEW: Fetch real harvest data from OpenStreetMap
  const fetchOSMHarvestData = async (location, radius = 15000) => {
    setOsmLoading(true);

    const query = `
      [out:json][timeout:30];
      (
        node["shop"="farm"](around:${radius},${location.lat},${location.lng});
        node["amenity"="marketplace"](around:${radius},${location.lat},${location.lng});
        node["shop"="organic"](around:${radius},${location.lat},${location.lng});
        node["shop"="greengrocer"](around:${radius},${location.lat},${location.lng});
        node["shop"="supermarket"]["organic"="yes"](around:${radius},${location.lat},${location.lng});
        node["landuse"="farmland"](around:${radius},${location.lat},${location.lng});
        way["landuse"="farmland"](around:${radius},${location.lat},${location.lng});
        node["amenity"="cafe"]["organic"="yes"](around:${radius},${location.lat},${location.lng});
        node["shop"="bakery"]["organic"="yes"](around:${radius},${location.lat},${location.lng});
        node["shop"="dairy"](around:${radius},${location.lat},${location.lng});
        node["craft"="beekeeper"](around:${radius},${location.lat},${location.lng});
      );
      out geom;
    `;

    try {
      console.log("🗺️ Fetching OSM data for location:", location);

      const response = await fetch("https://overpass-api.de/api/interpreter", {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
        },
        body: query,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("📊 OSM Raw Data:", data);

      const normalizedData = normalizeOSMData(data.elements || [], location);
      console.log("✅ Normalized Data:", normalizedData);

      return normalizedData;
    } catch (error) {
      console.error("❌ OSM API Error:", error);
      console.warn("🔄 Falling back to dummy data due to OSM API error");
      return getFallbackData(location);
    } finally {
      setOsmLoading(false);
    }
  };

  // 🆕 NEW: Normalize OSM data to your app's format
  const normalizeOSMData = (osmElements) => {
    return osmElements
      .filter((element) => element.lat && element.lon) // Only include elements with coordinates
      .map((element, index) => {
        const tags = element.tags || {};

        return {
          id: element.id || `osm_${index}`,
          name: tags.name || determineNameFromTags(tags),
          type: determineTypeFromOSM(tags),
          rating: generateRealisticRating(),
          lat: element.lat,
          lng: element.lon,
          tags: extractTagsFromOSM(tags),
          displayTags: formatDisplayTags(tags),
          price: generatePriceRange(tags),
          hours: tags.opening_hours || generateBusinessHours(),
          osmTags: tags, // Keep original OSM tags for reference
          source: "OpenStreetMap",
        };
      });
  };

  // 🆕 NEW: Helper functions for OSM data processing
  const determineNameFromTags = (tags) => {
    if (tags.name) return tags.name;
    if (tags.shop === "farm") return "Local Farm";
    if (tags.amenity === "marketplace") return "Farmers Market";
    if (tags.shop === "organic") return "Organic Store";
    if (tags.shop === "greengrocer") return "Green Grocer";
    if (tags.landuse === "farmland") return "Farmland";
    if (tags.shop === "dairy") return "Local Dairy";
    if (tags.craft === "beekeeper") return "Honey Farm";
    return "Local Harvest Spot";
  };

  const determineTypeFromOSM = (tags) => {
    const typeMap = {
      "shop=farm": "Farm Direct",
      "amenity=marketplace": "Farmers Market",
      "shop=organic": "Organic Store",
      "shop=greengrocer": "Fresh Produce",
      "shop=supermarket": "Organic Supermarket",
      "landuse=farmland": "Farm",
      "shop=bakery": "Organic Bakery",
      "amenity=cafe": "Organic Cafe",
      "shop=dairy": "Dairy Products",
      "craft=beekeeper": "Honey & Bee Products",
    };

    for (const [key, value] of Object.entries(typeMap)) {
      const [osmKey, osmValue] = key.split("=");
      if (tags[osmKey] === osmValue) return value;
    }

    return "Local Produce";
  };

  const extractTagsFromOSM = (tags) => {
    const sustainabilityTags = [];

    if (tags.organic === "yes" || tags.shop === "organic")
      sustainabilityTags.push("Organic");
    if (tags.local === "yes") sustainabilityTags.push("Local");
    if (tags.fair_trade === "yes") sustainabilityTags.push("Fair Trade");
    if (tags.shop === "farm") sustainabilityTags.push("Farm-direct");
    if (tags.amenity === "marketplace")
      sustainabilityTags.push("Farmers Market");
    if (tags.seasonal === "yes") sustainabilityTags.push("Seasonal");
    if (tags.zero_waste === "yes") sustainabilityTags.push("No plastic");
    if (tags.cooperative === "yes")
      sustainabilityTags.push("Local cooperative");
    if (tags.craft === "beekeeper") sustainabilityTags.push("Raw honey");
    if (tags.shop === "bakery") sustainabilityTags.push("Sourdough");
    if (tags.medicinal === "yes") sustainabilityTags.push("Medicinal");

    return sustainabilityTags.length > 0
      ? sustainabilityTags
      : ["Local", "Fresh"];
  };

  const formatDisplayTags = (tags) => {
    const displayMap = {
      Organic: "✅ Organic",
      Local: "🏠 Local",
      "Farm-direct": "🥬 Farm-direct",
      "Farmers Market": "🛒 Market",
      Seasonal: "🍎 Seasonal",
      "No plastic": "🌾 No plastic",
      "Local cooperative": "🚜 Cooperative",
      "Fair Trade": "🤝 Fair Trade",
      Fresh: "🥛 Fresh",
      "Raw honey": "🍯 Raw honey",
      Sourdough: "🍞 Sourdough",
      Medicinal: "🌿 Medicinal",
    };

    const extractedTags = extractTagsFromOSM(tags);
    return extractedTags.map((tag) => displayMap[tag] || `🌱 ${tag}`);
  };

  const generateRealisticRating = () => {
    // Generate realistic ratings between 3.5 and 5.0
    return (Math.random() * 1.5 + 3.5).toFixed(1);
  };

  const generatePriceRange = (tags) => {
    const priceRanges = {
      "shop=farm": "$2-6/lb",
      "amenity=marketplace": "$3-8/item",
      "shop=organic": "$4-12/item",
      "shop=greengrocer": "$1-5/lb",
      "shop=supermarket": "$3-10/item",
      "landuse=farmland": "$2-8/lb",
      "shop=bakery": "$2-8/item",
      "shop=dairy": "$4-12/item",
      "craft=beekeeper": "$8-15/jar",
    };

    for (const [key, price] of Object.entries(priceRanges)) {
      const [osmKey, osmValue] = key.split("=");
      if (tags[osmKey] === osmValue) return price;
    }

    return "$2-8/item";
  };

  const generateBusinessHours = () => {
    const hours = [
      "8AM-6PM",
      "7AM-7PM",
      "9AM-5PM",
      "6AM-8PM",
      "10AM-4PM",
      "8AM-5PM",
    ];
    return hours[Math.floor(Math.random() * hours.length)];
  };

  // 🆕 NEW: Fallback data function (your current dummy data)
  const getFallbackData = (location) => {
    console.log("🔄 Using fallback dummy data");
    return [
      {
        id: "fallback_1",
        name: "Green Valley Farm",
        type: "Organic Vegetables",
        rating: 4.8,
        lat: location.lat + 0.01,
        lng: location.lng + 0.01,
        tags: ["Organic", "Farm-direct"],
        displayTags: ["✅ Organic", "🥬 Farm-direct"],
        price: "$3-8/lb",
        hours: "8AM-6PM",
        source: "Fallback",
      },
      {
        id: "fallback_2",
        name: "Local Organic Market",
        type: "Farmers Market",
        rating: 4.6,
        lat: location.lat - 0.01,
        lng: location.lng - 0.01,
        tags: ["Organic", "Local cooperative"],
        displayTags: ["✅ Organic", "🚜 Local cooperative"],
        price: "$2-6/lb",
        hours: "7AM-7PM",
        source: "Fallback",
      },
    ];
  };

  // ⭐ EXISTING MAP INITIALIZATION
  useEffect(() => {
    if (mapRef.current && !mapInstanceRef.current) {
      const map = L.map(mapRef.current).setView([37.7749, -122.4194], 12);

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

  // 🆕 NEW: Load real harvest data when user location changes
  useEffect(() => {
    const loadRealHarvestData = async () => {
      if (userLocation && mapInstanceRef.current) {
        console.log("🗺️ Loading real harvest data for:", userLocation);

        try {
          const osmData = await fetchOSMHarvestData(userLocation, 15000); // 15km radius
          setRealHarvestData(osmData);

          // If no tags are selected, show all nearby places
          if (!selectedTags || selectedTags.length === 0) {
            setHarvestPlaces(osmData);
            displayAllHarvestPlaces(osmData);
          }

          console.log(`✅ Loaded ${osmData.length} harvest places from OSM`);
        } catch (error) {
          console.error("❌ Failed to load harvest data:", error);
        }
      }
    };

    loadRealHarvestData();
  }, [
    userLocation,
    fetchOSMHarvestData,
    displayAllHarvestPlaces,
    selectedTags,
  ]);

  // ⭐ EXISTING ROUTE CALCULATION
  useEffect(() => {
    if (source && destination && mapInstanceRef.current) {
      calculateHarvestRoute();
    }
  }, [source, destination, mode, calculateHarvestRoute]);

  // 🆕 UPDATED: Tag filtering effect with real data
  useEffect(() => {
    if (
      selectedTags &&
      selectedTags.length > 0 &&
      userLocation &&
      mapInstanceRef.current
    ) {
      // Use real OSM data instead of dummy data
      const dataToFilter =
        realHarvestData.length > 0
          ? realHarvestData
          : getFallbackData(userLocation);

      const filteredPlaces = filterPlacesByTags(
        dataToFilter,
        selectedTags,
        userLocation,
      );
      setHarvestPlaces(filteredPlaces);
      displayFilteredPlaces(filteredPlaces, userLocation);

      // Pass filtered data to parent
      if (onHarvestDataUpdate) {
        onHarvestDataUpdate({
          filteredPlaces: filteredPlaces,
          totalSpots: filteredPlaces.length,
          averageDistance:
            filteredPlaces.length > 0
              ? (
                  filteredPlaces.reduce(
                    (sum, place) => sum + parseFloat(place.distanceFromUser),
                    0,
                  ) / filteredPlaces.length
                ).toFixed(1)
              : 0,
        });
      }
    } else if (realHarvestData.length > 0) {
      // Show all places when no filters
      setHarvestPlaces(realHarvestData);
      displayAllHarvestPlaces(realHarvestData);
    }
  }, [
    selectedTags,
    userLocation,
    realHarvestData,
    displayAllHarvestPlaces,
    filterPlacesByTags,
    onHarvestDataUpdate,
  ]);

  // 🆕 NEW: Display all harvest places (not filtered)
  const displayAllHarvestPlaces = (places) => {
    // Clear existing markers
    harvestMarkersRef.current.forEach((marker) => {
      mapInstanceRef.current.removeLayer(marker);
    });
    harvestMarkersRef.current = [];

    // Add user location marker if available
    if (userLocation) {
      const userIcon = L.divIcon({
        html: `
          <div style="
            width: 24px; 
            height: 24px; 
            background: #3B82F6;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 3px solid white;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            font-size: 12px;
          ">
            📍
          </div>
        `,
        className: "user-location-marker",
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });

      const userMarker = L.marker([userLocation.lat, userLocation.lng], {
        icon: userIcon,
      }).addTo(mapInstanceRef.current).bindPopup(`
          <div style="text-align: center;">
            <h3 style="color: #3B82F6; font-weight: bold; margin-bottom: 4px;">Your Location</h3>
            <p style="color: #6B7280; font-size: 12px;">Current position</p>
          </div>
        `);

      harvestMarkersRef.current.push(userMarker);
    }

    // Add all harvest places with green markers (not filtered)
    places.forEach((place) => {
      const distance = userLocation
        ? getDistance(
            [userLocation.lat, userLocation.lng],
            [place.lat, place.lng],
          ).toFixed(1)
        : "N/A";

      const harvestIcon = L.divIcon({
        html: `
          <div style="
            width: 32px; 
            height: 32px; 
            background: linear-gradient(135deg, #10B981, #059669);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 3px solid white;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            font-size: 16px;
          ">
            🌾
          </div>
        `,
        className: "osm-harvest-marker",
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      const marker = L.marker([place.lat, place.lng], {
        icon: harvestIcon,
      }).addTo(mapInstanceRef.current).bindPopup(`
          <div style="min-width: 250px; border-radius: 8px;">
            <div style="background: linear-gradient(135deg, #10B981, #059669); padding: 10px; margin: -8px -8px 8px -8px; border-radius: 8px 8px 0 0;">
              <h3 style="color: white; font-weight: bold; margin: 0; font-size: 16px;">
                ${place.name}
              </h3>
              <div style="background: rgba(255,255,255,0.2); color: white; padding: 2px 6px; border-radius: 8px; display: inline-block; margin-top: 4px; font-size: 10px;">
                ${place.source || "OSM"}
              </div>
            </div>
            
            <p style="color: #6B7280; font-size: 14px; margin-bottom: 8px;">${place.type}</p>
            
            <div style="display: flex; align-items: center; margin-bottom: 8px; background: #F0FDF4; padding: 6px 8px; border-radius: 6px;">
              <span style="color: #F59E0B;">⭐</span>
              <span style="margin-left: 4px; font-size: 14px; font-weight: bold;">${place.rating}</span>
              <span style="margin-left: 12px; color: #10B981; font-size: 12px; font-weight: bold;">
                📍 ${distance} km away
              </span>
            </div>
            
            <div style="margin-bottom: 8px; background: #F9FAFB; padding: 6px 8px; border-radius: 6px;">
              <div style="font-size: 13px; color: #374151; margin-bottom: 2px;">
                <strong style="color: #10B981;">💰 Price:</strong> ${place.price}
              </div>
              <div style="font-size: 13px; color: #374151;">
                <strong style="color: #10B981;">🕒 Hours:</strong> ${place.hours}
              </div>
            </div>
            
            <div style="display: flex; flex-wrap: wrap; gap: 3px;">
              ${place.displayTags
                .map(
                  (tag) => `
                <span style="
                  background: #D1FAE5; 
                  color: #065F46; 
                  padding: 2px 6px; 
                  border-radius: 4px; 
                  font-size: 11px;
                  font-weight: 500;
                ">${tag}</span>
              `,
                )
                .join("")}
            </div>
          </div>
        `);

      harvestMarkersRef.current.push(marker);
    });

    // Fit map to show user location and nearby places
    if (harvestMarkersRef.current.length > 1) {
      const group = new L.featureGroup(harvestMarkersRef.current);
      mapInstanceRef.current.fitBounds(group.getBounds().pad(0.1));
    }
  };

  // 🆕 UPDATED: Filter places by sustainability tags with real data
  const filterPlacesByTags = (places, selectedTags, userLocation) => {
    if (selectedTags.length === 0) return [];

    const filtered = places.filter((place) => {
      return selectedTags.some((tag) =>
        place.tags.some((placeTag) =>
          placeTag.toLowerCase().includes(tag.filterKey.toLowerCase()),
        ),
      );
    });

    // Add distance from user location
    const placesWithDistance = filtered.map((place) => ({
      ...place,
      distanceFromUser: userLocation
        ? getDistance(
            [userLocation.lat, userLocation.lng],
            [place.lat, place.lng],
          ).toFixed(1)
        : "N/A",
    }));

    // Sort by distance from user
    return placesWithDistance.sort(
      (a, b) => parseFloat(a.distanceFromUser) - parseFloat(b.distanceFromUser),
    );
  };

  // 🆕 EXISTING: Display filtered places with yellow styling
  const displayFilteredPlaces = (filteredPlaces, userLocation) => {
    // Clear existing markers
    harvestMarkersRef.current.forEach((marker) => {
      mapInstanceRef.current.removeLayer(marker);
    });
    harvestMarkersRef.current = [];

    // Add user location marker if available
    if (userLocation) {
      const userIcon = L.divIcon({
        html: `
        <div style="
          width: 24px; 
          height: 24px; 
          background: #3B82F6;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          font-size: 12px;
        ">
          📍
        </div>
      `,
        className: "user-location-marker",
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });

      const userMarker = L.marker([userLocation.lat, userLocation.lng], {
        icon: userIcon,
      }).addTo(mapInstanceRef.current).bindPopup(`
        <div style="text-align: center;">
          <h3 style="color: #3B82F6; font-weight: bold; margin-bottom: 4px;">Your Location</h3>
          <p style="color: #6B7280; font-size: 12px;">Current position</p>
        </div>
      `);

      harvestMarkersRef.current.push(userMarker);
    }

    // Add filtered harvest place markers with YELLOW styling
    filteredPlaces.forEach((place, index) => {
      const harvestIcon = L.divIcon({
        html: `
        <div style="
          width: 36px; 
          height: 36px; 
          background: linear-gradient(135deg, #FCD34D, #F59E0B);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 4px solid #FBBF24;
          box-shadow: 0 4px 12px rgba(245, 158, 11, 0.4);
          font-size: 18px;
          position: relative;
          animation: pulse 2s infinite;
        ">
          🌾
          <div style="
            position: absolute;
            top: -10px;
            right: -10px;
            background: #DC2626;
            color: white;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 11px;
            font-weight: bold;
            border: 2px solid white;
            box-shadow: 0 2px 4px rgba(0,0,0,0.3);
          ">${index + 1}</div>
        </div>
        <style>
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }
        </style>
      `,
        className: "filtered-harvest-marker-yellow",
        iconSize: [36, 36],
        iconAnchor: [18, 18],
      });

      const marker = L.marker([place.lat, place.lng], {
        icon: harvestIcon,
      }).addTo(mapInstanceRef.current).bindPopup(`
        <div style="min-width: 280px; border-radius: 12px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #FCD34D, #F59E0B); padding: 12px; margin: -8px -8px 8px -8px;">
            <h3 style="color: #92400E; font-weight: bold; margin: 0; font-size: 16px;">
              ${place.name}
            </h3>
            <div style="background: rgba(255,255,255,0.9); color: #92400E; padding: 4px 8px; border-radius: 12px; display: inline-block; margin-top: 4px; font-size: 11px; font-weight: bold;">
              #${index + 1} FILTERED RESULT • ${place.source || "OSM"}
            </div>
          </div>
          
          <p style="color: #6B7280; font-size: 14px; margin-bottom: 8px; font-weight: 500;">
            ${place.type}
          </p>
          
          <div style="display: flex; align-items: center; margin-bottom: 8px; background: #FEF3C7; padding: 6px 8px; border-radius: 8px;">
            <span style="color: #F59E0B; font-size: 16px;">⭐</span>
            <span style="margin-left: 4px; font-size: 14px; font-weight: bold; color: #92400E;">${place.rating}</span>
            <span style="margin-left: 12px; color: #F59E0B; font-size: 13px; font-weight: bold;">
              📍 ${place.distanceFromUser} km away
            </span>
          </div>
          
          <div style="margin-bottom: 8px; background: #F9FAFB; padding: 8px; border-radius: 8px;">
            <div style="font-size: 14px; color: #374151; margin-bottom: 4px;">
              <strong style="color: #F59E0B;">💰 Price:</strong> ${place.price}
            </div>
            <div style="font-size: 14px; color: #374151;">
              <strong style="color: #F59E0B;">🕒 Hours:</strong> ${place.hours}
            </div>
          </div>
          
          <div style="display: flex; flex-wrap: wrap; gap: 4px;">
            ${place.displayTags
              .map(
                (tag) => `
              <span style="
                background: linear-gradient(135deg, #FEF3C7, #FCD34D); 
                color: #92400E; 
                padding: 4px 8px; 
                border-radius: 6px; 
                font-size: 11px;
                font-weight: bold;
                border: 1px solid #F59E0B;
              ">${tag}</span>
            `,
              )
              .join("")}
          </div>
          
          <div style="margin-top: 8px; text-align: center;">
            <div style="background: linear-gradient(135deg, #FCD34D, #F59E0B); color: #92400E; padding: 6px 12px; border-radius: 6px; font-size: 12px; font-weight: bold; display: inline-block;">
              🎯 MATCHED YOUR FILTER
            </div>
          </div>
        </div>
      `);

      harvestMarkersRef.current.push(marker);
    });

    // Fit map to show all markers
    if (harvestMarkersRef.current.length > 0) {
      const group = new L.featureGroup(harvestMarkersRef.current);
      mapInstanceRef.current.fitBounds(group.getBounds().pad(0.1));
    }
  };

  // ⭐ EXISTING FUNCTIONS (updated to use real data)
  const calculateHarvestRoute = async () => {
    setLoading(true);
    clearMapLayers();

    try {
      const sourceCoords = await geocodeAddress(source);
      const destCoords = await geocodeAddress(destination);

      if (!sourceCoords || !destCoords) {
        throw new Error("Could not geocode addresses");
      }

      const routeData = await getSafestRoute(sourceCoords, destCoords, mode);

      if (routeData) {
        displayRoute(routeData, sourceCoords, destCoords);
        const nearbyHarvest = findHarvestPlacesNearRoute(routeData.coordinates);
        setHarvestPlaces(nearbyHarvest);
        displayHarvestPlaces(nearbyHarvest);

        if (onHarvestDataUpdate) {
          onHarvestDataUpdate({
            route: routeData,
            harvestPlaces: nearbyHarvest,
            totalSpots: nearbyHarvest.length,
            averageDistance: calculateAverageDistance(nearbyHarvest),
          });
        }
      }
    } catch (error) {
      console.error("Error calculating harvest route:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🆕 UPDATED: Use real data for route search
  const findHarvestPlacesNearRoute = (routeCoordinates) => {
    const nearbyPlaces = [];
    const maxDistance = 5000; // 5km

    // Use real OSM data instead of dummy data
    const dataToSearch =
      realHarvestData.length > 0
        ? realHarvestData
        : getFallbackData(userLocation);

    dataToSearch.forEach((place) => {
      const placeLatLng = [place.lat, place.lng];

      const isNearRoute = routeCoordinates.some((routePoint) => {
        const distance = getDistance(routePoint, placeLatLng) * 1000;
        return distance <= maxDistance;
      });

      if (isNearRoute) {
        const distances = routeCoordinates.map(
          (point) => getDistance(point, placeLatLng) * 1000,
        );
        const minDistance = Math.min(...distances);

        nearbyPlaces.push({
          ...place,
          distanceFromRoute: (minDistance / 1000).toFixed(1),
        });
      }
    });

    return nearbyPlaces.sort(
      (a, b) =>
        parseFloat(a.distanceFromRoute) - parseFloat(b.distanceFromRoute),
    );
  };

  // ⭐ ALL OTHER EXISTING FUNCTIONS REMAIN THE SAME
  const geocodeAddress = async (address) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          address,
        )}&limit=1`,
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

  const getSafestRoute = async (start, end) => {
    try {
      const midPoint1 = [
        (start[0] + end[0]) / 2 + 0.01,
        (start[1] + end[1]) / 2 - 0.01,
      ];
      const midPoint2 = [
        (start[0] + end[0]) / 2 - 0.01,
        (start[1] + end[1]) / 2 + 0.01,
      ];

      return {
        coordinates: [start, midPoint1, midPoint2, end],
        distance: getDistance(start, end) * 1000,
        duration: getDistance(start, end) * 300,
        safetyScore: 95,
      };
    } catch (error) {
      console.error("Routing error:", error);
      return null;
    }
  };

  const displayRoute = (routeData, sourceCoords, destCoords) => {
    const polyline = L.polyline(routeData.coordinates, {
      color: "#10B981",
      weight: 6,
      opacity: 0.8,
      dashArray: "10, 10",
    }).addTo(mapInstanceRef.current);

    routeLayersRef.current.push(polyline);

    const startMarker = L.marker(sourceCoords)
      .addTo(mapInstanceRef.current)
      .bindPopup(
        `<div class="font-bold text-green-700">Start: ${source}</div>`,
      );

    const endMarker = L.marker(destCoords)
      .addTo(mapInstanceRef.current)
      .bindPopup(
        `<div class="font-bold text-blue-700">Destination: ${destination}</div>`,
      );

    routeLayersRef.current.push(startMarker, endMarker);

    const group = new L.featureGroup(routeLayersRef.current);
    mapInstanceRef.current.fitBounds(group.getBounds().pad(0.1));
  };

  const displayHarvestPlaces = (places) => {
    places.forEach((place) => {
      const harvestIcon = L.divIcon({
        html: `
          <div class="harvest-marker" style="
            width: 32px; 
            height: 32px; 
            background: linear-gradient(135deg, #10B981, #059669);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 3px solid white;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            font-size: 16px;
          ">
            🌾
          </div>
        `,
        className: "custom-harvest-marker",
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      const marker = L.marker([place.lat, place.lng], {
        icon: harvestIcon,
      }).addTo(mapInstanceRef.current).bindPopup(`
          <div class="harvest-popup" style="min-width: 250px;">
            <h3 style="color: #059669; font-weight: bold; margin-bottom: 8px;">${
              place.name
            }</h3>
            <p style="color: #6B7280; font-size: 14px; margin-bottom: 8px;">${
              place.type
            }</p>
            
            <div style="display: flex; align-items: center; margin-bottom: 8px;">
              <span style="color: #F59E0B;">⭐</span>
              <span style="margin-left: 4px; font-size: 14px;">${
                place.rating
              }</span>
              <span style="margin-left: 12px; color: #6B7280; font-size: 14px;">${
                place.distanceFromRoute
              } km from route</span>
            </div>
            
            <div style="margin-bottom: 8px;">
              <div style="font-size: 14px; color: #374151; margin-bottom: 4px;">
                <strong>Price:</strong> ${place.price}
              </div>
              <div style="font-size: 14px; color: #374151;">
                <strong>Hours:</strong> ${place.hours}
              </div>
            </div>
            
            <div style="display: flex; flex-wrap: wrap; gap: 4px;">
              ${place.displayTags
                .map(
                  (tag) => `
                <span style="
                  background: #D1FAE5; 
                  color: #065F46; 
                  padding: 2px 6px; 
                  border-radius: 4px; 
                  font-size: 12px;
                ">${tag}</span>
              `,
                )
                .join("")}
            </div>
          </div>
        `);

      harvestMarkersRef.current.push(marker);
    });
  };

  const clearMapLayers = () => {
    [...routeLayersRef.current, ...harvestMarkersRef.current].forEach(
      (layer) => {
        mapInstanceRef.current.removeLayer(layer);
      },
    );
    routeLayersRef.current = [];
    harvestMarkersRef.current = [];
  };

  const getDistance = (point1, point2) => {
    const R = 6371;
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

  const calculateAverageDistance = (places) => {
    if (places.length === 0) return 0;
    const total = places.reduce(
      (sum, place) => sum + parseFloat(place.distanceFromRoute),
      0,
    );
    return (total / places.length).toFixed(1);
  };

  const HarvestPlacesList = () => {
    if (harvestPlaces.length === 0) return null;

    const isFiltered = selectedTags && selectedTags.length > 0;

    return (
      <div
        className={`absolute bottom-4 left-4 bg-card rounded-lg shadow-lg p-4 max-w-sm max-h-80 overflow-y-auto z-[1000] ${
          isFiltered ? "border-2 border-yellow-400" : ""
        }`}
      >
        <h3
          className={`font-semibold mb-3 flex items-center ${
            isFiltered ? "text-yellow-700" : "text-foreground"
          }`}
        >
          <span className="mr-2">{isFiltered ? "🎯" : "🌾"}</span>
          {isFiltered ? "Filtered" : "Local"} Harvest Spots (
          {harvestPlaces.length})
        </h3>

        {isFiltered && (
          <div className="mb-3 p-2 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="text-xs text-yellow-700 font-medium">
              🏷️ Active Filters: {selectedTags.length}
            </div>
            <div className="text-xs text-yellow-600 mt-1">
              Showing places matching your sustainability preferences
            </div>
          </div>
        )}

        <div className="space-y-3">
          {harvestPlaces.map((place, index) => (
            <div
              key={place.id}
              className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                isFiltered
                  ? "border-yellow-300 hover:bg-yellow-50 bg-yellow-25"
                  : "border-gray-200 hover:bg-green-50"
              }`}
              onClick={() => {
                mapInstanceRef.current.flyTo([place.lat, place.lng], 16);
              }}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  {isFiltered && (
                    <span className="text-yellow-600 font-bold text-xs">
                      #{index + 1}
                    </span>
                  )}
                  <h4
                    className={`font-medium text-sm ${
                      isFiltered ? "text-yellow-700" : "text-green-700"
                    }`}
                  >
                    {place.name}
                  </h4>
                </div>
                <span className="text-xs text-gray-500">
                  {place.distanceFromUser || place.distanceFromRoute} km
                </span>
              </div>

              <p className="text-xs text-gray-600 mb-2">{place.type}</p>

              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <span className="text-yellow-500 text-xs">⭐</span>
                  <span className="text-xs ml-1">{place.rating}</span>
                </div>
                <span
                  className={`text-xs font-medium ${
                    isFiltered ? "text-yellow-600" : "text-green-600"
                  }`}
                >
                  {place.price}
                </span>
              </div>

              <div className="flex flex-wrap gap-1">
                {(place.displayTags || place.tags)
                  .slice(0, 2)
                  .map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className={`text-xs px-2 py-0.5 rounded ${
                        isFiltered
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
              </div>

              {isFiltered && (
                <div className="mt-2 text-xs text-yellow-600 font-medium">
                  🎯 Matches your filter
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1 relative">
      {/* Map container must always be mounted so Leaflet can initialize */}
      <div ref={mapRef} className="w-full h-full" />

      {/* Show full map skeleton as an overlay when initially loading */}
      {osmLoading && realHarvestData.length === 0 && (
        <div className="absolute inset-0 z-[999]">
          <MapLoadingSkeleton />
        </div>
      )}

      {/* Loading indicator for data updates */}
      {(loading || osmLoading) && (
        <div className="absolute top-4 left-4 bg-card rounded-lg shadow-lg p-3 z-[1000]">
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-500"></div>
            <span className="text-sm text-muted-foreground">
              {osmLoading
                ? "🗺️ Loading real harvest data..."
                : "Finding local harvest spots..."}
            </span>
          </div>
        </div>
      )}
      {/* 🆕 UPDATED: Legend with data source indicator */}
      <div className="absolute top-4 right-4 bg-card rounded-lg shadow-lg p-3 z-[1000]">
        <h4 className="font-semibold text-foreground mb-2 text-sm">
          Map Legend
        </h4>

        {/* Data Source Indicator */}
        <div className="text-xs text-muted-foreground mb-2 pb-2 border-b">
          📊 Data: {realHarvestData.length > 0 ? "OpenStreetMap" : "Demo Data"}
        </div>

        {/* Route Legend */}
        <div className="flex items-center space-x-2 text-xs mb-1">
          <div
            className="w-4 h-1 bg-green-500"
            style={{ borderRadius: "2px" }}
          ></div>
          <span className="text-gray-600">Safest Route</span>
        </div>

        {/* User Location Legend */}
        <div className="flex items-center space-x-2 text-xs mb-1">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span className="text-gray-600">Your Location</span>
        </div>

        {/* Filtered Places Legend (only show when tags are selected) */}
        {selectedTags && selectedTags.length > 0 && (
          <div className="flex items-center space-x-2 text-xs mb-1">
            <div
              className="w-4 h-4 bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-full flex items-center justify-center border border-yellow-400"
              style={{ fontSize: "10px" }}
            >
              🌾
            </div>
            <span className="text-gray-600">Filtered Harvest Spots</span>
          </div>
        )}

        {/* Regular Places Legend */}
        <div className="flex items-center space-x-2 text-xs">
          <div
            className="w-3 h-3 bg-green-500 rounded-full flex items-center justify-center"
            style={{ fontSize: "10px" }}
          >
            🌾
          </div>
          <span className="text-gray-600">All Harvest Spots</span>
        </div>

        {/* Filter Status */}
        {selectedTags && selectedTags.length > 0 && (
          <div className="mt-2 pt-2 border-t border-gray-200">
            <div className="text-xs text-yellow-600 font-medium">
              🎯 {selectedTags.length} filter
              {selectedTags.length > 1 ? "s" : ""} active
            </div>
          </div>
        )}

        {/* OSM Data Count */}
        {realHarvestData.length > 0 && (
          <div className="mt-2 pt-2 border-t border-gray-200">
            <div className="text-xs text-green-600 font-medium">
              🗺️ {realHarvestData.length} real places found
            </div>
          </div>
        )}
      </div>

      <HarvestPlacesList />
    </div>
  );
};

export default MapViewLocalHarvest;
