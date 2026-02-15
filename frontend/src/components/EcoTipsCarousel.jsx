import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Lightbulb,
  Leaf,
  Droplets,
  Wind,
  Zap,
  Recycle,
  MapPin,
  TreePine,
  Heart,
  Sun,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ecoTips = [
  {
    id: 1,
    title: "Start Small",
    description:
      "Begin with simple changes like using reusable bags and bottles. Small actions compound into big impact over time.",
    icon: <Lightbulb className="w-8 h-8 text-yellow-500" />,
    color: "from-yellow-50 to-yellow-100",
    accent: "text-yellow-600",
    tip: "💡 Reusable bags save 700+ plastic bags per year per person",
  },
  {
    id: 2,
    title: "Local Shopping",
    description:
      "Support local farmers and reduce transportation emissions. Fresh, seasonal produce is better for you and the planet.",
    icon: <MapPin className="w-8 h-8 text-green-500" />,
    color: "from-green-50 to-green-100",
    accent: "text-green-600",
    tip: "🌍 Local food reduces carbon footprint by up to 50%",
  },
  {
    id: 3,
    title: "Energy Saving",
    description:
      "Switch to LED bulbs and unplug unused devices. They consume 75% less energy than incandescent bulbs.",
    icon: <Zap className="w-8 h-8 text-blue-500" />,
    color: "from-blue-50 to-blue-100",
    accent: "text-blue-600",
    tip: "⚡ LED bulbs last 25 times longer than traditional bulbs",
  },
  {
    id: 4,
    title: "Reduce Water Waste",
    description:
      "Take shorter showers and fix leaky faucets. Saving water saves energy used for pumping and heating.",
    icon: <Droplets className="w-8 h-8 text-cyan-500" />,
    color: "from-cyan-50 to-cyan-100",
    accent: "text-cyan-600",
    tip: "💧 A 5-minute shower saves 12.5 gallons of water",
  },
  {
    id: 5,
    title: "Sustainable Transport",
    description:
      "Choose walking, cycling, or public transit. Transportation accounts for 27% of greenhouse gas emissions.",
    icon: <Wind className="w-8 h-8 text-teal-500" />,
    color: "from-teal-50 to-teal-100",
    accent: "text-teal-600",
    tip: "🚴 Biking instead of driving saves 0.9 kg CO2 per trip",
  },
  {
    id: 6,
    title: "Reduce, Reuse, Recycle",
    description:
      "Practice the 3 R's to minimize waste. Buy less, use more, and recycle everything possible.",
    icon: <Recycle className="w-8 h-8 text-emerald-500" />,
    color: "from-emerald-50 to-emerald-100",
    accent: "text-emerald-600",
    tip: "♻️ Recycling one aluminum can saves enough energy to power a laptop for 3 hours",
  },
  {
    id: 7,
    title: "Plant Trees",
    description:
      "One tree absorbs 48 lbs of CO2 annually. Plant trees in your yard or support reforestation projects.",
    icon: <TreePine className="w-8 h-8 text-lime-600" />,
    color: "from-lime-50 to-lime-100",
    accent: "text-lime-700",
    tip: "🌳 A mature tree produces oxygen for 2 people per year",
  },
  {
    id: 8,
    title: "Eco-Friendly Diet",
    description:
      "Reduce meat consumption. Livestock farming is a major source of greenhouse gas emissions.",
    icon: <Leaf className="w-8 h-8 text-green-600" />,
    color: "from-green-100 to-emerald-100",
    accent: "text-green-700",
    tip: "🥗 Eating plant-based one day per week saves 0.5 tons CO2 annually",
  },
  {
    id: 9,
    title: "Mindful Consumption",
    description:
      "Buy what you need, not what you want. Every product has an environmental cost from production to disposal.",
    icon: <Heart className="w-8 h-8 text-pink-500" />,
    color: "from-pink-50 to-pink-100",
    accent: "text-pink-600",
    tip: "❤️ Before buying, ask: Do I need this? Will I use it?",
  },
  {
    id: 10,
    title: "Community Action",
    description:
      "Join local environmental groups and participate in clean-ups. Collective action multiplies individual efforts.",
    icon: <Sun className="w-8 h-8 text-orange-500" />,
    color: "from-orange-50 to-orange-100",
    accent: "text-orange-600",
    tip: "🌞 Community groups can plant 1000s of trees annually",
  },
];

const EcoTipsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [displayedTips, setDisplayedTips] = useState([0, 1, 2]);

  // Auto-rotate carousel every 6 seconds
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      handleNext();
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % ecoTips.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + ecoTips.length) % ecoTips.length);
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  // Update displayed tips based on current index
  useEffect(() => {
    setDisplayedTips([
      currentIndex,
      (currentIndex + 1) % ecoTips.length,
      (currentIndex + 2) % ecoTips.length,
    ]);
  }, [currentIndex]);

  const currentTip = ecoTips[currentIndex];

  return (
    <div className="w-full">
      {/* Main Carousel */}
      <div className="relative mb-8">
        {/* Carousel Container */}
        <div className="relative overflow-hidden rounded-2xl shadow-lg">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-teal-400 to-green-400 opacity-10 animate-pulse"></div>

          {/* Card Stack Effect */}
          <div className="relative">
            {/* Main Card */}
            <Card
              className={`bg-gradient-to-br ${currentTip.color} border-2 border-opacity-50 p-8 md:p-12 min-h-[300px] flex flex-col justify-between relative overflow-hidden group`}
            >
              {/* Decorative Background Elements */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-5 rounded-full -mr-20 -mt-20 group-hover:scale-110 transition-transform duration-500"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-5 rounded-full -ml-16 -mb-16 group-hover:scale-110 transition-transform duration-500"></div>

              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className="mb-6 inline-block p-4 bg-white rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  {currentTip.icon}
                </div>

                {/* Title and Description */}
                <h3
                  className={`text-3xl md:text-4xl font-bold mb-4 ${currentTip.accent}`}
                >
                  {currentTip.title}
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed mb-6 max-w-2xl">
                  {currentTip.description}
                </p>

                {/* Fact Box */}
                <div className="bg-white bg-opacity-60 backdrop-blur-sm rounded-lg p-4 inline-block">
                  <p className="text-sm font-semibold text-gray-800">
                    {currentTip.tip}
                  </p>
                </div>
              </div>

              {/* Tip Counter */}
              <div className="absolute top-6 right-6 bg-white bg-opacity-80 rounded-full px-4 py-2 font-bold text-sm shadow-md">
                <span className={currentTip.accent}>{currentIndex + 1}</span>
                <span className="text-gray-600">/{ecoTips.length}</span>
              </div>
            </Card>

            {/* Navigation Buttons */}
            <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 md:px-6 pointer-events-none">
              <Button
                onClick={() => {
                  handlePrev();
                  setIsAutoPlaying(false);
                }}
                className="pointer-events-auto bg-white hover:bg-gray-100 text-gray-800 shadow-lg rounded-full p-3 h-12 w-12 flex items-center justify-center transition-all duration-300 hover:scale-110"
                variant="ghost"
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>
              <Button
                onClick={() => {
                  handleNext();
                  setIsAutoPlaying(false);
                }}
                className="pointer-events-auto bg-white hover:bg-gray-100 text-gray-800 shadow-lg rounded-full p-3 h-12 w-12 flex items-center justify-center transition-all duration-300 hover:scale-110"
                variant="ghost"
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </div>

        {/* Auto-play Indicator */}
        <div className="flex items-center justify-center mt-4 space-x-3">
          <div className="flex items-center space-x-2">
            <div
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                isAutoPlaying ? "bg-blue-500 animate-pulse" : "bg-gray-400"
              }`}
            ></div>
            <span className="text-sm text-muted-foreground font-medium">
              {isAutoPlaying ? "Auto-playing" : "Paused"}
            </span>
          </div>
        </div>
      </div>

      {/* Dot Navigation */}
      <div className="flex items-center justify-center space-x-3 mb-8">
        {ecoTips.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-blue-600 w-3 h-3 shadow-lg"
                : "bg-gray-300 w-2 h-2 hover:bg-gray-400"
            }`}
            aria-label={`Go to tip ${index + 1}`}
          />
        ))}
      </div>

      {/* Preview Cards - Next Tips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {displayedTips.slice(1).map((tipIndex) => {
          const tip = ecoTips[tipIndex];
          return (
            <button
              key={tip.id}
              onClick={() => {
                setCurrentIndex(tipIndex);
                setIsAutoPlaying(false);
              }}
              className={`bg-gradient-to-br ${tip.color} rounded-xl p-4 border-2 border-opacity-30 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer text-left group`}
            >
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-white rounded-lg shadow-sm group-hover:scale-110 transition-transform duration-300">
                  {tip.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h4
                    className={`font-bold text-sm ${tip.accent} mb-1 group-hover:translate-x-1 transition-transform duration-300`}
                  >
                    {tip.title}
                  </h4>
                  <p className="text-xs text-gray-700 line-clamp-2">
                    {tip.description}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Tips Counter and Info */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-gray-700">
          <span className="font-bold text-blue-600">
            {ecoTips.length} Eco Tips
          </span>{" "}
          to help you live sustainably. Tips rotate automatically or click the
          arrows to navigate.
        </p>
      </div>
    </div>
  );
};

export default EcoTipsCarousel;
