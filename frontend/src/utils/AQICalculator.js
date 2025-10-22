// AQI calculation utilities
export class AQICalculator {
  // AQI breakpoints for different pollutants
  static AQI_BREAKPOINTS = {
    pm25: [
      { low: 0, high: 12.0, aqiLow: 0, aqiHigh: 50 },
      { low: 12.1, high: 35.4, aqiLow: 51, aqiHigh: 100 },
      { low: 35.5, high: 55.4, aqiLow: 101, aqiHigh: 150 },
      { low: 55.5, high: 150.4, aqiLow: 151, aqiHigh: 200 },
      { low: 150.5, high: 250.4, aqiLow: 201, aqiHigh: 300 },
      { low: 250.5, high: 350.4, aqiLow: 301, aqiHigh: 400 },
      { low: 350.5, high: 500.4, aqiLow: 401, aqiHigh: 500 },
    ],
    pm10: [
      { low: 0, high: 54, aqiLow: 0, aqiHigh: 50 },
      { low: 55, high: 154, aqiLow: 51, aqiHigh: 100 },
      { low: 155, high: 254, aqiLow: 101, aqiHigh: 150 },
      { low: 255, high: 354, aqiLow: 151, aqiHigh: 200 },
      { low: 355, high: 424, aqiLow: 201, aqiHigh: 300 },
      { low: 425, high: 504, aqiLow: 301, aqiHigh: 400 },
      { low: 505, high: 604, aqiLow: 401, aqiHigh: 500 },
    ],
  };

  // Calculate AQI for a specific pollutant
  static calculatePollutantAQI(concentration, pollutant) {
    const breakpoints = this.AQI_BREAKPOINTS[pollutant];
    if (!breakpoints) return null;

    for (let i = 0; i < breakpoints.length; i++) {
      const bp = breakpoints[i];
      if (concentration >= bp.low && concentration <= bp.high) {
        return Math.round(
          ((bp.aqiHigh - bp.aqiLow) / (bp.high - bp.low)) *
            (concentration - bp.low) +
            bp.aqiLow,
        );
      }
    }
    return 500; // Hazardous level
  }

  // Get overall AQI (highest among all pollutants)
  static calculateOverallAQI(pollutants) {
    const aqiValues = [];

    if (pollutants.pm25) {
      aqiValues.push(this.calculatePollutantAQI(pollutants.pm25, "pm25"));
    }
    if (pollutants.pm10) {
      aqiValues.push(this.calculatePollutantAQI(pollutants.pm10, "pm10"));
    }

    return Math.max(...aqiValues.filter((val) => val !== null));
  }

  // Get AQI category
  static getAQICategory(aqi) {
    if (aqi <= 50)
      return {
        level: "Good",
        color: "green",
        description: "Air quality is satisfactory",
      };
    if (aqi <= 100)
      return {
        level: "Moderate",
        color: "yellow",
        description: "Air quality is acceptable",
      };
    if (aqi <= 150)
      return {
        level: "Unhealthy for Sensitive Groups",
        color: "orange",
        description: "Sensitive groups may experience health effects",
      };
    if (aqi <= 200)
      return {
        level: "Unhealthy",
        color: "red",
        description: "Everyone may experience health effects",
      };
    if (aqi <= 300)
      return {
        level: "Very Unhealthy",
        color: "purple",
        description: "Health warnings of emergency conditions",
      };
    return {
      level: "Hazardous",
      color: "maroon",
      description:
        "Health alert: everyone may experience serious health effects",
    };
  }

  // Get health recommendations based on AQI
  static getHealthRecommendations(aqi) {
    const category = this.getAQICategory(aqi);

    const recommendations = {
      Good: [
        "Perfect for outdoor activities",
        "Open windows for fresh air",
        "Great time for exercise outside",
      ],
      Moderate: [
        "Generally safe for outdoor activities",
        "Sensitive individuals should limit prolonged outdoor activities",
        "Consider air purifiers for indoor spaces",
      ],
      "Unhealthy for Sensitive Groups": [
        "Sensitive groups should limit outdoor activities",
        "Consider wearing masks when outside",
        "Use air purifiers indoors",
        "Limit outdoor exercise",
      ],
      Unhealthy: [
        "Avoid outdoor activities",
        "Keep windows closed",
        "Use air purifiers",
        "Wear N95 masks when outside",
      ],
      "Very Unhealthy": [
        "Stay indoors",
        "Avoid all outdoor activities",
        "Use high-quality air purifiers",
        "Seek medical attention if experiencing symptoms",
      ],
      Hazardous: [
        "Emergency conditions - stay indoors",
        "Avoid all outdoor exposure",
        "Use multiple air purifiers",
        "Seek immediate medical attention for any symptoms",
      ],
    };

    return recommendations[category.level] || [];
  }
}

// Export utility functions
export const getAQIColor = (aqi) => {
  if (aqi <= 50) return "bg-green-500";
  if (aqi <= 100) return "bg-yellow-500";
  if (aqi <= 150) return "bg-orange-500";
  if (aqi <= 200) return "bg-red-500";
  if (aqi <= 300) return "bg-purple-500";
  return "bg-red-800";
};

export const getAQITextColor = (aqi) => {
  if (aqi <= 50) return "text-green-700";
  if (aqi <= 100) return "text-yellow-700";
  if (aqi <= 150) return "text-orange-700";
  if (aqi <= 200) return "text-red-700";
  if (aqi <= 300) return "text-purple-700";
  return "text-red-900";
};
