import MapView from "@/components/MapView";
import SideBarGreenLane from "@/components/SideBarGreenLane";
import { TreePineIcon, ArrowLeft } from "lucide-react";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "@/components/ThemeToggle";

const GreenLane = () => {
  const [routeData, setRouteData] = useState(null);
  const [selectedRouteData, setSelectedRouteData] = useState(null);

  const handleRouteChange = (source, destination, mode) => {
    setRouteData({ source, destination, mode });
  };

  const handleRouteDataUpdate = (routeInfo) => {
    setSelectedRouteData(routeInfo);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* header */}
      <div className="w-full bg-gradient-to-r from-[#058884] to-green-400 shadow-sm border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-green-300 to-teal-500 rounded-xl flex items-center justify-center">
            <TreePineIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-gray-100 font-stretch-ultra-expanded font-sans">
              GREEN LANE
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
        <SideBarGreenLane
          onRouteChange={handleRouteChange}
          routeData={selectedRouteData}
        />
        <MapView
          source={routeData?.source}
          destination={routeData?.destination}
          mode={routeData?.mode}
          onRouteDataUpdate={handleRouteDataUpdate}
        />
      </div>
    </div>
  );
};

export default GreenLane;
