import React from "react";
import { Award, Lock } from "lucide-react";

const EcoBadgeShowcase = ({ badges }) => {
  const earnedBadges = badges.filter((badge) => badge.achieved);
  const unearnedBadges = badges.filter((badge) => !badge.achieved);

  return (
    <div className="bg-card rounded-2xl shadow-lg p-6 border border-border">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-foreground">Eco Badges</h3>
        <div className="text-sm text-muted-foreground">
          {earnedBadges.length}/{badges.length} earned
        </div>
      </div>

      {/* Earned Badges Grid */}
      {earnedBadges.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-green-600 mb-3">Earned</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {earnedBadges.map((badge) => (
              <div
                key={badge.id}
                className="group relative bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 hover:shadow-lg transition-all duration-300 cursor-pointer"
                title={`${badge.name}: ${badge.description}`}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="text-3xl mb-2">{badge.icon}</div>
                  <h5 className="font-semibold text-green-800 text-sm mb-1">
                    {badge.name}
                  </h5>
                  <p className="text-xs text-green-600 leading-tight">
                    {badge.description}
                  </p>
                </div>
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                  {badge.description}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Unearned Badges Grid */}
      {unearnedBadges.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-gray-500 mb-3">Locked</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {unearnedBadges.map((badge) => (
              <div
                key={badge.id}
                className="group relative bg-gray-50 border border-gray-200 rounded-xl p-4 opacity-60 cursor-not-allowed"
                title={`Locked: ${badge.name} - ${badge.description}`}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="relative">
                    <div className="text-3xl mb-2 grayscale">{badge.icon}</div>
                    <Lock className="absolute -top-1 -right-1 w-4 h-4 text-gray-400 bg-white rounded-full p-0.5" />
                  </div>
                  <h5 className="font-semibold text-gray-500 text-sm mb-1">
                    {badge.name}
                  </h5>
                  <p className="text-xs text-gray-400 leading-tight">
                    {badge.description}
                  </p>
                </div>
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                  {badge.description}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {badges.length === 0 && (
        <div className="text-center py-8">
          <Award className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-muted-foreground">No badges available yet</p>
        </div>
      )}
    </div>
  );
};

export default EcoBadgeShowcase;