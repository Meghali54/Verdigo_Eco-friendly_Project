import { useEffect, useState } from "react";
import { Flame } from "lucide-react";

const STREAK_KEY = "verdigo-login-streak";

function getTodayDateStr() {
  return new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"
}

function getStreakData() {
  try {
    const raw = localStorage.getItem(STREAK_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    localStorage.removeItem(STREAK_KEY);
    return null;
  }
}

function updateStreak() {
  const today = getTodayDateStr();
  const data = getStreakData();

  if (!data) {
    const fresh = { streak: 1, lastLogin: today, longest: 1 };
    localStorage.setItem(STREAK_KEY, JSON.stringify(fresh));
    return fresh;
  }

  if (data.lastLogin === today) return data; // already logged in today

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().slice(0, 10);

  const newStreak = data.lastLogin === yesterdayStr ? data.streak + 1 : 1;
  const updated = {
    streak: newStreak,
    lastLogin: today,
    longest: Math.max(newStreak, data.longest ?? newStreak),
  };
  localStorage.setItem(STREAK_KEY, JSON.stringify(updated));
  return updated;
}

export default function LoginStreak() {
  const [streakData, setStreakData] = useState({ streak: 0, longest: 0 });

  useEffect(() => {
    const data = updateStreak();
    setStreakData(data);
  }, []);

  const { streak, longest } = streakData;

  const flameColor =
    streak >= 30
      ? "text-red-500"
      : streak >= 14
      ? "text-orange-500"
      : streak >= 7
      ? "text-yellow-500"
      : "text-amber-400";

  return (
    <div className="bg-card rounded-2xl shadow-lg p-6 border border-border">
      <div className="flex items-center gap-3 mb-4">
        <Flame className={`w-6 h-6 ${flameColor}`} />
        <h3 className="text-xl font-bold text-foreground">Daily Streak</h3>
      </div>

      <div className="flex items-end gap-2 mb-1">
        <span className={`text-5xl font-extrabold ${flameColor}`}>{streak}</span>
        <span className="text-muted-foreground text-lg mb-1">
          {streak === 1 ? "day" : "days"}
        </span>
      </div>

      <p className="text-muted-foreground text-sm mb-4">
        {streak === 1
          ? "Great start! Come back tomorrow to build your streak."
          : `You've logged in ${streak} days in a row. Keep it up! 🌱`}
      </p>

      {/* Week Grid */}
      <div className="flex gap-2 mb-4">
        {Array.from({ length: 7 }, (_, i) => {
          const active = i < Math.min(streak % 7 === 0 && streak > 0 ? 7 : streak % 7, 7) ||
            (streak >= 7 && streak % 7 === 0);
          return (
            <div
              key={i}
              title={`Day ${i + 1}`}
              className={`flex-1 h-3 rounded-full transition-colors duration-300 ${
                i < (streak % 7 === 0 && streak > 0 ? 7 : streak % 7)
                  ? "bg-amber-400"
                  : streak >= 7 && i < 7
                  ? "bg-amber-400"
                  : "bg-muted"
              }`}
            />
          );
        })}
      </div>

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>This week</span>
        <span className="font-semibold text-foreground">
          🏆 Best: {longest} {longest === 1 ? "day" : "days"}
        </span>
      </div>
    </div>
  );
}
