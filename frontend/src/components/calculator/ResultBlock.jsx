import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ResultBlock({
  title,
  value,
  unit = "tons CO₂e",
  icon,
  color = "blue",
  comparison,
  className = "",
}) {
  const colorClasses = {
    blue: "bg-blue-50 border-blue-200 text-blue-700",
    green: "bg-green-50 border-green-200 text-green-700",
    orange: "bg-orange-50 border-orange-200 text-orange-700",
    purple: "bg-purple-50 border-purple-200 text-purple-700",
    red: "bg-red-50 border-red-200 text-red-700",
  };

  return (
    <Card className={`${colorClasses[color]} ${className}`}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between text-sm font-medium">
          <span className="flex items-center gap-2">
            {icon}
            {title}
          </span>
          {comparison && (
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                comparison.better
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {comparison.better ? "↓" : "↑"} {comparison.percentage}%
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {value.toFixed(1)} <span className="text-sm font-normal">{unit}</span>
        </div>
      </CardContent>
    </Card>
  );
}
