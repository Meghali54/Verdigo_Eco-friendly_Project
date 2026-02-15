import { Car, Bus, Train, Plane } from "lucide-react";
import { CategoryCard } from "./CategoryCard";
import { SliderInput } from "./SliderInput";
import { Dropdown } from "./Dropdown";

const fuelTypeOptions = [
  { value: "electric", label: "Electric Vehicle", icon: "🔋" },
  { value: "hybrid", label: "Hybrid", icon: "⚡" },
  { value: "petrol", label: "Petrol/Gasoline", icon: "⛽" },
  { value: "diesel", label: "Diesel", icon: "🛢️" },
];

export function TransportCategory({ data, onChange }) {
  return (
    <CategoryCard
      title="Transportation"
      description="Track emissions from your travel and commuting habits"
      icon={<Car className="h-5 w-5 text-blue-500" />}
    >
      <Dropdown
        label="Car Fuel Type"
        value={data.carFuelType}
        onChange={(value) => onChange({ ...data, carFuelType: value })}
        options={fuelTypeOptions}
        placeholder="Select fuel type"
      />

      <SliderInput
        label="Car Distance per Week"
        value={data.carKmPerWeek}
        onChange={(value) => onChange({ ...data, carKmPerWeek: value })}
        min={0}
        max={1000}
        step={10}
        unit="km"
      />

      <SliderInput
        label="Bus Distance per Week"
        value={data.busKmPerWeek}
        onChange={(value) => onChange({ ...data, busKmPerWeek: value })}
        min={0}
        max={200}
        step={5}
        unit="km"
      />

      <SliderInput
        label="Train Distance per Week"
        value={data.trainKmPerWeek}
        onChange={(value) => onChange({ ...data, trainKmPerWeek: value })}
        min={0}
        max={500}
        step={10}
        unit="km"
      />

      <SliderInput
        label="Short-haul Flights per Year"
        value={data.shortHaulFlights}
        onChange={(value) => onChange({ ...data, shortHaulFlights: value })}
        min={0}
        max={20}
        step={1}
        unit="flights"
      />

      <SliderInput
        label="Long-haul Flights per Year"
        value={data.longHaulFlights}
        onChange={(value) => onChange({ ...data, longHaulFlights: value })}
        min={0}
        max={10}
        step={1}
        unit="flights"
      />
    </CategoryCard>
  );
}
