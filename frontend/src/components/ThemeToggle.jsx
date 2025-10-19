import React from 'react';
import { Sun, Moon, Palette } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme, accentColor, updateAccentColor } = useTheme();

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={toggleTheme}
        className="flex items-center space-x-2 px-4 py-2 text-foreground hover:text-primary hover:bg-accent rounded-xl transition-all duration-200 border border-border bg-card font-medium"
        aria-label="Toggle theme"
      >
        {theme === 'light' ? (
          <Moon className="w-5 h-5" />
        ) : (
          <Sun className="w-5 h-5" />
        )}
        <span className="text-sm">{theme === 'light' ? 'Dark' : 'Light'}</span>
      </button>
      <div className="flex items-center space-x-2 px-3 py-2 text-foreground hover:bg-accent rounded-xl transition-all duration-200 border border-border bg-card">
        <Palette className="w-4 h-4" />
        <input
          type="color"
          value={accentColor}
          onChange={(e) => updateAccentColor(e.target.value)}
          className="w-6 h-6 rounded border-none cursor-pointer bg-transparent"
          aria-label="Choose accent color"
        />
      </div>
    </div>
  );
};

export default ThemeToggle;