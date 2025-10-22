// Emission factors (kg CO2 per unit)
const EMISSION_FACTORS = {
  // Travel (kg CO2 per km)
  petrol: 0.171,
  diesel: 0.159,
  electric: 0.041,
  hybrid: 0.109,
  flight: 0.255, // kg CO2 per km for domestic flights

  // Home (kg CO2 per kWh)
  renewable: 0.02,
  nonRenewable: 0.82,
  mixed: 0.42,

  // Food (kg CO2 per year)
  meatDaily: 2500,
  meatWeekly: 1200,
  meatMonthly: 800,
  meatRarely: 400,
  meatNever: 300,

  // Waste (kg CO2 per kg waste)
  wasteWithRecycling: 0.5,
  wasteWithoutRecycling: 1.2,
};

export function calculateTravelFootprint(data) {
  // Weekly driving emissions (converted to annual)
  const drivingEmissions =
    data.weeklyDistance * 52 * EMISSION_FACTORS[data.vehicleType];

  // Flight emissions (assuming average flight distance of 1000km)
  const flightEmissions = data.flightsPerYear * 1000 * EMISSION_FACTORS.flight;

  return (drivingEmissions + flightEmissions) / 1000; // Convert to tons
}

export function calculateHomeFootprint(data) {
  const factor =
    EMISSION_FACTORS[data.energySource.replace("-", "")] ||
    EMISSION_FACTORS.mixed;
  return (data.monthlyElectricity * 12 * factor) / 1000; // Convert to tons
}

export function calculateFoodFootprint(data) {
  let baseEmissions =
    EMISSION_FACTORS[
      `meat${data.meatFrequency.charAt(0).toUpperCase() + data.meatFrequency.slice(1)}`
    ] || EMISSION_FACTORS.meatRarely;

  // Adjust for diet type
  if (data.dietType === "vegetarian") {
    baseEmissions *= 0.7;
  } else if (data.dietType === "vegan") {
    baseEmissions *= 0.5;
  }

  // Adjust for local food
  const localFoodReduction = (data.localFoodPercentage / 100) * 0.2;
  baseEmissions *= 1 - localFoodReduction;

  return baseEmissions / 1000; // Convert to tons
}

export function calculateWasteFootprint(data) {
  const factor = data.recycling
    ? EMISSION_FACTORS.wasteWithRecycling
    : EMISSION_FACTORS.wasteWithoutRecycling;
  let emissions = data.weeklyWaste * 52 * factor;

  // Composting reduces food waste emissions by 50%
  if (data.compost) {
    emissions *= 0.8;
  }

  return emissions / 1000; // Convert to tons
}

export function calculateTotalFootprint(travel, home, food, waste) {
  const travelFootprint = calculateTravelFootprint(travel);
  const homeFootprint = calculateHomeFootprint(home);
  const foodFootprint = calculateFoodFootprint(food);
  const wasteFootprint = calculateWasteFootprint(waste);

  return {
    travel: travelFootprint,
    home: homeFootprint,
    food: foodFootprint,
    waste: wasteFootprint,
    total: travelFootprint + homeFootprint + foodFootprint + wasteFootprint,
  };
}

export function getGlobalAverage() {
  return {
    travel: 2.3,
    home: 3.1,
    food: 2.8,
    waste: 0.8,
    total: 9.0,
  };
}

export function generateSuggestions(footprint) {
  const suggestions = [];
  const global = getGlobalAverage();

  if (footprint.travel > global.travel) {
    suggestions.push(
      "🚗 Consider carpooling, public transport, or electric vehicles",
    );
    suggestions.push(
      "✈️ Reduce air travel or choose direct flights when possible",
    );
  }

  if (footprint.home > global.home) {
    suggestions.push("💡 Switch to LED bulbs and energy-efficient appliances");
    suggestions.push("🔋 Consider renewable energy sources for your home");
  }

  if (footprint.food > global.food) {
    suggestions.push("🥬 Reduce meat consumption and try plant-based meals");
    suggestions.push("🏪 Buy local and seasonal produce when possible");
  }

  if (footprint.waste > global.waste) {
    suggestions.push("♻️ Increase recycling and composting efforts");
    suggestions.push("📦 Reduce single-use items and packaging");
  }

  if (suggestions.length === 0) {
    suggestions.push(
      "🌟 Great job! You're below global averages in all categories",
    );
    suggestions.push(
      "🌱 Share your eco-friendly habits with friends and family",
    );
  }

  return suggestions;
}
