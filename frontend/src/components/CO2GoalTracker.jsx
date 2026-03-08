import { useState, useEffect } from "react";
import { Target, Pencil, Check, X, TrendingDown, Leaf } from "lucide-react";

const GOAL_KEY = "verdigo-co2-goal";
const DEFAULT_GOAL = 100; // kg CO2 reduction goal per month

function getGoalData() {
  try {
    const raw = localStorage.getItem(GOAL_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    // Reset progress if it's a new month
    const now = new Date();
    const currentMonth = `${now.getFullYear()}-${now.getMonth()}`;
    if (data.month !== currentMonth) {
      data.progress = 0;
      data.month = currentMonth;
      localStorage.setItem(GOAL_KEY, JSON.stringify(data));
    }
    return data;
  } catch {
    localStorage.removeItem(GOAL_KEY);
    return null;
  }
}

function saveGoalData(data) {
  try {
    localStorage.setItem(GOAL_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn("CO2GoalTracker: failed to save to localStorage", e);
  }
}

export default function CO2GoalTracker() {
  const now = new Date();
  const currentMonth = `${now.getFullYear()}-${now.getMonth()}`;

  const [goal, setGoal] = useState(DEFAULT_GOAL);
  const [progress, setProgress] = useState(0);
  const [editing, setEditing] = useState(false);
  const [inputVal, setInputVal] = useState("");

  useEffect(() => {
    const data = getGoalData();
    if (data) {
      setGoal(data.goal ?? DEFAULT_GOAL);
      setProgress(data.progress ?? 0);
    } else {
      saveGoalData({ goal: DEFAULT_GOAL, progress: 0, month: currentMonth });
    }
  }, []);

  const percentage = goal > 0 ? Math.min(Math.round((progress / goal) * 100), 100) : 0;
  const remaining = Math.max(goal - progress, 0);

  const handleSaveGoal = () => {
    const parsed = parseFloat(inputVal);
    if (!isNaN(parsed) && parsed > 0) {
      setGoal(parsed);
      saveGoalData({ goal: parsed, progress, month: currentMonth });
    }
    setEditing(false);
  };

  const handleAddProgress = (kg) => {
    const newProgress = Math.min(progress + kg, goal);
    setProgress(newProgress);
    saveGoalData({ goal, progress: newProgress, month: currentMonth });
  };

  const barColor =
    percentage >= 100
      ? "from-emerald-400 to-green-500"
      : percentage >= 60
      ? "from-teal-400 to-emerald-500"
      : percentage >= 30
      ? "from-blue-400 to-teal-500"
      : "from-sky-400 to-blue-500";

  const monthName = now.toLocaleString("default", { month: "long", year: "numeric" });

  return (
    <div className="bg-card rounded-2xl shadow-lg p-6 border border-border">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Target className="w-6 h-6 text-emerald-500" />
          <h3 className="text-xl font-bold text-foreground">Monthly CO₂ Goal</h3>
        </div>
        <span className="text-sm text-muted-foreground font-medium">{monthName}</span>
      </div>

      {/* Goal display / edit */}
      <div className="flex items-center gap-2 mb-4">
        {editing ? (
          <>
            <input
              type="number"
              min="1"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder={String(goal)}
              className="w-24 px-3 py-1.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
              autoFocus
              onKeyDown={(e) => e.key === "Enter" && handleSaveGoal()}
            />
            <span className="text-sm text-muted-foreground">kg CO₂</span>
            <button
              onClick={handleSaveGoal}
              className="p-1.5 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition-colors"
            >
              <Check className="w-4 h-4" />
            </button>
            <button
              onClick={() => setEditing(false)}
              className="p-1.5 rounded-lg bg-muted text-muted-foreground hover:bg-accent transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </>
        ) : (
          <>
            <span className="text-3xl font-extrabold text-foreground">{goal}</span>
            <span className="text-muted-foreground text-sm mt-1">kg CO₂ target</span>
            <button
              onClick={() => { setInputVal(String(goal)); setEditing(true); }}
              className="ml-auto p-1.5 rounded-lg text-muted-foreground hover:text-emerald-500 hover:bg-accent transition-colors"
              title="Edit goal"
            >
              <Pencil className="w-4 h-4" />
            </button>
          </>
        )}
      </div>

      {/* Progress bar */}
      <div className="mb-2">
        <div className="flex justify-between text-sm text-muted-foreground mb-1.5">
          <span>{progress} kg reduced</span>
          <span className="font-semibold text-foreground">{percentage}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
          <div
            className={`h-3 rounded-full bg-gradient-to-r ${barColor} transition-all duration-700`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Status message */}
      <p className="text-sm text-muted-foreground mb-5">
        {percentage >= 100 ? (
          <span className="text-emerald-500 font-semibold">🎉 Goal achieved! Fantastic work this month.</span>
        ) : (
          <>
            <TrendingDown className="inline w-4 h-4 mr-1 text-emerald-500" />
            <span className="font-semibold text-foreground">{remaining} kg</span> more to reach your goal
          </>
        )}
      </p>

      {/* Quick-add buttons */}
      <div>
        <p className="text-xs text-muted-foreground font-medium mb-2 uppercase tracking-wide">
          Log CO₂ saved today
        </p>
        <div className="flex flex-wrap gap-2">
          {[1, 2, 5, 10].map((kg) => (
            <button
              key={kg}
              onClick={() => handleAddProgress(kg)}
              disabled={percentage >= 100}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 text-sm font-semibold border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <Leaf className="w-3.5 h-3.5" />+{kg} kg
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
