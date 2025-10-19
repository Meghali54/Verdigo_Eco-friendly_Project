// Mock weather and air quality data generator
export const generateMockData = (location) => {
  // Generate realistic but random data
  const baseAQI = Math.floor(Math.random() * 200) + 20;

  return {
    location: {
      city: location.city,
      country: location.country || getCountryForCity(location.city),
      lat: location.lat || Math.random() * 180 - 90,
      lon: location.lon || Math.random() * 360 - 180,
    },
    weather: {
      temperature: Math.floor(Math.random() * 35) + 5, // 5-40°C
      humidity: Math.floor(Math.random() * 60) + 30, // 30-90%
      windSpeed: Math.floor(Math.random() * 25) + 5, // 5-30 km/h
      pressure: Math.floor(Math.random() * 100) + 980, // 980-1080 hPa
      visibility: Math.floor(Math.random() * 15) + 5, // 5-20 km
    },
    airQuality: {
      aqi: baseAQI,
      pm25: Math.floor(baseAQI * 0.8 + Math.random() * 20), // Correlated with AQI
      pm10: Math.floor(baseAQI * 1.2 + Math.random() * 30),
      o3: Math.floor(Math.random() * 150) + 20,
      no2: Math.floor(Math.random() * 80) + 10,
      so2: Math.floor(Math.random() * 50) + 5,
      co: (Math.random() * 8 + 1).toFixed(1), // 1-9 mg/m³
    },
    timestamp: new Date().toISOString(),
    forecast: generateForecast(), // 7-day forecast
  };
};

// Helper function to get country for major cities
const getCountryForCity = (city) => {
  const cityToCountry = {
    "New York": "United States",
    London: "United Kingdom",
    Tokyo: "Japan",
    Paris: "France",
    Delhi: "India",
    Mumbai: "India",
    Kolkata: "India",
    Bangalore: "India",
    Beijing: "China",
    Shanghai: "China",
    Sydney: "Australia",
    Toronto: "Canada",
    Berlin: "Germany",
    Rome: "Italy",
    Madrid: "Spain",
    Moscow: "Russia",
    Seoul: "South Korea",
    Bangkok: "Thailand",
    Singapore: "Singapore",
    Dubai: "UAE",
  };

  return cityToCountry[city] || "Unknown";
};

// Generate 7-day forecast
const generateForecast = () => {
  const forecast = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);

    forecast.push({
      date: date.toISOString().split("T")[0],
      aqi: Math.floor(Math.random() * 150) + 30,
      temperature: Math.floor(Math.random() * 25) + 10,
      condition: ["Good", "Moderate", "Unhealthy for Sensitive Groups"][
        Math.floor(Math.random() * 3)
      ],
    });
  }
  return forecast;
};

// Simulate geolocation
export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (error) => {
        reject(error);
      },
    );
  });
};

// Sample cities with coordinates
export const sampleCities = [
  { city: "New York", country: "United States", lat: 40.7128, lon: -74.006 },
  { city: "London", country: "United Kingdom", lat: 51.5074, lon: -0.1278 },
  { city: "Tokyo", country: "Japan", lat: 35.6762, lon: 139.6503 },
  { city: "Paris", country: "France", lat: 48.8566, lon: 2.3522 },
  { city: "Delhi", country: "India", lat: 28.7041, lon: 77.1025 },
  { city: "Mumbai", country: "India", lat: 19.076, lon: 72.8777 },
  { city: "Kolkata", country: "India", lat: 22.5726, lon: 88.3639 },
  { city: "Bangalore", country: "India", lat: 12.9716, lon: 77.5946 },
];
