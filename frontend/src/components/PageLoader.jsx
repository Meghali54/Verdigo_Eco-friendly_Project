import React from "react";

/**
 * Full-screen overlay spinner shown during page transitions.
 * Uses the project's eco-green accent colour so it fits the brand.
 */
const PageLoader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
      {/* Leaf-ring spinner */}
      <div className="relative flex items-center justify-center w-20 h-20">
        {/* Outer spinning ring */}
        <span className="absolute inline-block w-20 h-20 rounded-full border-4 border-green-200 dark:border-green-900" />
        <span className="absolute inline-block w-20 h-20 rounded-full border-4 border-transparent border-t-green-500 animate-spin" />
        {/* Inner leaf icon */}
        <span className="text-3xl select-none" role="img" aria-label="leaf">
          🌿
        </span>
      </div>
      <p className="mt-4 text-sm font-medium text-green-600 dark:text-green-400 tracking-wide animate-pulse">
        Loading…
      </p>
    </div>
  );
};

export default PageLoader;
