import { getPollutantInfo } from "../../lib/aqiUtils";

export function PollutantGrid({ pollutants }) {
  const pollutantKeys = ["pm2_5", "pm10", "no2", "o3", "co", "so2"];

  const getColorClasses = (color) => {
    const colors = {
      purple: "bg-purple-50 border-purple-200 text-purple-900",
      blue: "bg-blue-50 border-blue-200 text-blue-900",
      red: "bg-red-50 border-red-200 text-red-900",
      orange: "bg-orange-50 border-orange-200 text-orange-900",
      gray: "bg-gray-50 border-gray-200 text-gray-400",
      green: "bg-green-50 border-green-200 text-green-900",
    };
    return colors[color] || colors.gray;
  };

  const getProgressColor = (color) => {
    const colors = {
      purple: "bg-purple-500",
      blue: "bg-blue-500",
      red: "bg-red-500",
      orange: "bg-orange-500",
      gray: "bg-gray-500",
      green: "bg-green-500",
    };
    return colors[color] || colors.gray;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {pollutantKeys.map((key) => {
        const info = getPollutantInfo(key);
        const value = pollutants[key] || 0;
        const percentage = Math.min((value / (info.maxSafe * 3)) * 100, 100);

        return (
          <div
            key={key}
            className={`rounded-xl p-4 border ${getColorClasses(info.color)} dark:bg-card transition-all duration-300`}
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="font-semibold">{info.name}</h4>
                <p className="text-xs opacity-75">{info.fullName}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">
                  {typeof value === "number" ? value.toFixed(1) : value}
                </div>
                <div className="text-xs opacity-75">{info.unit}</div>
              </div>
            </div>

            <div className="mb-2">
              <div className="bg-white bg-opacity-50 rounded-full h-2">
                <div
                  className={`${getProgressColor(info.color)} h-2 rounded-full transition-all duration-500`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>

            <p className="text-xs opacity-75">{info.description}</p>
          </div>
        );
      })}
    </div>
  );
}
