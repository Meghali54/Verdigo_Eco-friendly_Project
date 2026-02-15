import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Calculator,
  Home,
  Car,
  Utensils,
  Trash2,
  BarChart3,
  RotateCcw,
} from "lucide-react";
import { HomeCategory } from "./HomeCategory";
import { TransportCategory } from "./TransportCategory";
import { FoodCategory } from "./FoodCategory";
import { WasteCategory } from "./WasteCategory";
import { SummaryDashboard } from "./SummaryDashboard";
import { CarbonCalculatorSkeleton } from "./CarbonCalculatorSkeleton";
import { calculateTotalFootprint } from "../../lib/calculations";

const TABS = [
  { id: "home", label: "Home", icon: Home },
  { id: "transport", label: "Travel", icon: Car },
  { id: "food", label: "Food", icon: Utensils },
  { id: "waste", label: "Waste", icon: Trash2 },
  { id: "summary", label: "Summary", icon: BarChart3 },
];

const STORAGE_KEY = "carbon-calculator-data";

export function CarbonCalculator() {
  const [activeTab, setActiveTab] = useState("home");
  const [isLoading, setIsLoading] = useState(false);

  // Initialize data from localStorage or defaults
  const [homeData, setHomeData] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : {};
    return (
      parsed.homeData || {
        monthlyElectricity: 300,
        gasConsumption: 50,
        heatingType: "gas",
        energySource: "mixed",
      }
    );
  });

  const [transportData, setTransportData] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : {};
    return (
      parsed.transportData || {
        carFuelType: "petrol",
        carKmPerWeek: 100,
        busKmPerWeek: 20,
        trainKmPerWeek: 0,
        shortHaulFlights: 2,
        longHaulFlights: 1,
      }
    );
  });

  const [foodData, setFoodData] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : {};
    return (
      parsed.foodData || {
        dietType: "mixed",
        meatServingsPerWeek: 7,
        dairyServingsPerWeek: 10,
        grainsServingsPerWeek: 14,
        fruitsServingsPerWeek: 10,
        vegetablesServingsPerWeek: 14,
      }
    );
  });

  const [wasteData, setWasteData] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : {};
    return (
      parsed.wasteData || {
        recyclesPaper: true,
        recyclesPlastic: true,
        recyclesGlass: false,
        recyclesMetal: false,
        landfillKgPerWeek: 10,
        composts: false,
      }
    );
  });

  // Calculate footprint in real-time
  const footprint = calculateTotalFootprint(
    homeData,
    transportData,
    foodData,
    wasteData,
  );

  // Simulate calculation loading when data changes
  // useEffect(() => {
  //   setIsCalculating(true);
  //   const timeout = setTimeout(() => setIsCalculating(false), 800);
  //   return () => clearTimeout(timeout);
  // }, [homeData, transportData, foodData, wasteData]);

  // Show loading when switching to summary tab
  const handleTabChange = (tabId) => {
    if (tabId === "summary" && activeTab !== "summary") {
      setIsLoading(true);
      setTimeout(() => {
        setActiveTab(tabId);
        setIsLoading(false);
      }, 1200);
    } else {
      setActiveTab(tabId);
    }
  };

  // Save to localStorage whenever data changes
  useEffect(() => {
    const dataToSave = {
      homeData,
      transportData,
      foodData,
      wasteData,
      footprint,
      lastUpdated: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
  }, [homeData, transportData, foodData, wasteData, footprint]);

  const resetCalculator = () => {
    localStorage.removeItem(STORAGE_KEY);
    setHomeData({
      monthlyElectricity: 300,
      gasConsumption: 50,
      heatingType: "gas",
      energySource: "mixed",
    });
    setTransportData({
      carFuelType: "petrol",
      carKmPerWeek: 100,
      busKmPerWeek: 20,
      trainKmPerWeek: 0,
      shortHaulFlights: 2,
      longHaulFlights: 1,
    });
    setFoodData({
      dietType: "mixed",
      meatServingsPerWeek: 7,
      dairyServingsPerWeek: 10,
      grainsServingsPerWeek: 14,
      fruitsServingsPerWeek: 10,
      vegetablesServingsPerWeek: 14,
    });
    setWasteData({
      recyclesPaper: true,
      recyclesPlastic: true,
      recyclesGlass: false,
      recyclesMetal: false,
      landfillKgPerWeek: 10,
      composts: false,
    });
    setActiveTab("home");
  };

  const renderTabContent = () => {
    if (isLoading) {
      return <CarbonCalculatorSkeleton />;
    }
    switch (activeTab) {
      case "home":
        return <HomeCategory data={homeData} onChange={setHomeData} />;
      case "transport":
        return (
          <TransportCategory data={transportData} onChange={setTransportData} />
        );
      case "food":
        return <FoodCategory data={foodData} onChange={setFoodData} />;
      case "waste":
        return <WasteCategory data={wasteData} onChange={setWasteData} />;
      case "summary":
        return <SummaryDashboard footprint={footprint} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-full">
                <Calculator className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  Carbon Footprint Calculator
                </h1>
                <p className="text-muted-foreground">
                  Track and reduce your environmental impact
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">
                  {footprint.total.toFixed(1)} tons
                </div>
                <div className="text-sm text-muted-foreground">
                  CO₂e per year
                </div>
              </div>
              <Button
                variant="outline"
                onClick={resetCalculator}
                className="flex items-center gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                Reset
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Tab Navigation */}
          <Card className="mb-6">
            <CardContent className="p-0">
              <div className="flex overflow-x-auto">
                {TABS.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => handleTabChange(tab.id)}
                      className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                        activeTab === tab.id
                          ? "border-primary text-primary bg-primary/5"
                          : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Tab Content */}
          <div className="transition-all duration-300 ease-in-out">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
}
