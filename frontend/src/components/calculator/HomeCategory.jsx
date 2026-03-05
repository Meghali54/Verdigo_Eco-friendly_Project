import { Home, Zap, Flame } from "lucide-react";
import { CategoryCard } from "./CategoryCard";
import { SliderInput } from "./SliderInput";
import { Dropdown } from "./Dropdown";

const energySourceOptions = [
  { value: "renewable", label: "Renewable Energy", icon: "🌱" },
  { value: "mixed", label: "Mixed Sources", icon: "⚡" },
  { value: "nonRenewable", label: "Non-Renewable", icon: "🏭" },
];

const heatingTypeOptions = [
  { value: "electric", label: "Electric Heating", icon: "⚡" },
  { value: "gas", label: "Gas Heating", icon: "🔥" },
  { value: "oil", label: "Oil Heating", icon: "🛢️" },
];

export function HomeCategory({ data, onChange }) {
  return (
    <CategoryCard
      title="Home Emissions"
      description="Calculate emissions from your household energy consumption"
      icon={<Home className="h-5 w-5 text-green-500" />}
    >
      <SliderInput
        label="Monthly Electricity Usage"
        value={data.monthlyElectricity}
        onChange={(value) => onChange({ ...data, monthlyElectricity: value })}
        min={0}
        max={2000}
        step={25}
        unit="kWh"
      />

      <SliderInput
        label="Monthly Gas Consumption"
        value={data.gasConsumption}
        onChange={(value) => onChange({ ...data, gasConsumption: value })}
        min={0}
        max={500}
        step={10}
        unit="m³"
      />

      <Dropdown
        label="Primary Energy Source"
        value={data.energySource}
        onChange={(value) => onChange({ ...data, energySource: value })}
        options={energySourceOptions}
        placeholder="Select energy source"
      />

      <Dropdown
        label="Heating Type"
        value={data.heatingType}
        onChange={(value) => onChange({ ...data, heatingType: value })}
        options={heatingTypeOptions}
        placeholder="Select heating type"
      />
    </CategoryCard>
  );
}
