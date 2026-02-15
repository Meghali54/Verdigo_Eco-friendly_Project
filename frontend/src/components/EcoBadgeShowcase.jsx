import React, { useEffect } from "react";
import { Award, Lock, Sparkles, Trophy } from "lucide-react";
import AOS from "aos";

const EcoBadgeShowcase = ({ badges }) => {
  const earnedBadges = badges.filter((badge) => badge.achieved);
  const unearnedBadges = badges.filter((badge) => !badge.achieved);

  useEffect(() => {
    AOS.refresh();
  }, [badges]);

  return (
    <div className="bg-gradient-to-br from-card/90 via-amber-50/30 to-yellow-50/40 dark:from-card dark:via-amber-950/20 dark:to-yellow-950/10 rounded-2xl shadow-lg p-6 border border-amber-200/50 dark:border-amber-800/30 hover:shadow-2xl hover:shadow-amber-500/20 hover:border-amber-300/60 dark:hover:border-amber-700/50 transition-all duration-500 hover:-translate-y-1 group/container relative overflow-hidden">
      {/* Animated Background Glow */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-amber-400/20 to-yellow-400/20 rounded-full blur-3xl group-hover/container:scale-150 transition-transform duration-1000"></div>
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br from-orange-400/20 to-amber-400/20 rounded-full blur-3xl group-hover/container:scale-150 transition-transform duration-1000"></div>

      <div className="flex items-center justify-between mb-6 relative z-10">
        <h3 className="text-xl font-bold bg-gradient-to-r from-amber-600 via-yellow-600 to-orange-600 dark:from-amber-400 dark:via-yellow-400 dark:to-orange-400 bg-clip-text text-transparent flex items-center gap-2">
          <div className="p-2 bg-gradient-to-br from-amber-500 via-yellow-500 to-orange-500 rounded-lg shadow-md shadow-amber-500/30 group-hover/container:scale-110 group-hover/container:rotate-12 transition-all duration-500">
            <Trophy className="w-5 h-5 text-white" />
          </div>
          Eco Badges
        </h3>
        <div className="text-sm font-bold bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent px-3 py-1.5 rounded-full bg-amber-100/50 dark:bg-amber-900/30 border border-amber-300/50">
          <Sparkles className="w-3 h-3 inline mr-1 text-amber-500" />
          {earnedBadges.length}/{badges.length} earned
        </div>
      </div>

      {/* Earned Badges Grid */}
      {earnedBadges.length > 0 && (
        <div className="mb-6 relative z-10">
          <h4 className="text-sm font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Earned Badges
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {earnedBadges.map((badge, index) => (
              <div
                key={badge.id}
                data-aos="zoom-in"
                data-aos-delay={index * 100}
                className="group relative bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-900/30 dark:via-emerald-900/30 dark:to-teal-900/30 border-2 border-green-300/60 dark:border-green-700/50 rounded-xl p-4 hover:shadow-2xl hover:shadow-green-500/30 hover:border-green-400 dark:hover:border-green-600 transition-all duration-500 cursor-pointer hover:-translate-y-3 hover:scale-105 overflow-hidden"
                title={`${badge.name}: ${badge.description}`}
              >
                {/* Shimmer Effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"></div>
                {/* Corner Glow */}
                <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-green-400/40 to-transparent rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-700 blur-xl"></div>
                {/* Sparkle Effect */}
                <div className="absolute top-2 right-2 w-2 h-2 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping"></div>

                <div className="flex flex-col items-center text-center relative z-10">
                  <div className="text-4xl mb-2 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 drop-shadow-lg filter group-hover:drop-shadow-2xl">
                    {badge.icon}
                  </div>
                  <h5 className="font-bold text-green-800 dark:text-green-300 text-sm mb-1 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300">
                    {badge.name}
                  </h5>
                  <p className="text-xs text-green-600/80 dark:text-green-400/80 leading-tight group-hover:text-green-700 dark:group-hover:text-green-300 transition-colors duration-300">
                    {badge.description}
                  </p>
                  {/* Achievement Glow Ring */}
                  <div className="absolute inset-0 rounded-xl border-2 border-green-400/0 group-hover:border-green-400/50 dark:group-hover:border-green-500/50 transition-all duration-500 group-hover:animate-pulse"></div>
                </div>
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-20 shadow-lg shadow-green-500/30 scale-90 group-hover:scale-100">
                  🏆 {badge.description}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-emerald-600"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Unearned Badges Grid */}
      {unearnedBadges.length > 0 && (
        <div className="relative z-10">
          <h4 className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-4 flex items-center gap-2">
            <Lock className="w-3 h-3" />
            Locked Badges
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {unearnedBadges.map((badge, index) => (
              <div
                key={badge.id}
                data-aos="fade-up"
                data-aos-delay={100 + index * 50}
                className="group relative bg-gradient-to-br from-slate-100 to-gray-100 dark:from-slate-800 dark:to-gray-800 border-2 border-slate-300/50 dark:border-slate-700/50 rounded-xl p-4 hover:border-violet-400/50 dark:hover:border-violet-600/50 hover:shadow-lg hover:shadow-violet-500/10 transition-all duration-500 cursor-pointer hover:-translate-y-1"
                title={`Locked: ${badge.name} - ${badge.description}`}
              >
                {/* Unlock Hint Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/0 to-purple-500/0 group-hover:from-violet-500/10 group-hover:to-purple-500/10 rounded-xl transition-all duration-500"></div>

                <div className="flex flex-col items-center text-center relative z-10">
                  <div className="relative">
                    <div className="text-3xl mb-2 grayscale group-hover:grayscale-[50%] transition-all duration-500 opacity-50 group-hover:opacity-70 group-hover:scale-110">
                      {badge.icon}
                    </div>
                    <div className="absolute -top-1 -right-1 p-1 bg-gradient-to-br from-slate-500 to-gray-600 rounded-full shadow-md group-hover:from-violet-500 group-hover:to-purple-500 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12">
                      <Lock className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <h5 className="font-semibold text-slate-500 dark:text-slate-400 text-sm mb-1 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors duration-300">
                    {badge.name}
                  </h5>
                  <p className="text-xs text-slate-400 dark:text-slate-500 leading-tight group-hover:text-slate-500 dark:group-hover:text-slate-400 transition-colors duration-300">
                    {badge.description}
                  </p>
                </div>
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-4 py-2 bg-gradient-to-r from-slate-700 to-gray-700 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-20 shadow-lg scale-90 group-hover:scale-100">
                  🔒 Complete to unlock
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-700"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {badges.length === 0 && (
        <div className="text-center py-8 relative z-10">
          <Award className="w-12 h-12 text-amber-400 mx-auto mb-3 animate-bounce" />
          <p className="text-muted-foreground">
            Start your journey to earn badges!
          </p>
        </div>
      )}
    </div>
  );
};

export default EcoBadgeShowcase;
