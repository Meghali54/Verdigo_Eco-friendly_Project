import React from "react";
import { Link } from "react-router-dom";
import { Leaf, TreePine, Home } from "lucide-react";

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-green-50 text-center px-4">
      {/* Icon cluster */}
      <div className="flex items-end gap-2 mb-6">
        <TreePine size={56} className="text-green-400 mb-1" />
        <span className="text-[7rem] font-extrabold leading-none text-green-700 select-none">
          4
        </span>
        <Leaf size={52} className="text-green-500 mb-2 rotate-12" />
        <span className="text-[7rem] font-extrabold leading-none text-green-700 select-none">
          4
        </span>
      </div>

      <h1 className="text-2xl font-bold text-green-800 mb-2">
        Oops! This page got lost in the forest.
      </h1>
      <p className="text-gray-500 text-sm max-w-sm mb-8">
        The page you're looking for doesn't exist or has been moved. Let's get
        you back on the green path.
      </p>

      <Link
        to="/"
        className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-all shadow-md"
      >
        <Home size={18} />
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
