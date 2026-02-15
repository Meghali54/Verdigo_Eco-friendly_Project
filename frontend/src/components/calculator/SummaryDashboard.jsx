import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { SummaryCard } from "./SummaryCard";
import { ResultBlock } from "./ResultBlock";
import { Home, Car, Utensils, Trash2, Globe, TrendingDown } from "lucide-react";
import { getGlobalAverage, generateSuggestions } from "../../lib/calculations";

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#8B5CF6"];

export function SummaryDashboard({ footprint }) {
  const globalAverage = getGlobalAverage();
  const suggestions = generateSuggestions(footprint);

  const pieData = [
    { name: "Home", value: footprint.home, color: COLORS[0] },
    { name: "Transport", value: footprint.transport, color: COLORS[1] },
    { name: "Food", value: footprint.food, color: COLORS[2] },
    { name: "Waste", value: footprint.waste, color: COLORS[3] },
  ];

  const comparisonData = [
    { category: "Home", yours: footprint.home, global: globalAverage.home },
    {
      category: "Transport",
      yours: footprint.transport,
      global: globalAverage.transport,
    },
    { category: "Food", yours: footprint.food, global: globalAverage.food },
    { category: "Waste", yours: footprint.waste, global: globalAverage.waste },
  ];

  const trendData = [
    { month: "Jan", emissions: footprint.total * 0.9 },
    { month: "Feb", emissions: footprint.total * 0.95 },
    { month: "Mar", emissions: footprint.total * 1.1 },
    { month: "Apr", emissions: footprint.total * 1.05 },
    { month: "May", emissions: footprint.total * 0.98 },
    { month: "Jun", emissions: footprint.total },
  ];

  const getComparison = (yours, global) => ({
    better: yours < global,
    percentage: Math.abs(((yours - global) / global) * 100).toFixed(0),
  });

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SummaryCard
          title="Your Annual Footprint"
          value={footprint.total.toFixed(1)}
          unit="tons CO₂e"
          icon={<Globe className="h-8 w-8 text-blue-500" />}
          className="bg-blue-50 border-blue-200"
        />

        <SummaryCard
          title="Global Average"
          value={globalAverage.total.toFixed(1)}
          unit="tons CO₂e"
          icon={<Globe className="h-8 w-8 text-red-500" />}
          className="bg-red-50 border-red-200"
        />

        <SummaryCard
          title="Your Impact"
          value={footprint.total < globalAverage.total ? "Below" : "Above"}
          unit="average"
          icon={
            footprint.total < globalAverage.total ? (
              <TrendingDown className="h-8 w-8 text-green-500" />
            ) : (
              <TrendingDown className="h-8 w-8 text-orange-500 rotate-180" />
            )
          }
          className={
            footprint.total < globalAverage.total
              ? "bg-green-50 border-green-200"
              : "bg-orange-50 border-orange-200"
          }
        />
      </div>

      {/* Category Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <ResultBlock
          title="Home"
          value={footprint.home}
          icon={<Home className="h-4 w-4" />}
          color="blue"
          comparison={getComparison(footprint.home, globalAverage.home)}
        />

        <ResultBlock
          title="Transport"
          value={footprint.transport}
          icon={<Car className="h-4 w-4" />}
          color="green"
          comparison={getComparison(
            footprint.transport,
            globalAverage.transport,
          )}
        />

        <ResultBlock
          title="Food"
          value={footprint.food}
          icon={<Utensils className="h-4 w-4" />}
          color="orange"
          comparison={getComparison(footprint.food, globalAverage.food)}
        />

        <ResultBlock
          title="Waste"
          value={footprint.waste}
          icon={<Trash2 className="h-4 w-4" />}
          color="purple"
          comparison={getComparison(footprint.waste, globalAverage.waste)}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Emissions Breakdown</CardTitle>
            <CardDescription>Your carbon footprint by category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [
                    `${Number(value).toFixed(1)} tons`,
                    "Emissions",
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Comparison Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Global Comparison</CardTitle>
            <CardDescription>
              How you compare to global averages
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip
                  formatter={(value) => [
                    `${Number(value).toFixed(1)} tons`,
                    "",
                  ]}
                />
                <Bar dataKey="yours" fill="#3B82F6" name="Your Emissions" />
                <Bar dataKey="global" fill="#EF4444" name="Global Average" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Emissions Trend</CardTitle>
          <CardDescription>
            Projected monthly emissions based on current habits
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                formatter={(value) => [
                  `${Number(value).toFixed(1)} tons`,
                  "Emissions",
                ]}
              />
              <Area
                type="monotone"
                dataKey="emissions"
                stroke="#3B82F6"
                fill="#3B82F6"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Suggestions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingDown className="h-5 w-5 text-green-500" />
            Personalized Suggestions
          </CardTitle>
          <CardDescription>
            Ways to reduce your carbon footprint
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200"
              >
                <div className="text-sm text-green-800">{suggestion}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
