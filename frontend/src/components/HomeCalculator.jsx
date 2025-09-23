import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Home, Zap } from 'lucide-react';

export function HomeCalculator({ data, onChange }) {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Home className="h-5 w-5 text-green-500" />
          Home Energy Usage
        </CardTitle>
        <CardDescription>
          Share details about your household energy consumption
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Monthly Electricity Usage: {data.monthlyElectricity} kWh
          </Label>
          <Slider
            value={[data.monthlyElectricity]}
            onValueChange={(value) => onChange({ ...data, monthlyElectricity: value[0] })}
            max={2000}
            step={50}
            className="w-full"
          />
          <div className="text-xs text-gray-500">
            Check your electricity bill for accurate numbers
          </div>
        </div>

        <div className="space-y-2">
          <Label>Energy Source</Label>
          <Select
            value={data.energySource}
            onValueChange={(value) => 
              onChange({ ...data, energySource: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select energy source" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="renewable">🌱 Renewable Energy</SelectItem>
              <SelectItem value="mixed">⚡ Mixed Sources</SelectItem>
              <SelectItem value="non-renewable">🏭 Non-Renewable</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Household Size: {data.householdSize} people</Label>
          <Slider
            value={[data.householdSize]}
            onValueChange={(value) => onChange({ ...data, householdSize: value[0] })}
            min={1}
            max={8}
            step={1}
            className="w-full"
          />
          <div className="text-xs text-gray-500">
            Number of people living in your home
          </div>
        </div>
      </CardContent>
    </Card>
  );
}