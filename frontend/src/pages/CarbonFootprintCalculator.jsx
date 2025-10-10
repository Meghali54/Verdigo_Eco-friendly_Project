import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { StepIndicator } from '@/components/StepIndicator';
import { TravelCalculator } from '@/components/TravelCalculator';
import { HomeCalculator } from '@/components/HomeCalculator';
import { FoodCalculator } from '@/components/FoodCalculator';
import { WasteCalculator } from '@/components/WasteCalculator';
import { Results } from '@/components/Results';
import { LivePreview } from '@/components/LivePreview';
import { calculateTotalFootprint } from '@/utils/CarbonCalculations';
import { Calculator, Leaf, Loader2 } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';

const steps = ['Travel', 'Home', 'Food', 'Waste', 'Results'];

function CarbonFootprintCalculator() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isCalculating, setIsCalculating] = useState(false);
  const [travelData, setTravelData] = useState({
    weeklyDistance: 100,
    vehicleType: 'petrol',
    flightsPerYear: 2,
  });
  const [homeData, setHomeData] = useState({
    monthlyElectricity: 300,
    energySource: 'mixed',
    householdSize: 2,
  });
  const [foodData, setFoodData] = useState({
    meatFrequency: 'weekly',
    dietType: 'omnivore',
    localFoodPercentage: 30,
  });
  const [wasteData, setWasteData] = useState({
    recycling: true,
    weeklyWaste: 10,
    compost: false,
  });
  const [footprint, setFootprint] = useState(() => 
    calculateTotalFootprint(travelData, homeData, foodData, wasteData)
  );

  // Calculate footprint when data changes
  useEffect(() => {
    const calculateFootprint = async () => {
      setIsCalculating(true);
      // Simulate calculation delay for better UX
      await new Promise(resolve => setTimeout(resolve, 800));
      const result = calculateTotalFootprint(travelData, homeData, foodData, wasteData);
      setFootprint(result);
      setIsCalculating(false);
    };

    calculateFootprint();
  }, [travelData, homeData, foodData, wasteData]);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <TravelCalculator data={travelData} onChange={setTravelData} />;
      case 1:
        return <HomeCalculator data={homeData} onChange={setHomeData} />;
      case 2:
        return <FoodCalculator data={foodData} onChange={setFoodData} />;
      case 3:
        return <WasteCalculator data={wasteData} onChange={setWasteData} />;
      case 4:
        return <Results footprint={footprint} isCalculating={isCalculating} />;
      default:
        return null;
    }
  };

  if (currentStep === 4) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
        <div className="container mx-auto py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Your Carbon Footprint Results</h1>
            <p className="text-muted-foreground">Complete analysis of your environmental impact</p>
          </div>
          <Results footprint={footprint} />
          <div className="text-center mt-8">
            <Button onClick={() => setCurrentStep(0)} size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground border border-primary p-3 rounded-md">
              Calculate Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-green-200 to-blue-200 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div></div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-2 pt-10">
                <div className="p-2 bg-green-100 rounded-full">
                  <Calculator className="h-6 w-6 text-green-600" />
                </div>
                <h1 className="text-4xl font-bold text-foreground ">Carbon Footprint Calculator</h1>
                <div className="p-2 bg-blue-100 rounded-full">
                  <Leaf className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Discover your environmental impact and get personalized recommendations to reduce your carbon footprint
              </p>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <StepIndicator currentStep={currentStep} totalSteps={steps.length} steps={steps} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {renderStep()}
            
            {/* Navigation */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 0 || isCalculating}
                className="border-2 border-border text-foreground bg-background hover:border-primary hover:bg-primary hover:text-primary-foreground ml-10"
              >
                Previous
              </Button>
              <Button
                onClick={nextStep}
                disabled={currentStep === steps.length - 1 || isCalculating}
                className="border-2 bg-primary text-primary-foreground hover:bg-primary/90 hover:border-primary"
              >
                {isCalculating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Calculating...
                  </>
                ) : currentStep === steps.length - 2 ? 'View Results' : 'Next'}
              </Button>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <LivePreview footprint={footprint} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarbonFootprintCalculator;