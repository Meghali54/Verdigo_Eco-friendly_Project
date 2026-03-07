import { Trash2, Recycle } from "lucide-react";
import { CategoryCard } from "./CategoryCard";
import { SliderInput } from "./SliderInput";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export function WasteCategory({ data, onChange }) {
  return (
    <CategoryCard
      title="Waste"
      description="Track your waste production and recycling habits"
      icon={<Trash2 className="h-5 w-5 text-purple-500" />}
    >
      <SliderInput
        label="Landfill Waste per Week"
        value={data.landfillKgPerWeek}
        onChange={(value) => onChange({ ...data, landfillKgPerWeek: value })}
        min={0}
        max={50}
        step={1}
        unit="kg"
      />

      <div className="space-y-4">
        <Label className="text-sm font-medium flex items-center gap-2">
          <Recycle className="h-4 w-4" />
          Recycling Habits
        </Label>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center justify-between">
            <Label className="text-sm">Paper</Label>
            <Switch
              checked={data.recyclesPaper}
              onCheckedChange={(checked) =>
                onChange({ ...data, recyclesPaper: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <Label className="text-sm">Plastic</Label>
            <Switch
              checked={data.recyclesPlastic}
              onCheckedChange={(checked) =>
                onChange({ ...data, recyclesPlastic: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <Label className="text-sm">Glass</Label>
            <Switch
              checked={data.recyclesGlass}
              onCheckedChange={(checked) =>
                onChange({ ...data, recyclesGlass: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <Label className="text-sm">Metal</Label>
            <Switch
              checked={data.recyclesMetal}
              onCheckedChange={(checked) =>
                onChange({ ...data, recyclesMetal: checked })
              }
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <Label className="text-sm font-medium">Composting</Label>
          <p className="text-xs text-muted-foreground">
            Do you compost organic waste?
          </p>
        </div>
        <Switch
          checked={data.composts}
          onCheckedChange={(checked) =>
            onChange({ ...data, composts: checked })
          }
        />
      </div>
    </CategoryCard>
  );
}
