export function MapLoadingSkeleton() {
  return (
    <div className="w-full h-full bg-gray-200 rounded-lg relative animate-pulse overflow-hidden">
      {/* Map base skeleton */}
      <div className="w-full h-full bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200"></div>

      {/* Floating controls skeleton */}
      <div className="absolute top-4 right-4 space-y-2">
        <div className="w-10 h-10 bg-gray-300 rounded shadow"></div>
        <div className="w-10 h-10 bg-gray-300 rounded shadow"></div>
      </div>

      {/* Route options skeleton (if showing routes) */}
      <div className="absolute top-4 left-4 bg-gray-300 rounded-lg p-3 shadow-lg">
        <div className="space-y-2">
          <div className="h-4 bg-gray-400 rounded w-20"></div>
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
              <div className="h-3 bg-gray-400 rounded w-16"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Mock markers skeleton */}
      <div className="absolute top-1/3 left-1/3 w-6 h-6 bg-gray-400 rounded-full shadow-lg"></div>
      <div className="absolute top-2/3 right-1/3 w-6 h-6 bg-gray-400 rounded-full shadow-lg"></div>
      <div className="absolute bottom-1/3 left-1/2 w-6 h-6 bg-gray-400 rounded-full shadow-lg"></div>

      {/* Loading indicator overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-gray-100/75">
        <div className="bg-white rounded-lg p-4 shadow-lg flex items-center gap-3">
          <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          <div className="text-gray-600 font-medium">Loading map...</div>
        </div>
      </div>

      {/* Shimmer overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
    </div>
  );
}

/* Add custom shimmer animation to your CSS or Tailwind config */
