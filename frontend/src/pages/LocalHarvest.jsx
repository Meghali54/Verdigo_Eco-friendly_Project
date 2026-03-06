import SideBarLocalHarvest from "@/components/SideBarLocalHarvest";
import MapViewLocalHarvest from "@/components/mapviewForLocalharvest";
import { TreePalm, ArrowLeft } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "@/components/ThemeToggle";

const LocalHarvest = () => {
  const [routeData, setRouteData] = useState(null);
  const [harvestData, setHarvestData] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  const handleRouteChange = (source, destination, mode) => {
    setRouteData({ source, destination, mode });
  };

  const handleHarvestDataUpdate = (data) => {
    setHarvestData(data);
  };

  const handleTagFilterChange = (tags, location) => {
    setSelectedTags(tags);
    setUserLocation(location);
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* header */}
      <div className="w-full bg-gradient-to-r from-[#059893] to-[#067492] shadow-sm border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-green-300 to-teal-500 rounded-xl flex items-center justify-center">
            <TreePalm className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-gray-100 font-stretch-ultra-expanded font-sans">
              LOCAL HARVEST
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/dashboard">
            <button className="flex items-center gap-1 text-sm text-white bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg transition">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </button>
          </Link>
          <ThemeToggle />
        </div>
      </div>

      {/* main content */}
      <div className="flex flex-1 overflow-hidden">
        <SideBarLocalHarvest
          onRouteChange={handleRouteChange}
          harvestData={harvestData}
          onTagFilterChange={handleTagFilterChange}
        />
        <MapViewLocalHarvest
          source={routeData?.source}
          destination={routeData?.destination}
          mode={routeData?.mode}
          selectedTags={selectedTags}
          userLocation={userLocation}
          onHarvestDataUpdate={handleHarvestDataUpdate}
        />
      </div>
    </div>
  );
};

export default LocalHarvest;
