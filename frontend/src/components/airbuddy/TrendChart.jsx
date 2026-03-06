import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { convertToStandardAQI } from "../../lib/api/airbuddy";

export function TrendChart({ historyData, pollutant = "aqi" }) {
  if (!historyData || !historyData.length) {
    return (
      <div className="dark:bg-card transition-all duration-300 rounded-2xl p-6 border">
        <h3 className="text-xl font-bold text-foreground mb-4">
          48-Hour Trend
        </h3>
        <div className="flex items-center justify-center h-64 text-muted-foreground">
          No trend data available
        </div>
      </div>
    );
  }

  // Process data for chart
  const chartData = historyData.map((item) => {
    const date = new Date(item.dt * 1000);
    const time = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    let value;
    if (pollutant === "aqi") {
      value = convertToStandardAQI(item.main.aqi, item.components);
    } else {
      value = item.components[pollutant] || 0;
    }

    return {
      time,
      value: Math.round(value * 10) / 10,
      timestamp: item.dt,
    };
  });

  // Take every 4th data point to avoid overcrowding
  const filteredData = chartData.filter((_, index) => index % 4 === 0);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const date = new Date(data.timestamp * 1000);

      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-medium">{date.toLocaleDateString()}</p>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-primary font-semibold">
            {pollutant === "aqi" ? "AQI" : pollutant.toUpperCase()}:{" "}
            {payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="dark:bg-card transition-all duration-300 rounded-2xl p-6 border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-foreground">48-Hour Trend</h3>
        <select
          className="text-sm border rounded px-2 py-1 dark:bg-card transition-all duration-300"
          onChange={(e) => {
            // This would need to be handled by parent component
            console.log("Selected pollutant:", e.target.value);
          }}
          defaultValue={pollutant}
        >
          <option value="aqi">AQI</option>
          <option value="pm2_5">PM2.5</option>
          <option value="pm10">PM10</option>
          <option value="no2">NO₂</option>
          <option value="o3">O₃</option>
        </select>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={filteredData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="time"
            stroke="#666"
            fontSize={12}
            interval="preserveStartEnd"
          />
          <YAxis stroke="#666" fontSize={12} />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#3B82F6"
            strokeWidth={3}
            dot={{ fill: "#3B82F6", strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: "#3B82F6", strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
