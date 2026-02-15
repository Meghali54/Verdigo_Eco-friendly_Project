import { Utensils } from "lucide-react";
import { CategoryCard } from "./CategoryCard";
import { SliderInput } from "./SliderInput";
import { Dropdown } from "./Dropdown";

const dietTypeOptions = [
  { value: "vegan", label: "Vegan", icon: "🌱" },
  { value: "vegetarian", label: "Vegetarian", icon: "🥗" },
  { value: "mixed", label: "Mixed Diet", icon: "🍽️" },
  { value: "heavyMeat", label: "Heavy Meat", icon: "🥩" },
];

export function FoodCategory({ data, onChange }) {
  return (
    <CategoryCard
      title="Food"
      description="Calculate emissions from your dietary choices and eating habits"
      icon={<Utensils className="h-5 w-5 text-orange-500" />}
    >
      <Dropdown
        label="Diet Type"
        value={data.dietType}
        onChange={(value) => onChange({ ...data, dietType: value })}
        options={dietTypeOptions}
        placeholder="Select diet type"
      />

      <SliderInput
        label="Meat Servings per Week"
        value={data.meatServingsPerWeek}
        onChange={(value) => onChange({ ...data, meatServingsPerWeek: value })}
        min={0}
        max={21}
        step={1}
        unit="servings"
      />

      <SliderInput
        label="Dairy Servings per Week"
        value={data.dairyServingsPerWeek}
        onChange={(value) => onChange({ ...data, dairyServingsPerWeek: value })}
        min={0}
        max={21}
        step={1}
        unit="servings"
      />

      <SliderInput
        label="Grains Servings per Week"
        value={data.grainsServingsPerWeek}
        onChange={(value) =>
          onChange({ ...data, grainsServingsPerWeek: value })
        }
        min={0}
        max={35}
        step={1}
        unit="servings"
      />

      <SliderInput
        label="Fruits Servings per Week"
        value={data.fruitsServingsPerWeek}
        onChange={(value) =>
          onChange({ ...data, fruitsServingsPerWeek: value })
        }
        min={0}
        max={35}
        step={1}
        unit="servings"
      />

      <SliderInput
        label="Vegetables Servings per Week"
        value={data.vegetablesServingsPerWeek}
        onChange={(value) =>
          onChange({ ...data, vegetablesServingsPerWeek: value })
        }
        min={0}
        max={35}
        step={1}
        unit="servings"
      />
    </CategoryCard>
  );
}
