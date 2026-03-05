// Carbon footprint calculation formulas and constants
// All emissions are calculated in kg CO2e per year

export const EMISSION_FACTORS = {
  electricity: {
    renewable: 0.02,
    mixed: 0.42,
    nonRenewable: 0.82,
  },
  gas: 2.0,
  oil: 2.5,
  transport: {
    petrol: 0.171,
    diesel: 0.159,
    electric: 0.041,
    hybrid: 0.109,
    bus: 0.089,
    train: 0.041,
    flight: {
      shortHaul: 0.255,
      longHaul: 0.195,
    },
  },
  food: {
    meat: 3.3,
    dairy: 1.9,
    grains: 0.4,
    fruits: 0.3,
    vegetables: 0.2,
  },
  diet: {
    vegan: 0.5,
    vegetarian: 0.7,
    mixed: 1.0,
    heavyMeat: 1.4,
  },
  waste: {
    landfill: 1.2,
    recycled: 0.1,
    composted: 0.05,
  },
};

export function calculateHomeEmissions(data) {
  // Electricity emissions
  const electricityFactor = EMISSION_FACTORS.electricity[data.energySource];
  const electricityEmissions = data.monthlyElectricity * 12 * electricityFactor;

  // Gas heating emissions
  const gasEmissions =
    data.heatingType === "gas"
      ? data.gasConsumption * 12 * EMISSION_FACTORS.gas
      : 0;

  // Oil heating emissions (assuming 100L per month if oil heating)
  const oilEmissions =
    data.heatingType === "oil" ? 100 * 12 * EMISSION_FACTORS.oil : 0;

  return (electricityEmissions + gasEmissions + oilEmissions) / 1000; // Convert to tons
}

export function calculateTransportEmissions(data) {
  // Car emissions (weekly to annual)
  const carEmissions =
    data.carKmPerWeek * 52 * EMISSION_FACTORS.transport[data.carFuelType];

  // Public transport emissions
  const busEmissions = data.busKmPerWeek * 52 * EMISSION_FACTORS.transport.bus;
  const trainEmissions =
    data.trainKmPerWeek * 52 * EMISSION_FACTORS.transport.train;

  // Flight emissions (assuming average distances)
  const shortFlightEmissions =
    data.shortHaulFlights * 500 * EMISSION_FACTORS.transport.flight.shortHaul;
  const longFlightEmissions =
    data.longHaulFlights * 3000 * EMISSION_FACTORS.transport.flight.longHaul;

  return (
    (carEmissions +
      busEmissions +
      trainEmissions +
      shortFlightEmissions +
      longFlightEmissions) /
    1000
  );
}

export function calculateFoodEmissions(data) {
  // Calculate base emissions from servings
  const meatEmissions =
    data.meatServingsPerWeek * 52 * EMISSION_FACTORS.food.meat;
  const dairyEmissions =
    data.dairyServingsPerWeek * 52 * EMISSION_FACTORS.food.dairy;
  const grainsEmissions =
    data.grainsServingsPerWeek * 52 * EMISSION_FACTORS.food.grains;
  const fruitsEmissions =
    data.fruitsServingsPerWeek * 52 * EMISSION_FACTORS.food.fruits;
  const vegetablesEmissions =
    data.vegetablesServingsPerWeek * 52 * EMISSION_FACTORS.food.vegetables;

  const baseEmissions =
    meatEmissions +
    dairyEmissions +
    grainsEmissions +
    fruitsEmissions +
    vegetablesEmissions;

  // Apply diet type multiplier
  const dietMultiplier = EMISSION_FACTORS.diet[data.dietType];

  return (baseEmissions * dietMultiplier) / 1000;
}

export function calculateWasteEmissions(data) {
  // Calculate recycling rate
  const recyclingItems = [
    data.recyclesPaper,
    data.recyclesPlastic,
    data.recyclesGlass,
    data.recyclesMetal,
  ];
  const recyclingRate =
    recyclingItems.filter(Boolean).length / recyclingItems.length;

  // Calculate waste emissions
  const totalWasteKg = data.landfillKgPerWeek * 52;
  const recycledWaste = totalWasteKg * recyclingRate;
  const landfillWaste = totalWasteKg * (1 - recyclingRate);

  let wasteEmissions =
    recycledWaste * EMISSION_FACTORS.waste.recycled +
    landfillWaste * EMISSION_FACTORS.waste.landfill;

  // Composting reduces organic waste emissions
  if (data.composts) {
    wasteEmissions *= 0.8; // 20% reduction for composting
  }

  return wasteEmissions / 1000;
}

export function calculateTotalFootprint(
  homeData,
  transportData,
  foodData,
  wasteData,
) {
  const home = calculateHomeEmissions(homeData);
  const transport = calculateTransportEmissions(transportData);
  const food = calculateFoodEmissions(foodData);
  const waste = calculateWasteEmissions(wasteData);

  return {
    home,
    transport,
    food,
    waste,
    total: home + transport + food + waste,
  };
}

export function getGlobalAverage() {
  return {
    home: 3.1,
    transport: 2.3,
    food: 2.8,
    waste: 0.8,
    total: 9.0,
  };
}

export function generateSuggestions(footprint) {
  const suggestions = [];
  const global = getGlobalAverage();

  if (footprint.transport > global.transport) {
    suggestions.push("🚗 Consider electric vehicles or public transport");
    suggestions.push("✈️ Reduce air travel or choose direct flights");
  }

  if (footprint.home > global.home) {
    suggestions.push("💡 Switch to renewable energy sources");
    suggestions.push("🏠 Improve home insulation and energy efficiency");
  }

  if (footprint.food > global.food) {
    suggestions.push("🌱 Reduce meat consumption");
    suggestions.push("🥬 Choose local and seasonal produce");
  }

  if (footprint.waste > global.waste) {
    suggestions.push("♻️ Increase recycling efforts");
    suggestions.push("🗂️ Start composting organic waste");
  }

  if (suggestions.length === 0) {
    suggestions.push("🌟 Great job! You're below global averages");
    suggestions.push("🌍 Share your eco-friendly habits with others");
  }

  return suggestions;
}
