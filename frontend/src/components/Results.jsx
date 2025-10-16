import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar, Legend } from 'recharts';
import { getGlobalAverage, generateSuggestions } from '@/utils/CarbonCalculations';
import { calculateBadges } from '@/utils/badges';
import { Award, TrendingDown, Globe, Loader2 } from 'lucide-react';

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6'];

export function Results({ footprint, isCalculating = false }) {
  // Show loading state only when actively calculating (not on initial load)
  if (isCalculating) {
    return (
      <div className="w-full max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col items-center justify-center py-16">
          <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">Calculating Your Carbon Footprint</h3>
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
          <h3 className="text-xl font-semibold text-foreground mb-2">Unable to Calculate Footprint</h3>
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
  const achievedBadges = badges.filter(badge => badge.achieved);

  const pieData = [
    { name: 'Travel', value: footprint.travel, color: COLORS[0] },
    { name: 'Home', value: footprint.home, color: COLORS[1] },
    { name: 'Food', value: footprint.food, color: COLORS[2] },
    { name: 'Waste', value: footprint.waste, color: COLORS[3] },
  ];

  const comparisonData = [
    { category: 'Travel', yours: footprint.travel, global: globalAverage.travel },
    { category: 'Home', yours: footprint.home, global: globalAverage.home },
    { category: 'Food', yours: footprint.food, global: globalAverage.food },
    { category: 'Waste', yours: footprint.waste, global: globalAverage.waste },
  ];

  const totalComparisonData = [
    { name: 'Your Footprint', value: footprint.total, fill: '#3B82F6' },
    { name: 'Global Average', value: globalAverage.total, fill: '#EF4444' },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="text-center bg-blue-50 border border-blue-200">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-blue-600">
              {footprint.total.toFixed(1)} tons
            </CardTitle>
            <CardDescription className="text-md font-semibold">Your Annual Carbon Footprint</CardDescription>
          </CardHeader>
        </Card>
        
        <Card className="text-center bg-rose-50 border border-rose-200">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-red-600">
              {globalAverage.total.toFixed(1)} tons
            </CardTitle>
            <CardDescription className="text-md font-semibold">Global Average</CardDescription>
          </CardHeader>
        </Card>
        
        <Card className="text-center bg-green-100 border border-green-200">
          <CardHeader>
            <CardTitle className={`text-2xl font-bold ${footprint.total < globalAverage.total ? 'text-green-600' : 'text-orange-600'}`}>
              {footprint.total < globalAverage.total ? '🌱' : '⚠️'}
            </CardTitle>
            <CardDescription className="text-md font-semibold">
              {footprint.total < globalAverage.total ? 'Below Average!' : 'Above Average'}
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
                <Tooltip formatter={(value) => [`${Number(value).toFixed(1)} tons`, 'Emissions']} />
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
            <CardDescription>How you compare to global averages</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip formatter={(value) => [`${Number(value).toFixed(1)} tons`, '']} />
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
            <RadialBarChart cx="50%" cy="50%" innerRadius="10%" outerRadius="80%" data={totalComparisonData}>
              <RadialBar dataKey="value" cornerRadius={10} fill="#8884d8" />
              <Tooltip formatter={(value) => [`${Number(value).toFixed(1)} tons`, '']} />
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
            <CardDescription>Achievements for your sustainable habits</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievedBadges.map((badge) => (
                <div key={badge.id} className="flex items-center gap-3 p-3 bg-green-100 rounded-lg">
                  <span className="text-2xl">{badge.icon}</span>
                  <div>
                    <div className="font-semibold text-green-800">{badge.name}</div>
                    <div className="text-sm text-green-600">{badge.description}</div>
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
          <CardDescription>Ways to reduce your carbon footprint</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {suggestions.map((suggestion, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                <div className="text-sm text-blue-800">{suggestion}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}