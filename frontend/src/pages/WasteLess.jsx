import React from "react";
import { Trash2 } from "lucide-react";
import ThemeToggle from "../components/ThemeToggle";

const WasteLess = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card shadow-sm border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="bg-primary p-3 rounded-xl shadow-lg">
                <Trash2 className="w-7 h-7 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  WasteLess
                </h1>
                <p className="text-sm text-muted-foreground font-medium">
                  Track and reduce your waste
                </p>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-card-foreground mb-4">
            Coming Soon
          </h2>
          <p className="text-muted-foreground text-lg">
            WasteLess feature is under development
          </p>
        </div>
      </main>
    </div>
  );
};

export default WasteLess;
