import axios from "axios";

// OpenWeatherMap API configuration
const API_KEY = "7c9e2b8f4a3d1e5c6b9a8d7f2e4c1b3a"; // Demo key - replace with real key
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export async function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by this browser"));
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
        let message = "Unable to retrieve location";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            message = "Location access denied by user";
            break;
          case error.POSITION_UNAVAILABLE:
            message = "Location information unavailable";
            break;
          case error.TIMEOUT:
            message = "Location request timed out";
            break;
        }
        reject(new Error(message));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5 minutes
      },
    );
  });
}

export async function getAQIData(lat, lon) {
  try {
    // Get current air pollution data
    const airResponse = await axios.get(`${BASE_URL}/air_pollution`, {
      params: {
        lat,
        lon,
        appid: API_KEY,
      },
    });

    // Get historical data (48 hours)
    const end = Math.floor(Date.now() / 1000);
    const start = end - 48 * 60 * 60; // 48 hours ago

    const historyResponse = await axios.get(
      `${BASE_URL}/air_pollution/history`,
      {
        params: {
          lat,
          lon,
          start,
          end,
          appid: API_KEY,
        },
      },
    );

    // Get location name
    const geoResponse = await axios.get(`${BASE_URL}/weather`, {
      params: {
        lat,
        lon,
        appid: API_KEY,
      },
    });

    return {
      current: airResponse.data,
      history: historyResponse.data,
      location: {
        name: geoResponse.data.name,
        country: geoResponse.data.sys.country,
        lat,
        lon,
      },
    };
  } catch (error) {
    console.error("API Error:", error);
    throw new Error("Failed to fetch air quality data");
  }
}

export async function getAQIByCity(cityName) {
  try {
    // Get coordinates for city
    const geoResponse = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: cityName,
        appid: API_KEY,
      },
    });

    const { lat, lon } = geoResponse.data.coord;
    return await getAQIData(lat, lon);
  } catch (error) {
    console.error(`Error fetching data for city ${cityName}:`, error);
    throw new Error(`Failed to fetch data for ${cityName}`);
  }
}

// Convert OpenWeatherMap AQI (1-5) to standard AQI (0-500)
export function convertToStandardAQI(owmAqi, pollutants) {
  // Calculate AQI based on PM2.5 if available
  if (pollutants.pm2_5) {
    return calculatePM25AQI(pollutants.pm2_5);
  }

  // Fallback mapping
  const aqiMap = {
    1: 25, // Good (0-50)
    2: 75, // Fair (51-100)
    3: 125, // Moderate (101-150)
    4: 175, // Poor (151-200)
    5: 250, // Very Poor (201-300)
  };

  return aqiMap[owmAqi] || 100;
}

function calculatePM25AQI(pm25) {
  // EPA AQI calculation for PM2.5
  const breakpoints = [
    { low: 0, high: 12, aqiLow: 0, aqiHigh: 50 },
    { low: 12.1, high: 35.4, aqiLow: 51, aqiHigh: 100 },
    { low: 35.5, high: 55.4, aqiLow: 101, aqiHigh: 150 },
    { low: 55.5, high: 150.4, aqiLow: 151, aqiHigh: 200 },
    { low: 150.5, high: 250.4, aqiLow: 201, aqiHigh: 300 },
    { low: 250.5, high: 500.4, aqiLow: 301, aqiHigh: 500 },
  ];

  for (const bp of breakpoints) {
    if (pm25 >= bp.low && pm25 <= bp.high) {
      return Math.round(
        ((bp.aqiHigh - bp.aqiLow) / (bp.high - bp.low)) * (pm25 - bp.low) +
          bp.aqiLow,
      );
    }
  }

  return pm25 > 500 ? 500 : 0;
}

// Generate mock data as fallback
export function generateMockAQIData(location) {
  const now = new Date();
  const history = [];

  // Generate 48 hours of mock data
  for (let i = 48; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60 * 60 * 1000);
    const baseAQI = 75 + Math.sin(i * 0.1) * 25 + Math.random() * 20;

    history.push({
      dt: Math.floor(time.getTime() / 1000),
      main: { aqi: Math.max(1, Math.min(5, Math.round(baseAQI / 50))) },
      components: {
        pm2_5: Math.max(5, baseAQI * 0.4 + Math.random() * 10),
        pm10: Math.max(10, baseAQI * 0.6 + Math.random() * 15),
        no2: Math.max(10, baseAQI * 0.3 + Math.random() * 20),
        o3: Math.max(20, baseAQI * 0.5 + Math.random() * 30),
        co: Math.max(200, baseAQI * 2 + Math.random() * 100),
        so2: Math.max(5, baseAQI * 0.2 + Math.random() * 10),
      },
    });
  }

  return {
    current: {
      list: [history[history.length - 1]],
    },
    history: {
      list: history,
    },
    location: {
      name: location?.name || "Demo City",
      country: location?.country || "US",
      lat: location?.lat || 40.7128,
      lon: location?.lon || -74.006,
    },
  };
}
