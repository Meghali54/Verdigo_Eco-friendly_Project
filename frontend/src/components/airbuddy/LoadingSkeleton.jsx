export function LoadingSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* AQI Header Skeleton */}
      <div className="bg-gray-200 rounded-2xl p-6 border">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="h-6 bg-gray-300 rounded w-48 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-32"></div>
          </div>
          <div className="text-right">
            <div className="h-3 bg-gray-300 rounded w-20 mb-1"></div>
            <div className="h-3 bg-gray-300 rounded w-16"></div>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="w-32 h-32 bg-gray-300 rounded-full"></div>
        </div>

        <div className="text-center mt-4">
          <div className="h-6 bg-gray-300 rounded w-32 mx-auto mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-64 mx-auto"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Pollutants Skeleton */}
        <div className="lg:col-span-2">
          <div className="h-6 bg-gray-300 rounded w-32 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-xl p-4 border">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="h-4 bg-gray-300 rounded w-12 mb-1"></div>
                    <div className="h-3 bg-gray-300 rounded w-20"></div>
                  </div>
                  <div className="h-8 bg-gray-300 rounded w-12"></div>
                </div>
                <div className="bg-gray-300 rounded-full h-2 mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-24"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Health Advisory Skeleton */}
        <div className="bg-gray-200 rounded-2xl p-6 border">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-6 bg-gray-300 rounded"></div>
            <div className="h-6 bg-gray-300 rounded w-40"></div>
          </div>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-gray-300 rounded-lg h-12"></div>
            ))}
          </div>
        </div>
      </div>

      {/* Chart Skeleton */}
      <div className="bg-gray-200 rounded-2xl p-6 border">
        <div className="h-6 bg-gray-300 rounded w-32 mb-4"></div>
        <div className="h-64 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
}
