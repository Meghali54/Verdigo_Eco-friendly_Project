import React, { useEffect, useState } from "react";

const AnimatedProgressBar = ({
  label,
  current,
  total,
  percentage,
  color = "from-blue-500 to-teal-500",
  showPercentage = true,
  showFraction = true,
  animationDuration = 1500,
  delay = 0,
}) => {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      // Animate from 0 to target percentage
      const startTime = Date.now();
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / animationDuration, 1);
        const easeOutProgress = 1 - Math.pow(1 - progress, 3); // Cubic ease-out
        setAnimatedPercentage(percentage * easeOutProgress);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }, delay);

    return () => clearTimeout(timer);
  }, [percentage, animationDuration, delay]);

  const displayPercentage = Math.round(animatedPercentage);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="font-semibold text-foreground">{label}</span>
        <div className="flex items-center space-x-2">
          {showFraction && (
            <span className="text-sm font-bold text-muted-foreground">
              {current}/{total}
            </span>
          )}
          {showPercentage && (
            <span className="text-sm font-bold text-primary">
              {displayPercentage}%
            </span>
          )}
        </div>
      </div>
      <div className="relative">
        <div className="w-full bg-muted rounded-full h-4 overflow-hidden shadow-inner">
          <div
            className={`bg-gradient-to-r ${color} h-4 rounded-full transition-all duration-300 ease-out shadow-sm`}
            style={{
              width: `${animatedPercentage}%`,
              transform: isVisible ? "scaleX(1)" : "scaleX(0)",
              transformOrigin: "left",
            }}
          />
        </div>
        {/* Animated shine effect */}
        <div
          className={`absolute top-0 left-0 h-4 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full transition-all duration-1000 ease-out ${
            isVisible && animatedPercentage > 10 ? "animate-pulse" : "opacity-0"
          }`}
          style={{
            width: `${Math.min(animatedPercentage, 30)}%`,
            animation:
              isVisible && animatedPercentage > 10
                ? `shine 2s ease-in-out infinite ${delay + 500}ms`
                : "none",
          }}
        />
      </div>
      {/* Optional milestone markers */}
      <div className="flex justify-between text-xs text-muted-foreground mt-1">
        <span>0%</span>
        <span>50%</span>
        <span>100%</span>
      </div>
    </div>
  );
};

export default AnimatedProgressBar;
