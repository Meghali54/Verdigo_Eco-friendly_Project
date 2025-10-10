import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { StepIndicator } from '@/components/StepIndicator';
import { TravelCalculator } from '@/components/TravelCalculator';
import { HomeCalculator } from '@/components/HomeCalculator';
import { FoodCalculator } from '@/components/FoodCalculator';
import { WasteCalculator } from '@/components/WasteCalculator';
import { Results } from '@/components/Results';
import { LivePreview } from '@/components/LivePreview';
import { calculateTotalFootprint } from '@/utils/CarbonCalculations';
import { Calculator, Leaf } from 'lucide-react';
import { ModeToggle } from '../components/ModeToggle';

const steps = ['Travel', 'Home', 'Food', 'Waste', 'Results'];

function CarbonFootprintCalculator() {
  const [currentStep, setCurrentStep] = useState(0);
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

  const footprint = calculateTotalFootprint(travelData, homeData, foodData, wasteData);

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
        return <Results footprint={footprint} />;
      default:
        return null;
    }
  };

  if (currentStep === 4) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
        <div className="container mx-auto py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Your Carbon Footprint Results</h1>
            <p className="text-gray-600">Complete analysis of your environmental impact</p>
          </div>
          <Results footprint={footprint} />
          <div className="text-center mt-8">
            <Button onClick={() => setCurrentStep(0)} size="lg " className=" border border-green-400 cabg-green-500 text-white hover:bg-green-600 p-3 rounded-md">
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
      <div className="bg-gradient-to-br from-green-200 to-blue-200 shadow-sm relative">
        <div className="absolute top-4 right-4">
          <ModeToggle />
        </div>
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-2 pt-10">
              <div className="p-2 bg-green-100 rounded-full">
                <Calculator className="h-6 w-6 text-green-600" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Carbon Footprint Calculator</h1>
              <div className="p-2 bg-blue-100 rounded-full">
                <Leaf className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover your environmental impact and get personalized recommendations to reduce your carbon footprint
            </p>
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
                disabled={currentStep === 0}
                className="border-2 border-gray-300 text-gray-50 bg-blue-600 hover:border-blue-500 ml-10"
              >
                Previous
              </Button>
              <Button
                onClick={nextStep}
                disabled={currentStep === steps.length - 1}
                className="border-2  text-gray-50 bg-blue-600 hover:border-blue-500 hover:bg-white hover:text-gray-800 "
              >
                {currentStep === steps.length - 2 ? 'View Results' : 'Next'}
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