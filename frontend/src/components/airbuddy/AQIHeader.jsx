import { getAQIColor, getAQILabel, getAQIBgColor } from "../../lib/aqiUtils";

export function AQIHeader({ aqi, location, lastUpdated }) {
  return (
    <div
      className={`rounded-2xl p-6 border ${getAQIBgColor(aqi)} dark:bg-card transition-all duration-300`}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            Air Quality Index
          </h2>
          <p className="text-muted-foreground">
            {location?.name}, {location?.country}
          </p>
        </div>
        <div className="text-right text-sm text-muted-foreground">
          <p>Last updated</p>
          <p className="font-medium">{lastUpdated}</p>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <div
          className={`w-32 h-32 rounded-full ${getAQIColor(aqi)} flex items-center justify-center text-white shadow-lg`}
        >
          <span className="text-4xl font-bold">{Math.round(aqi)}</span>
        </div>
      </div>

      <div className="text-center mt-4">
        <h3 className="text-xl font-semibold text-foreground mb-2">
          {getAQILabel(aqi)}
        </h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          {aqi <= 50
            ? "Air quality is satisfactory and poses little or no risk."
            : aqi <= 100
              ? "Air quality is acceptable, but may be a concern for sensitive individuals."
              : aqi <= 150
                ? "Members of sensitive groups may experience health effects."
                : "Everyone may begin to experience health effects."}
        </p>
      </div>
    </div>
  );
}
