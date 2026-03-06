import { useState } from "react";
import { Button } from "../ui/button";
import { MapPin, Loader2, Search } from "lucide-react";
import { getCurrentLocation } from "../../lib/api/airbuddy";

export function LocationDetector({ onLocationDetected, onError }) {
  const [isDetecting, setIsDetecting] = useState(false);
  const [manualCity, setManualCity] = useState("");
  const [showManualInput, setShowManualInput] = useState(false);

  const handleAutoDetect = async () => {
    setIsDetecting(true);
    try {
      const location = await getCurrentLocation();
      onLocationDetected(location);
    } catch (error) {
      onError(error.message);
      setShowManualInput(true);
    } finally {
      setIsDetecting(false);
    }
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (manualCity.trim()) {
      onLocationDetected({ city: manualCity.trim() });
      setManualCity("");
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 border shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <MapPin className="h-6 w-6 text-blue-500" />
        <h3 className="text-xl font-bold text-foreground">Location</h3>
      </div>

      <div className="space-y-4">
        <Button
          onClick={handleAutoDetect}
          disabled={isDetecting}
          className="w-full flex items-center gap-2"
        >
          {isDetecting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <MapPin className="h-4 w-4" />
          )}
          {isDetecting ? "Detecting Location..." : "Use Current Location"}
        </Button>

        <div className="text-center text-sm text-muted-foreground">or</div>

        <form onSubmit={handleManualSubmit} className="flex gap-2">
          <input
            type="text"
            value={manualCity}
            onChange={(e) => setManualCity(e.target.value)}
            placeholder="Enter city name"
            className="flex-1 px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <Button
            type="submit"
            variant="outline"
            className="flex items-center gap-2"
          >
            <Search className="h-4 w-4" />
            Search
          </Button>
        </form>

        {showManualInput && (
          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              📍 Location access denied. Please enter your city manually above.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
