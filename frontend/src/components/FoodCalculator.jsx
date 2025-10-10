import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Utensils, Leaf } from "lucide-react";

export function FoodCalculator({ data, onChange }) {
  const handleLocalFoodChange = (value) => {
    const newValue = Math.max(0, Math.min(100, value[0])); // Ensure between 0-100
    onChange({ ...data, localFoodPercentage: newValue });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Utensils className="h-5 w-5 text-orange-500" />
          Food & Diet
        </CardTitle>
        <CardDescription>
          Tell us about your eating habits and food preferences
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Meat Consumption Frequency</Label>
          <Select
            value={data.meatFrequency}
            onValueChange={(value) =>
              onChange({ ...data, meatFrequency: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="How often do you eat meat?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">🥩 Daily</SelectItem>
              <SelectItem value="weekly">🍖 Several times a week</SelectItem>
              <SelectItem value="monthly">🥘 Few times a month</SelectItem>
              <SelectItem value="rarely">🌿 Rarely</SelectItem>
              <SelectItem value="never">🚫 Never</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Diet Type</Label>
          <Select
            value={data.dietType}
            onValueChange={(value) => onChange({ ...data, dietType: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select your diet type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="omnivore">🍽️ Omnivore</SelectItem>
              <SelectItem value="vegetarian">🥗 Vegetarian</SelectItem>
              <SelectItem value="vegan">🌱 Vegan</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Leaf className="h-4 w-4" />
            Local Food Percentage: {data.localFoodPercentage}%
          </Label>
          <Slider
            value={[data.localFoodPercentage]}
            onValueChange={handleLocalFoodChange}
            max={100}
            step={5}
            className="w-full"
          />
          <div className="text-xs text-gray-500">
            How much of your food comes from local sources?
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
