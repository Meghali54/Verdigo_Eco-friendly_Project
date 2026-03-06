export function LocalHarvestSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Search/Filter Section Skeleton */}
      <div className="bg-gray-200 rounded-lg p-4 border">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-6 h-6 bg-gray-300 rounded"></div>
          <div className="h-6 bg-gray-300 rounded w-40"></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-8 bg-gray-300 rounded-full"></div>
          ))}
        </div>
      </div>

      {/* Market Listings Skeleton */}
      <div className="space-y-4">
        <div className="h-6 bg-gray-300 rounded w-48 mb-4"></div>
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-gray-200 rounded-xl p-4 border">
            <div className="flex items-start gap-4">
              {/* Market image skeleton */}
              <div className="w-20 h-20 bg-gray-300 rounded-lg flex-shrink-0"></div>

              <div className="flex-1 space-y-2">
                {/* Market name */}
                <div className="h-5 bg-gray-300 rounded w-3/4"></div>

                {/* Address */}
                <div className="h-4 bg-gray-300 rounded w-full"></div>

                {/* Tags */}
                <div className="flex gap-2">
                  {[...Array(3)].map((_, tagIndex) => (
                    <div
                      key={tagIndex}
                      className="h-6 bg-gray-300 rounded-full w-16"
                    ></div>
                  ))}
                </div>

                {/* Distance and rating */}
                <div className="flex items-center justify-between">
                  <div className="h-4 bg-gray-300 rounded w-20"></div>
                  <div className="h-4 bg-gray-300 rounded w-24"></div>
                </div>
              </div>

              {/* Action button */}
              <div className="w-20 h-8 bg-gray-300 rounded"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Location Info Skeleton */}
      <div className="bg-gray-200 rounded-lg p-4 border">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-5 h-5 bg-gray-300 rounded"></div>
          <div className="h-5 bg-gray-300 rounded w-32"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-2/3"></div>
        </div>
      </div>
    </div>
  );
}
