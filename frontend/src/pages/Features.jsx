import React from "react";
import { useNavigate } from "react-router-dom";

const featuresData = [
  {
    title: "🧮 Carbon Footprint Calculator",
    points: [
      "Calculate your environmental impact across home, travel, food, and waste",
      "Home Energy Usage: Electricity, heating, and cooling",
      "Transportation: Car, public transit, flights",
      "Food Consumption: Diet choices and food waste",
      "Waste Generation: Recycling and disposal habits",
    ],
  },
  {
    title: "🌬️ Air Quality Monitoring (AirBuddy)",
    points: [
      "Real-time air quality index (AQI) data",
      "Health recommendations based on air quality",
      "Historical air quality trends",
      "Location-based alerts",
    ],
  },
  {
    title: "🗺️ Green Lane Navigation",
    points: [
      "Eco-friendly route planning and green transportation options",
      "Carbon footprint comparison between transport modes",
      "Electric vehicle charging station locations",
      "Public transportation integration",
    ],
  },
  {
    title: "🥬 Local Harvest",
    points: [
      "Discover local, sustainable food sources and farmers markets",
      "Farmers market locations and schedules",
      "Local sustainable food producers",
      "Seasonal produce availability",
      "Community garden locations",
    ],
  },
  {
    title: "♻️ WasteLess",
    points: [
      "Waste reduction tips, recycling guidance, and sustainability practices",
      "Track your waste generation and recycling habits",
      "Personalized suggestions to minimize waste",
      "Visualize your waste trends over time",
      
    ],
  },
  {
    title: "📊 Interactive Dashboard",
    points: [
      "Comprehensive overview of your environmental impact",
      "Visual charts and graphs for carbon, waste, and air quality",
      "Track your progress and set sustainability goals",
    
    ],
  },
  {
    title: "🗺️ Interactive Maps",
    points: [
      "Location-based environmental data and services",
    ],
  },
];

const Features = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-200 via-green-100 to-teal-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-16 px-6 transition-colors duration-500">

      <div className="max-w-7xl mx-auto">

        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="mb-12 px-6 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 
          hover:from-teal-500 hover:to-emerald-500 
          text-white rounded-full shadow-lg hover:shadow-xl 
          transition-all duration-300 transform hover:scale-105"
        >
          ← Back to Home
        </button>

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-emerald-700 dark:text-emerald-400 font-semibold tracking-widest uppercase">
            Features
          </p>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent mt-3">
            Our Features & Services
          </h1>
          <p className="mt-4 text-gray-700 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Explore the key features of our Verdigo Eco-friendly Project.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {featuresData.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white/70 dark:bg-white/10 backdrop-blur-lg 
              border border-white/40 dark:border-white/20
              rounded-3xl p-8 shadow-lg 
              hover:shadow-2xl 
              transition-all duration-500 
              transform hover:-translate-y-3 hover:scale-[1.03]"
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-400 to-teal-500 opacity-0 group-hover:opacity-10 transition duration-500"></div>

              {/* Title */}
              <h2 className="relative text-xl font-bold text-emerald-800 dark:text-white mb-4 group-hover:text-teal-600 transition duration-300">
                {feature.title}
              </h2>

              {/* Points */}
              <ul className="relative list-disc ml-5 space-y-2 text-gray-800 dark:text-gray-300 text-sm leading-relaxed">
                {feature.points.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>

              {/* Button */}
              <button
                className="relative mt-8 w-full py-2 rounded-full 
                bg-gradient-to-r from-emerald-500 to-teal-500 
                hover:from-teal-500 hover:to-emerald-500
                text-white text-sm font-semibold 
                shadow-md hover:shadow-lg 
                transition-all duration-300 
                transform hover:scale-105"
              >
                More
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Features;
