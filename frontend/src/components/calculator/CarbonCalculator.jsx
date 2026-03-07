import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calculator, Home, Car, Utensils, Trash2, BarChart3, RotateCcw, CloudCheck } from "lucide-react";
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
  const [savedAt, setSavedAt] = useState(null);
  
  // Safely read and parse localStorage, clearing corrupted data
  const getSavedData = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      console.warn("Carbon calculator: localStorage data was corrupted and has been cleared.", e);
      localStorage.removeItem(STORAGE_KEY);
      return {};
    }
  };

  // Initialize data from localStorage or defaults
  const [homeData, setHomeData] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    let parsed = {};
    if (saved) {
      try {
        parsed = JSON.parse(saved);
      } catch (error) {
        console.warn('Corrupted localStorage data detected. Falling back to defaults.');
        parsed = {}; // Fallback to safe default state
      }
    }
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
    let parsed = {};
    if (saved) {
      try {
        parsed = JSON.parse(saved);
      } catch (error) {
        console.warn('Corrupted localStorage data detected. Falling back to defaults.');
        parsed = {}; // Fallback to safe default state
      }
    }
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
    let parsed = {};
    if (saved) {
      try {
        parsed = JSON.parse(saved);
      } catch (error) {
        console.warn('Corrupted localStorage data detected. Falling back to defaults.');
        parsed = {}; // Fallback to safe default state
      }
    }
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
    let parsed = {};
    if (saved) {
      try {
        parsed = JSON.parse(saved);
      } catch (error) {
        console.warn('Corrupted localStorage data detected. Falling back to defaults.');
        parsed = {}; // Fallback to safe default state
      }
    }
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
    try {
      const dataToSave = {
        homeData,
        transportData,
        foodData,
        wasteData,
        footprint,
        lastUpdated: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    } catch (e) {
      console.warn("Carbon calculator: failed to save data to localStorage.", e);
    }
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
        <div className="container mx-auto px-4 py-4 md:py-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            {/* Title & Icon */}
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-full shrink-0">
                <Calculator className="h-5 w-5 md:h-6 md:w-6 text-green-600" />
              </div>
              <div>
                <h1 className="text-lg md:text-2xl font-bold text-foreground leading-tight">
                  Carbon Footprint Calculator
                </h1>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Track and reduce your environmental impact
                </p>
              </div>
            </div>
              <div className="flex items-center gap-4">
                {savedAt && (
                  <div className="flex items-center gap-1 text-xs text-green-600">
                    <CloudCheck className="h-4 w-4" />
                    <span>Saved {savedAt.toLocaleTimeString()}</span>
                  </div>
                )}
                <div className="text-right">
                <div className="text-2xl font-bold text-primary">{footprint.total.toFixed(1)} tons</div>
                <div className="text-sm text-muted-foreground">CO₂e per year</div>
              </div>
              <Link to="/dashboard">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Dashboard
                </Button>
              </Link>
              <Button variant="outline" onClick={resetCalculator} className="flex items-center gap-2">
                <RotateCcw className="h-4 w-4" />
                <span className="hidden sm:inline">Reset</span>
                <span className="sm:hidden">Reset</span>
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
                      className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === tab.id
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
