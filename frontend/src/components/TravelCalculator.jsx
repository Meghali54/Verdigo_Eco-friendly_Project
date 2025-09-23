import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Car, Plane } from 'lucide-react';

export function TravelCalculator({ data, onChange }) {
  return (
    <Card className="w-full max-w-2xl mx-auto border-2 border-gray-200 bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Car className="h-5 w-5 text-blue-500 font-semibold text-lg" />
          Travel & Transportation
        </CardTitle>
        <CardDescription>
          Tell us about your weekly travel patterns and yearly flights
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Weekly Distance Traveled: {data.weeklyDistance} km</Label>
          <Slider
            value={[data.weeklyDistance]}
            onValueChange={(value) => onChange({ ...data, weeklyDistance: value[0] })}
            max={1000}
            step={10}
            className="w-full"
          />
          <div className="text-xs text-gray-500">
            Include your commute, errands, and regular driving
          </div>
        </div>

        <div className="space-y-2">
          <Label>Primary Vehicle Type</Label>
          <Select
            value={data.vehicleType}
            onValueChange={(value) => 
              onChange({ ...data, vehicleType: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select vehicle type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="electric">🔋 Electric Vehicle</SelectItem>
              <SelectItem value="hybrid">⚡ Hybrid</SelectItem>
              <SelectItem value="petrol">⛽ Petrol/Gasoline</SelectItem>
              <SelectItem value="diesel">🛢️ Diesel</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Plane className="h-4 w-4" />
            Flights Per Year: {data.flightsPerYear}
          </Label>
          <Slider
            value={[data.flightsPerYear]}
            onValueChange={(value) => onChange({ ...data, flightsPerYear: value[0] })}
            max={20}
            step={1}
            className="w-full bg-blue-400"
          />
          <div className="text-xs text-gray-500">
            Include both personal and business flights
          </div>
        </div>
      </CardContent>
    </Card>
  );
}