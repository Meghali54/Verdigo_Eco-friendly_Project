export function calculateBadges(footprint) {
  const badges = [
    {
      id: "eco-warrior",
      name: "Eco Warrior",
      description: "Total footprint under 5 tons per year",
      icon: "🌍",
      achieved: footprint.total < 5,
      threshold: 5,
    },
    {
      id: "green-commuter",
      name: "Green Commuter",
      description: "Low travel emissions",
      icon: "🚴",
      achieved: footprint.travel < 2,
      threshold: 2,
    },
    {
      id: "energy-saver",
      name: "Energy Saver",
      description: "Efficient home energy use",
      icon: "💡",
      achieved: footprint.home < 2.5,
      threshold: 2.5,
    },
    {
      id: "plant-lover",
      name: "Plant Lover",
      description: "Sustainable food choices",
      icon: "🌱",
      achieved: footprint.food < 2,
      threshold: 2,
    },
    {
      id: "waste-reducer",
      name: "Waste Reducer",
      description: "Minimal waste production",
      icon: "♻️",
      achieved: footprint.waste < 0.5,
      threshold: 0.5,
    },
    {
      id: "carbon-hero",
      name: "Carbon Hero",
      description: "Below global average in all categories",
      icon: "🦸",
      achieved:
        footprint.travel < 2.3 &&
        footprint.home < 3.1 &&
        footprint.food < 2.8 &&
        footprint.waste < 0.8,
    },
  ];

  return badges;
}
