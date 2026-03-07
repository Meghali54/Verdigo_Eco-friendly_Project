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
  RadialBarChart,
  RadialBar,
  Legend,
} from "recharts";
import {
  getGlobalAverage,
  generateSuggestions,
} from "@/utils/CarbonCalculations";
import { calculateBadges } from "@/utils/badges";
import { Award, TrendingDown, Globe, Loader2, Download, FileText } from "lucide-react";
import { useRef, useState } from "react";

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#8B5CF6"];

export function Results({ footprint, isCalculating = false }) {
  const reportRef = useRef(null);
  const [isPrinting, setIsPrinting] = useState(false);

  const handleDownloadPDF = () => {
    if (!footprint) return;
    setIsPrinting(true);

    // Build a self-contained HTML page for printing
    const date = new Date().toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const globalAvg = getGlobalAverage();
    const status = footprint.total < globalAvg.total ? "Below Global Average ✅" : "Above Global Average ⚠️";
    const suggestions = generateSuggestions(footprint);
    const badges = calculateBadges(footprint);
    const earned = badges.filter(b => b.achieved);

    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>VerdiGo Carbon Footprint Report</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', Arial, sans-serif; color: #1a1a1a; padding: 40px; background: #fff; }
    .header { text-align: center; margin-bottom: 32px; border-bottom: 3px solid #10B981; padding-bottom: 20px; }
    .header h1 { font-size: 28px; color: #10B981; font-weight: 700; }
    .header p { color: #666; font-size: 14px; margin-top: 4px; }
    .section { margin-bottom: 28px; }
    .section h2 { font-size: 16px; font-weight: 700; color: #374151; border-left: 4px solid #10B981; padding-left: 10px; margin-bottom: 14px; }
    .cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 24px; }
    .card { padding: 16px; border-radius: 10px; text-align: center; }
    .card.blue { background: #EFF6FF; border: 1px solid #93C5FD; }
    .card.red { background: #FFF1F2; border: 1px solid #FCA5A5; }
    .card.green { background: #F0FDF4; border: 1px solid #86EFAC; }
    .card h3 { font-size: 22px; font-weight: 700; }
    .card p { font-size: 12px; color: #666; margin-top: 4px; }
    .card.blue h3 { color: #2563EB; }
    .card.red h3 { color: #DC2626; }
    .card.green h3 { color: #16A34A; }
    table { width: 100%; border-collapse: collapse; font-size: 14px; }
    th { background: #F0FDF4; color: #374151; padding: 10px 12px; text-align: left; border-bottom: 2px solid #D1FAE5; }
    td { padding: 8px 12px; border-bottom: 1px solid #E5E7EB; }
    tr:last-child td { border-bottom: none; }
    .badge-row { display: flex; flex-wrap: wrap; gap: 10px; }
    .badge { background: #F0FDF4; border: 1px solid #86EFAC; border-radius: 8px; padding: 8px 12px; font-size: 13px; color: #166534; }
    .tip { background: #F0F9FF; border: 1px solid #BAE6FD; border-radius: 8px; padding: 10px 14px; font-size: 13px; color: #0369A1; margin-bottom: 8px; }
    .footer { text-align: center; font-size: 12px; color: #9CA3AF; margin-top: 32px; border-top: 1px solid #E5E7EB; padding-top: 16px; }
    @media print { body { padding: 20px; } }
  </style>
</head>
<body>
  <div class="header">
    <h1>🌿 VerdiGo — Carbon Footprint Report</h1>
    <p>Generated on ${date}</p>
  </div>

  <div class="cards">
    <div class="card blue"><h3>${footprint.total.toFixed(1)} t</h3><p>Your Annual Footprint</p></div>
    <div class="card red"><h3>${globalAvg.total.toFixed(1)} t</h3><p>Global Average</p></div>
    <div class="card green"><h3>${status}</h3><p>Your Status</p></div>
  </div>

  <div class="section">
    <h2>Breakdown by Category</h2>
    <table>
      <thead><tr><th>Category</th><th>Your Emissions (t/yr)</th><th>Global Average (t/yr)</th><th>Difference</th></tr></thead>
      <tbody>
        <tr><td>✈️ Travel</td><td>${footprint.travel.toFixed(2)}</td><td>${globalAvg.travel.toFixed(2)}</td><td>${(footprint.travel - globalAvg.travel).toFixed(2) > 0 ? "▲ " : "▼ "}${Math.abs(footprint.travel - globalAvg.travel).toFixed(2)}</td></tr>
        <tr><td>🏠 Home</td><td>${footprint.home.toFixed(2)}</td><td>${globalAvg.home.toFixed(2)}</td><td>${(footprint.home - globalAvg.home) > 0 ? "▲ " : "▼ "}${Math.abs(footprint.home - globalAvg.home).toFixed(2)}</td></tr>
        <tr><td>🥗 Food</td><td>${footprint.food.toFixed(2)}</td><td>${globalAvg.food.toFixed(2)}</td><td>${(footprint.food - globalAvg.food) > 0 ? "▲ " : "▼ "}${Math.abs(footprint.food - globalAvg.food).toFixed(2)}</td></tr>
        <tr><td>🗑️ Waste</td><td>${footprint.waste.toFixed(2)}</td><td>${globalAvg.waste.toFixed(2)}</td><td>${(footprint.waste - globalAvg.waste) > 0 ? "▲ " : "▼ "}${Math.abs(footprint.waste - globalAvg.waste).toFixed(2)}</td></tr>
      </tbody>
    </table>
  </div>

  ${earned.length > 0 ? `
  <div class="section">
    <h2>Eco Badges Earned (${earned.length})</h2>
    <div class="badge-row">${earned.map(b => `<span class="badge">${b.icon} ${b.name}</span>`).join("")}</div>
  </div>` : ""}

  <div class="section">
    <h2>Personalised Suggestions</h2>
    ${suggestions.slice(0, 5).map(s => `<div class="tip">💡 ${s}</div>`).join("")}
  </div>

  <div class="footer">VerdiGo — Your companion for sustainable living | verdigo.app</div>
</body>
</html>`;

    const printWindow = window.open("", "_blank", "width=900,height=700");
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.focus();
    printWindow.onload = () => {
      printWindow.print();
      setIsPrinting(false);
    };
  };
  // Show loading state only when actively calculating (not on initial load)
  if (isCalculating) {
    return (
      <div className="w-full max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col items-center justify-center py-16">
          <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Calculating Your Carbon Footprint
          </h3>
          <p className="text-muted-foreground text-center max-w-md">
            We're analyzing your data and generating personalized insights...
          </p>
        </div>
      </div>
    );
  }

  // Show error state if no footprint data
  if (!footprint) {
    return (
      <div className="w-full max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col items-center justify-center py-16">
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Unable to Calculate Footprint
          </h3>
          <p className="text-muted-foreground text-center max-w-md">
            Please go back and fill out all the calculator steps.
          </p>
        </div>
      </div>
    );
  }

  const globalAverage = getGlobalAverage();
  const suggestions = generateSuggestions(footprint);
  const badges = calculateBadges(footprint);
  const achievedBadges = badges.filter((badge) => badge.achieved);

  const pieData = [
    { name: "Travel", value: footprint.travel, color: COLORS[0] },
    { name: "Home", value: footprint.home, color: COLORS[1] },
    { name: "Food", value: footprint.food, color: COLORS[2] },
    { name: "Waste", value: footprint.waste, color: COLORS[3] },
  ];

  const comparisonData = [
    {
      category: "Travel",
      yours: footprint.travel,
      global: globalAverage.travel,
    },
    { category: "Home", yours: footprint.home, global: globalAverage.home },
    { category: "Food", yours: footprint.food, global: globalAverage.food },
    { category: "Waste", yours: footprint.waste, global: globalAverage.waste },
  ];

  const totalComparisonData = [
    { name: "Your Footprint", value: footprint.total, fill: "#3B82F6" },
    { name: "Global Average", value: globalAverage.total, fill: "#EF4444" },
  ];

  return (
    <div ref={reportRef} className="w-full max-w-6xl mx-auto space-y-6">
      {/* Download Button */}
      <div className="flex justify-end">
        <button
          onClick={handleDownloadPDF}
          disabled={isPrinting}
          className="flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isPrinting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Download className="w-4 h-4" />
          )}
          <FileText className="w-4 h-4" />
          <span>{isPrinting ? "Preparing..." : "Download PDF"}</span>
        </button>
      </div>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="text-center bg-blue-50 border border-blue-200">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-blue-600">
              {footprint.total.toFixed(1)} tons
            </CardTitle>
            <CardDescription className="text-md font-semibold">
              Your Annual Carbon Footprint
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="text-center bg-rose-50 border border-rose-200">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-red-600">
              {globalAverage.total.toFixed(1)} tons
            </CardTitle>
            <CardDescription className="text-md font-semibold">
              Global Average
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="text-center bg-green-100 border border-green-200">
          <CardHeader>
            <CardTitle
              className={`text-2xl font-bold ${footprint.total < globalAverage.total ? "text-green-600" : "text-orange-600"}`}
            >
              {footprint.total < globalAverage.total ? "🌱" : "⚠️"}
            </CardTitle>
            <CardDescription className="text-md font-semibold">
              {footprint.total < globalAverage.total
                ? "Below Average!"
                : "Above Average"}
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Breakdown Pie Chart */}
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
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Comparison Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Global Comparison
            </CardTitle>
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

      {/* Total Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Total Emissions Comparison</CardTitle>
          <CardDescription>Your total vs global average</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius="10%"
              outerRadius="80%"
              data={totalComparisonData}
            >
              <RadialBar dataKey="value" cornerRadius={10} fill="#8884d8" />
              <Tooltip
                formatter={(value) => [`${Number(value).toFixed(1)} tons`, ""]}
              />
              <Legend />
            </RadialBarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Badges */}
      {achievedBadges.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-yellow-500" />
              Your Eco Badges
            </CardTitle>
            <CardDescription>
              Achievements for your sustainable habits
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievedBadges.map((badge) => (
                <div
                  key={badge.id}
                  className="flex items-center gap-3 p-3 bg-green-100 rounded-lg"
                >
                  <span className="text-2xl">{badge.icon}</span>
                  <div>
                    <div className="font-semibold text-green-800">
                      {badge.name}
                    </div>
                    <div className="text-sm text-green-600">
                      {badge.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Suggestions */}
      <Card className="border-2 border-green-300">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg"
              >
                <div className="text-sm text-blue-800">{suggestion}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
