import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Calculator,
  TrendingDown,
  Zap,
  Leaf,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const QuickCarbonWidget = () => {
  const [distance, setDistance] = useState(50);
  const [meatDays, setMeatDays] = useState(3);
  const [electricity, setElectricity] = useState(150);
  const [activeTab, setActiveTab] = useState("travel");

  // Emission factors
  const EMISSION_FACTORS = {
    travel: 0.171, // kg CO2 per km (petrol car average)
    meat: 3.5, // kg CO2 per day
    electricity: 0.42, // kg CO2 per kWh (mixed sources average)
  };

  // Calculate daily carbon footprint
  const calculateDailyFootprint = () => {
    const travelEmissions = (distance * EMISSION_FACTORS.travel) / 1000; // Convert to tons
    const meatEmissions = (meatDays * EMISSION_FACTORS.meat) / 1000; // Convert to tons
    const electricityEmissions =
      (electricity * EMISSION_FACTORS.electricity) / 1000; // Convert to tons

    return {
      travel: parseFloat(travelEmissions.toFixed(4)),
      meat: parseFloat(meatEmissions.toFixed(4)),
      electricity: parseFloat(electricityEmissions.toFixed(4)),
      total: parseFloat(
        (travelEmissions + meatEmissions + electricityEmissions).toFixed(4),
      ),
    };
  };

  const footprint = calculateDailyFootprint();
  const globalAverage = 0.027; // Global average daily carbon footprint in tons

  // Get comparison status
  const getComparisonStatus = () => {
    if (footprint.total < globalAverage * 0.8) {
      return {
        text: "Below Average",
        color: "text-green-600",
        bg: "bg-green-50",
      };
    } else if (footprint.total < globalAverage * 1.2) {
      return {
        text: "Near Average",
        color: "text-yellow-600",
        bg: "bg-yellow-50",
      };
    } else {
      return {
        text: "Above Average",
        color: "text-orange-600",
        bg: "bg-orange-50",
      };
    }
  };

  const comparison = getComparisonStatus();

  return (
    <Card className="from-blue-50 to-teal-50 rounded-2xl p-6 border border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300">
      {/* <Card className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl p-6 border border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300"> */}
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-teal-500 shadow-md">
            <Calculator className="w-6 h-6 text-white" />
          </div>
          <div className="background red">
            <h3 className="text-xl font-bold text-card-foreground">
              Quick Carbon Check
            </h3>
            <p className="text-sm text-muted-foreground">
              Estimate your daily footprint
            </p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-2 mb-6">
        {["travel", "food", "energy"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 ${
              activeTab === tab
                ? "bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-md"
                : "bg-white text-muted-foreground hover:bg-gray-100 border border-border"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Input Section */}
      <div className="space-y-6 mb-6">
        {activeTab === "travel" && (
          <div className="bg-card rounded-xl p-5 border border-blue-100 shadow-sm">
            {/* <div className="bg-white rounded-xl p-5 border border-blue-100 shadow-sm"> */}
            <div className="flex items-center justify-between mb-3">
              <label className="font-semibold text-card-foreground flex items-center space-x-2">
                <Zap className="w-4 h-4 text-blue-500" />
                <span>Daily Distance Traveled</span>
              </label>
              <span className="text-2xl font-bold text-blue-600">
                {distance} km
              </span>
            </div>
            <Slider
              value={[distance]}
              onValueChange={(value) => setDistance(value[0])}
              min={0}
              max={200}
              step={5}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground mt-2">
              Assuming petrol car (0.171 kg CO2/km)
            </p>
          </div>
        )}

        {activeTab === "food" && (
          <div className="bg-card rounded-xl p-5 border border-green-100 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <label className="font-semibold text-card-foreground flex items-center space-x-2">
                <Leaf className="w-4 h-4 text-green-500" />
                <span>Days with Meat This Week</span>
              </label>
              <span className="text-2xl font-bold text-green-600">
                {meatDays}/7
              </span>
            </div>
            <Slider
              value={[meatDays]}
              onValueChange={(value) => setMeatDays(value[0])}
              min={0}
              max={7}
              step={1}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground mt-2">
              Calculating average daily impact (3.5 kg CO2/meat day)
            </p>
          </div>
        )}

        {activeTab === "energy" && (
          <div className="bg-card rounded-xl p-5 border border-amber-100 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <label className="font-semibold text-card-foreground flex items-center space-x-2">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>Monthly Electricity Use</span>
              </label>
              <span className="text-2xl font-bold text-amber-600">
                {electricity} kWh
              </span>
            </div>
            <Slider
              value={[electricity]}
              onValueChange={(value) => setElectricity(value[0])}
              min={50}
              max={500}
              step={10}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground mt-2">
              Daily average: {(electricity / 30).toFixed(1)} kWh
            </p>
          </div>
        )}
      </div>

      {/* Results Section */}
      <div
        className={` bg:${comparison.bg} rounded-xl p-4 mb-6 border-2 border-dashed`}
      >
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-sm text-muted-foreground font-medium">
              Your Daily Footprint
            </p>
            <p className="text-3xl font-bold text-card-foreground">
              {footprint.total.toFixed(3)} tons
            </p>
          </div>
          <div className="text-right">
            <p className={`text-sm font-semibold ${comparison.color} mb-1`}>
              {comparison.text}
            </p>
            <p className="text-xs text-muted-foreground">
              Global avg: {(globalAverage * 1000).toFixed(2)} kg/day
            </p>
          </div>
        </div>

        {/* Breakdown */}
        <div className="bg-card grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-current border-opacity-20">
          <div className="text-center">
            <p className="text-xs text-muted-foreground font-medium mb-1">
              Travel
            </p>
            <p className="text-lg font-bold text-blue-600">
              {footprint.travel.toFixed(3)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground font-medium mb-1">
              Food
            </p>
            <p className="text-lg font-bold text-green-600">
              {footprint.meat.toFixed(3)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground font-medium mb-1">
              Energy
            </p>
            <p className="text-lg font-bold text-amber-600">
              {footprint.electricity.toFixed(3)}
            </p>
          </div>
        </div>
      </div>

      {/* Suggestion Based on Active Tab */}
      <div className="bg-card rounded-xl p-4 mb-6 border border-blue-100">
        {/* <div className="bg-white rounded-xl p-4 mb-6 border border-blue-100"> */}
        <p className="text-sm font-semibold text-card-foreground mb-2 flex items-center space-x-2">
          <TrendingDown className="w-4 h-4 text-green-500" />
          <span>Quick Tip</span>
        </p>
        <p className="text-sm text-muted-foreground">
          {activeTab === "travel" && distance > 50
            ? "🚗 Consider carpooling or using public transport to reduce emissions."
            : activeTab === "food" && meatDays > 4
              ? "🥬 Reducing meat days can significantly lower your carbon footprint."
              : activeTab === "energy" && electricity > 250
                ? "💡 Switch to LED bulbs and unplug devices to save energy."
                : "✨ You're doing great! Keep up your eco-friendly habits."}
        </p>
      </div>

      {/* CTA Button */}
      <Link to="/dashboard/carbon-footprint-calculator">
        <Button className="w-full bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center space-x-2">
          <span>Full Calculator</span>
          <ChevronRight className="w-4 h-4" />
        </Button>
      </Link>
    </Card>
  );
};

export default QuickCarbonWidget;
