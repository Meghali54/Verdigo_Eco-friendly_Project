export function CarbonCalculatorSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Summary Dashboard Skeleton */}
      <div className="bg-gray-200 rounded-2xl p-6 border">
        <div className="text-center mb-6">
          <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-4"></div>

          {/* Large circular progress skeleton */}
          <div className="w-48 h-48 bg-gray-300 rounded-full mx-auto mb-6"></div>

          <div className="h-6 bg-gray-300 rounded w-32 mx-auto mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-48 mx-auto"></div>
        </div>
      </div>

      {/* Category Breakdown Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-gray-200 rounded-xl p-4 border">
            <div className="flex items-center justify-between mb-3">
              <div className="w-8 h-8 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded w-16"></div>
            </div>
            <div className="space-y-2">
              <div className="h-6 bg-gray-300 rounded w-24"></div>
              <div className="h-4 bg-gray-300 rounded w-20"></div>
              <div className="bg-gray-300 rounded-full h-2"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Recommendations Skeleton */}
      <div className="bg-gray-200 rounded-2xl p-6 border">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-6 h-6 bg-gray-300 rounded"></div>
          <div className="h-6 bg-gray-300 rounded w-48"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-300 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-gray-400 rounded mt-1"></div>
                <div className="flex-1">
                  <div className="h-5 bg-gray-400 rounded w-32 mb-2"></div>
                  <div className="h-4 bg-gray-400 rounded w-full mb-1"></div>
                  <div className="h-4 bg-gray-400 rounded w-3/4"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Impact Comparison Skeleton */}
      <div className="bg-gray-200 rounded-2xl p-6 border">
        <div className="h-6 bg-gray-300 rounded w-40 mb-4"></div>
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="h-4 bg-gray-300 rounded w-32"></div>
              <div className="h-4 bg-gray-300 rounded w-20"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
