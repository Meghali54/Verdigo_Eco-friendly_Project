// AQI utility functions for color coding and health recommendations

export function getAQIColor(aqi) {
  if (aqi <= 50) return "bg-green-500";
  if (aqi <= 100) return "bg-yellow-500";
  if (aqi <= 150) return "bg-orange-500";
  if (aqi <= 200) return "bg-red-500";
  if (aqi <= 300) return "bg-purple-500";
  return "bg-red-800";
}

export function getAQITextColor(aqi) {
  if (aqi <= 50) return "text-green-700";
  if (aqi <= 100) return "text-yellow-700";
  if (aqi <= 150) return "text-orange-700";
  if (aqi <= 200) return "text-red-700";
  if (aqi <= 300) return "text-purple-700";
  return "text-red-900";
}

export function getAQIBgColor(aqi) {
  if (aqi <= 50) return "bg-green-50 border-green-200";
  if (aqi <= 100) return "bg-yellow-50 border-yellow-200";
  if (aqi <= 150) return "bg-orange-50 border-orange-200";
  if (aqi <= 200) return "bg-red-50 border-red-200";
  if (aqi <= 300) return "bg-purple-50 border-purple-200";
  return "bg-red-100 border-red-300";
}

export function getAQILabel(aqi) {
  if (aqi <= 50) return "Good";
  if (aqi <= 100) return "Moderate";
  if (aqi <= 150) return "Unhealthy for Sensitive Groups";
  if (aqi <= 200) return "Unhealthy";
  if (aqi <= 300) return "Very Unhealthy";
  return "Hazardous";
}

export function getHealthRecommendations(aqi) {
  if (aqi <= 50) {
    return [
      "🌟 Perfect for outdoor activities",
      "🪟 Open windows for fresh air",
      "🏃‍♂️ Great day for exercise outside",
    ];
  }

  if (aqi <= 100) {
    return [
      "⚠️ Limit outdoor activities if sensitive",
      "🏠 Consider air purifiers indoors",
      "👥 Sensitive groups should reduce prolonged outdoor exertion",
    ];
  }

  if (aqi <= 150) {
    return [
      "🚫 Sensitive groups avoid outdoor activities",
      "😷 Consider wearing masks outdoors",
      "🪟 Keep windows closed",
      "💨 Use air purifiers indoors",
    ];
  }

  if (aqi <= 200) {
    return [
      "🚫 Avoid outdoor activities",
      "🪟 Keep windows closed",
      "😷 Wear N95 masks if going outside",
      "💨 Use air purifiers on high setting",
    ];
  }

  return [
    "🚨 Stay indoors at all times",
    "😷 Wear N95 masks even indoors",
    "💨 Use multiple air purifiers",
    "🏥 Seek medical attention if experiencing symptoms",
  ];
}

export function getPollutantInfo(pollutant) {
  const info = {
    pm2_5: {
      name: "PM2.5",
      fullName: "Fine Particulate Matter",
      unit: "µg/m³",
      description: "Particles smaller than 2.5 micrometers",
      color: "purple",
      maxSafe: 12,
    },
    pm10: {
      name: "PM10",
      fullName: "Coarse Particulate Matter",
      unit: "µg/m³",
      description: "Particles smaller than 10 micrometers",
      color: "blue",
      maxSafe: 50,
    },
    no2: {
      name: "NO₂",
      fullName: "Nitrogen Dioxide",
      unit: "µg/m³",
      description: "Gas from vehicle emissions",
      color: "red",
      maxSafe: 40,
    },
    o3: {
      name: "O₃",
      fullName: "Ozone",
      unit: "µg/m³",
      description: "Ground-level ozone",
      color: "orange",
      maxSafe: 100,
    },
    co: {
      name: "CO",
      fullName: "Carbon Monoxide",
      unit: "mg/m³",
      description: "Colorless, odorless gas",
      color: "gray",
      maxSafe: 10,
    },
    so2: {
      name: "SO₂",
      fullName: "Sulfur Dioxide",
      unit: "µg/m³",
      description: "Gas from fossil fuel burning",
      color: "green",
      maxSafe: 20,
    },
  };

  return (
    info[pollutant] || {
      name: pollutant.toUpperCase(),
      fullName: "Unknown Pollutant",
      unit: "µg/m³",
      description: "Air pollutant",
      color: "gray",
      maxSafe: 100,
    }
  );
}
