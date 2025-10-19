import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity } from "lucide-react";

export function LivePreview({ footprint }) {
  return (
    <Card className="w-full max-w-sm mx-auto sticky top-4 border-blue-300 border-3 bg-gray-50 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Activity className="h-5 w-5 text-green-500" />
          Live Preview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-600">
            {footprint.total.toFixed(1)}
          </div>
          <div className="text-sm text-gray-600">tons CO₂/year</div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm">🚗 Travel</span>
            <span className="text-sm font-semibold">
              {footprint.travel.toFixed(1)}t
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">🏠 Home</span>
            <span className="text-sm font-semibold">
              {footprint.home.toFixed(1)}t
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">🍽️ Food</span>
            <span className="text-sm font-semibold">
              {footprint.food.toFixed(1)}t
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">🗑️ Waste</span>
            <span className="text-sm font-semibold">
              {footprint.waste.toFixed(1)}t
            </span>
          </div>
        </div>

        <div className="pt-2 border-t">
          <div
            className={`text-sm text-center p-2 rounded ${
              footprint.total < 9.0
                ? "bg-green-200 text-green-800"
                : "bg-orange-100 text-orange-800"
            }`}
          >
            {footprint.total < 9.0
              ? "🌱 Below global average!"
              : "⚠️ Above global average"}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
