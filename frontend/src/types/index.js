export const createLocationData = (
  city,
  country = null,
  lat = null,
  lon = null,
) => ({
  city,
  country,
  lat,
  lon,
});

// Weather data structure
export const createWeatherData = (
  temperature,
  humidity,
  windSpeed,
  pressure = null,
  visibility = null,
) => ({
  temperature,
  humidity,
  windSpeed,
  pressure,
  visibility,
});

// Air quality data structure
export const createAirQualityData = (aqi, pm25, pm10, o3, no2, so2, co) => ({
  aqi,
  pm25,
  pm10,
  o3,
  no2,
  so2,
  co,
});

// Environmental data structure
export const createEnvironmentalData = (
  location,
  weather,
  airQuality,
  timestamp,
) => ({
  location,
  weather,
  airQuality,
  timestamp,
});

// AQI levels
export const AQI_LEVELS = {
  GOOD: "Good",
  MODERATE: "Moderate",
  UNHEALTHY_SENSITIVE: "Unhealthy for Sensitive Groups",
  UNHEALTHY: "Unhealthy",
  VERY_UNHEALTHY: "Very Unhealthy",
  HAZARDOUS: "Hazardous",
};
