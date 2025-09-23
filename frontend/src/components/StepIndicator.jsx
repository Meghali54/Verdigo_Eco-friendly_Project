import { cn } from '@/lib/utils';

export function StepIndicator({ currentStep, totalSteps, steps }) {
  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                  index < currentStep
                    ? "bg-green-500 text-white"
                    : index === currentStep
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-500"
                )}
              >
                {index + 1}
              </div>
              <span className="text-xs mt-2 text-center text-gray-600 max-w-16">
                {step}
              </span>
            </div>
            {index < totalSteps - 1 && (
              <div
                className={cn(
                  "h-1 w-20 mx-2 transition-colors",
                  index < currentStep ? "bg-green-500" : "bg-gray-200"
                )}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}