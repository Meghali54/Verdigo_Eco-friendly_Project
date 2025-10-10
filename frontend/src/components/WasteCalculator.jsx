import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Trash2, Recycle } from 'lucide-react';

export function WasteCalculator({ data, onChange }) {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trash2 className="h-5 w-5 text-purple-500" />
          Waste & Recycling
        </CardTitle>
        <CardDescription>
          Help us understand your waste production and recycling habits
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Weekly Waste Production: {data.weeklyWaste} kg</Label>
          <Slider
            value={[data.weeklyWaste]}
            onValueChange={(value) => onChange({ ...data, weeklyWaste: value[0] })}
            max={50}
            step={1}
            className="w-full"
          />
          <div className="text-xs text-muted-foreground">
            Estimate total household waste (including recyclables)
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="flex items-center gap-2">
              <Recycle className="h-4 w-4" />
              Do you recycle regularly?
            </Label>
            <div className="text-sm text-muted-foreground">
              Paper, plastic, glass, and metal recycling
            </div>
          </div>
          <Switch
            checked={data.recycling}
            onCheckedChange={(checked) => onChange({ ...data, recycling: checked })}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Do you compost food waste?</Label>
            <div className="text-sm text-gray-500">
              Composting organic waste reduces emissions
            </div>
          </div>
          <Switch
            checked={data.compost}
            onCheckedChange={(checked) => onChange({ ...data, compost: checked })}
          />
        </div>
      </CardContent>
    </Card>
  );
}