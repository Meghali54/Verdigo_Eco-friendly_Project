import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import LoginPage from "./pages/auth/Login";
import SignupPage from "./pages/auth/Signup";
import Dashboard from "./pages/Dashboard";
import AirBuddy from "./pages/AirBuddy";
import GreenLane from "./pages/GreenLane";
import LocalHarvest from "./pages/LocalHarvest";
import WasteLess from "./pages/WasteLess";
import CarbonFootprintCalculator from "./pages/CarbonFootprintCalculator";
import BackToTop from "./components/BackToTop";

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <BackToTop />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/green-lane" element={<GreenLane />} />
            <Route path="/dashboard/local-harvest" element={<LocalHarvest />} />
            <Route path="/dashboard/air-buddy" element={<AirBuddy />} />
            <Route path="/dashboard/waste-less" element={<WasteLess />} />
            <Route
              path="/dashboard/carbon-footprint-calculator"
              element={<CarbonFootprintCalculator />}
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
