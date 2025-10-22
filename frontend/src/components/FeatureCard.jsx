import React from "react";

const FeatureCard = ({ title, description, icon, onClick, gradient }) => {
  return (
    <div
      onClick={onClick}
      className="bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-all duration-500 p-7 cursor-pointer group hover:-translate-y-2 border-2 border-gray-200 hover:border-emerald-200 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="relative z-10">
        <div
          className={`flex items-center justify-center w-20 h-20 bg-gradient-to-br ${gradient} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg`}
        >
          {icon}
        </div>
        <h3 className="text-2xl font-semibold text-emerald-700 mb-4 group-hover:text-emerald-600 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-gray-600 leading-relaxed text-md">{description}</p>
        <div className="mt-6 flex items-center text-emerald-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span>Learn More</span>
          <svg
            className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
