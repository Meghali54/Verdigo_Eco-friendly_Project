import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function SummaryCard({
  title,
  description,
  value,
  unit,
  icon,
  trend,
  className = "",
}) {
  return (
    <Card className={`text-center ${className}`}>
      <CardHeader>
        <div className="flex justify-center mb-2">{icon}</div>
        <CardTitle className="text-3xl font-bold text-primary">
          {value} <span className="text-lg text-muted-foreground">{unit}</span>
        </CardTitle>
        <CardDescription className="font-medium">{title}</CardDescription>
        {description && (
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        )}
      </CardHeader>
      {trend && (
        <CardContent>
          <div
            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
              trend.direction === "up"
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {trend.direction === "up" ? "↗" : "↘"} {trend.value}
          </div>
        </CardContent>
      )}
    </Card>
  );
}
