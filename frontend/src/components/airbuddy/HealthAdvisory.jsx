import { getHealthRecommendations, getAQIBgColor } from "../../lib/aqiUtils";
import { Heart } from "lucide-react";

export function HealthAdvisory({ aqi }) {
  const recommendations = getHealthRecommendations(aqi);

  return (
    <div
      className={`rounded-2xl p-6 border ${getAQIBgColor(aqi)} dark:bg-card transition-all duration-300`}
    >
      <div className="flex items-center gap-3 mb-4">
        <Heart className="h-6 w-6 text-red-500" />
        <h3 className="text-xl font-bold text-foreground">
          Health Recommendations
        </h3>
      </div>

      <div className="space-y-3">
        {recommendations.map((recommendation, index) => (
          <div
            key={index}
            className="flex items-start gap-3 p-3 dark:bg-card transition-all duration-300 bg-opacity-50 rounded-lg border"
          >
            <div className="text-sm text-foreground ">{recommendation}</div>
          </div>
        ))}
      </div>

      {aqi > 100 && (
        <div className="mt-4 p-3 dark:bg-card transition-all duration-300 rounded-lg">
          <p className="text-sm text-red-800 font-medium">
            ⚠️ Sensitive groups include children, elderly, and people with heart
            or lung conditions.
          </p>
        </div>
      )}
    </div>
  );
}
