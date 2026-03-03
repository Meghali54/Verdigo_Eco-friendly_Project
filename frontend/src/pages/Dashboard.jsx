// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Leaf, LogOut, Route, ShoppingBasket, Wind, Trash2, User, Settings } from 'lucide-react';
// import { useAuth } from '../contexts/AuthContext';

// const Dashboard = () => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate('/');
//   };

//   const features = [
//     {
//       title: 'Green Lane',
//       description: 'Plan your eco-friendly routes',
//       icon: <Route className="w-8 h-8 text-white" />,
//       color: 'from-emerald-400 to-emerald-600',
//       comingSoon: true
//     },
//     {
//       title: 'Local Harvest',
//       description: 'Find local farmers and fresh produce',
//       icon: <ShoppingBasket className="w-8 h-8 text-white" />,
//       color: 'from-green-400 to-green-600',
//       comingSoon: true
//     },
//     {
//       title: 'Air Buddy',
//       description: 'Monitor air quality in real-time',
//       icon: <Wind className="w-8 h-8 text-white" />,
//       color: 'from-blue-400 to-blue-600',
//       comingSoon: true
//     },
//     {
//       title: 'WasteLess',
//       description: 'Track and reduce your waste',
//       icon: <Trash2 className="w-8 h-8 text-white" />,
//       color: 'from-teal-400 to-teal-600',
//       comingSoon: true
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
//       {/* Header */}
//       <header className="bg-card shadow-sm border-b border-border">
//         <div className="container mx-auto px-6 py-4">
//           <div className="flex justify-between items-center">
//             <div className="flex items-center space-x-3">
//               <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-2 rounded-lg">
//                 <Leaf className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-xl font-bold text-emerald-800">VerdiGo</h1>
//                 <p className="text-sm text-muted-foreground">Welcome back, {user?.name}!</p>
//               </div>
//             </div>
//             <div className="flex items-center space-x-4">
//               <button className="p-2 text-gray-600 hover:text-emerald-600 transition-colors duration-200">
//                 <Settings className="w-5 h-5" />
//               </button>
//               <button className="p-2 text-gray-600 hover:text-emerald-600 transition-colors duration-200">
//                 <User className="w-5 h-5" />
//               </button>
//               <button
//                 onClick={handleLogout}
//                 className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:text-red-700 transition-colors duration-200"
//               >
//                 <LogOut className="w-4 h-4" />
//                 <span>Logout</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="container mx-auto px-6 py-8">
//         {/* Welcome Section */}
//         <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl p-8 text-white mb-8">
//           <h2 className="text-3xl font-bold mb-2">Welcome to Your Eco-Dashboard!</h2>
//           <p className="text-emerald-100 text-lg">
//             You've successfully joined the VerdiGo community. Your sustainable living journey starts here.
//           </p>
//         </div>

//         {/* Features Grid */}
//         <div className="mb-8">
//           <h3 className="text-2xl font-bold text-gray-800 mb-6">Your Eco-Tools</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {features.map((feature, index) => (
//               <div
//                 key={index}
//                 className="bg-white rounded-xl shadow-lg p-6 border border-emerald-100 hover:shadow-xl transition-shadow duration-300"
//               >
//                 <div className="flex items-start justify-between mb-4">
//                   <div className={`bg-gradient-to-br ${feature.color} p-3 rounded-lg`}>
//                     {feature.icon}
//                   </div>
//                   {feature.comingSoon && (
//                     <span className="bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full text-sm font-medium">
//                       Coming Soon
//                     </span>
//                   )}
//                 </div>
//                 <h4 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h4>
//                 <p className="text-gray-600">{feature.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Getting Started */}
//         <div className="bg-white rounded-xl shadow-lg p-8 border border-emerald-100">
//           <h3 className="text-2xl font-bold text-gray-800 mb-4">Getting Started</h3>
//           <div className="space-y-4">
//             <div className="flex items-center space-x-3">
//               <div className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold">1</div>
//               <div>
//                 <h4 className="font-semibold text-gray-800">Explore Your Features</h4>
//                 <p className="text-gray-600">Each tool is designed to help you live more sustainably</p>
//               </div>
//             </div>
//             <div className="flex items-center space-x-3">
//               <div className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold">2</div>
//               <div>
//                 <h4 className="font-semibold text-gray-800">Set Your Goals</h4>
//                 <p className="text-gray-600">Define your sustainability objectives and track progress</p>
//               </div>
//             </div>
//             <div className="flex items-center space-x-3">
//               <div className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold">3</div>
//               <div>
//                 <h4 className="font-semibold text-gray-800">Join the Community</h4>
//                 <p className="text-gray-600">Connect with other eco-conscious individuals</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Dashboard;
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Leaf,
  LogOut,
  Route,
  ShoppingBasket,
  Wind,
  Trash2,
  User,
  Settings,
  TrendingUp,
  Award,
  Calendar,
  MapPin,
  Bell,
  BarChart3,
  Target,
  Users,
  Lightbulb,
  CheckCircle,
  Star,
  ArrowRight,
  Activity,
  Globe,
  Zap,
  Heart,
  TreePine,
  Droplets,
  Sun,
  Moon,
  GlobeLock,
  Calculator,
  Sparkles,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import WeatherCard from "@/components/weatherCard";
import ThemeToggle from "@/components/ThemeToggle";
import EcoBadgeShowcase from "@/components/EcoBadgeShowcase";
import AnimatedProgressBar from "@/components/AnimatedProgressBar";
import QuickCarbonWidget from "@/components/QuickCarbonWidget";
import EcoTipsCarousel from "@/components/EcoTipsCarousel";
import { calculateBadges } from "@/utils/badges";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "@/components/Footer";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
      offset: 50,
    });
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const features = [
    {
      title: "Green Lane",
      description: "Plan your eco-friendly routes and track carbon savings",
      icon: <Route className="w-8 h-8 text-white drop-shadow-lg" />,
      color: "from-emerald-400 via-green-500 to-teal-600",
      hoverColor:
        "group-hover:from-emerald-500 group-hover:via-green-600 group-hover:to-teal-700",
      glowColor: "hover:shadow-[0_20px_50px_-12px_rgba(16,185,129,0.5)]",
      borderHover: "hover:border-emerald-400/60",
      textHover: "group-hover:text-emerald-500",
      comingSoon: true,
      stats: "0 routes planned",
      link: "/dashboard/green-lane",
    },
    {
      title: "Local Harvest",
      description: "Find local farmers and fresh produce near you",
      icon: <ShoppingBasket className="w-8 h-8 text-white drop-shadow-lg" />,
      color: "from-lime-400 via-green-500 to-emerald-600",
      hoverColor:
        "group-hover:from-lime-500 group-hover:via-green-600 group-hover:to-emerald-700",
      glowColor: "hover:shadow-[0_20px_50px_-12px_rgba(34,197,94,0.5)]",
      borderHover: "hover:border-green-400/60",
      textHover: "group-hover:text-green-500",
      comingSoon: true,
      stats: "12 farms nearby",
      link: "/dashboard/local-harvest",
    },
    {
      title: "Air Buddy",
      description: "Monitor air quality and get health recommendations",
      icon: <Wind className="w-8 h-8 text-white drop-shadow-lg" />,
      color: "from-cyan-400 via-blue-500 to-indigo-600",
      hoverColor:
        "group-hover:from-cyan-500 group-hover:via-blue-600 group-hover:to-indigo-700",
      glowColor: "hover:shadow-[0_20px_50px_-12px_rgba(59,130,246,0.5)]",
      borderHover: "hover:border-blue-400/60",
      textHover: "group-hover:text-blue-500",
      comingSoon: true,
      stats: "AQI: Good (45)",
      link: "/dashboard/air-buddy",
    },
    {
      title: "WasteLess",
      description: "Track and reduce your environmental footprint",
      icon: <Trash2 className="w-8 h-8 text-white drop-shadow-lg" />,
      color: "from-teal-400 via-cyan-500 to-blue-600",
      hoverColor:
        "group-hover:from-teal-500 group-hover:via-cyan-600 group-hover:to-blue-700",
      glowColor: "hover:shadow-[0_20px_50px_-12px_rgba(20,184,166,0.5)]",
      borderHover: "hover:border-teal-400/60",
      textHover: "group-hover:text-teal-500",
      comingSoon: true,
      stats: "15% reduction",
      link: "https://trash-vision-classify-it.vercel.app/",
    },
    {
      title: "Carbon Footprint Calculator",
      description: "Track and reduce your environmental footprint",
      icon: <Calculator className="w-8 h-8 text-white drop-shadow-lg" />,
      color: "from-violet-400 via-purple-500 to-fuchsia-600",
      hoverColor:
        "group-hover:from-violet-500 group-hover:via-purple-600 group-hover:to-fuchsia-700",
      glowColor: "hover:shadow-[0_20px_50px_-12px_rgba(139,92,246,0.5)]",
      borderHover: "hover:border-purple-400/60",
      textHover: "group-hover:text-purple-500",
      comingSoon: true,
      stats: "15% reduction",
      link: "/dashboard/carbon-footprint-calculator",
    },
  ];

  const quickStats = [
    {
      title: "Carbon Saved",
      value: "30 kg",
      change: "+0%",
      icon: (
        <TreePine className="w-6 h-6 text-green-600 group-hover:text-green-700 transition-colors duration-300" />
      ),
      color: "bg-gradient-to-br from-green-50 to-emerald-100",
      hoverBg: "hover:from-green-100 hover:to-emerald-200",
      bordercolor: "border-green-300 hover:border-green-500",
      hoverGlow: "hover:shadow-[0_15px_40px_-10px_rgba(34,197,94,0.4)]",
      iconBg:
        "bg-gradient-to-br from-green-100 to-green-200 group-hover:from-green-200 group-hover:to-green-300",
      ringColor: "group-hover:ring-4 group-hover:ring-green-300/30",
    },
    {
      title: "Eco Score",
      value: "750",
      change: "+12%",
      icon: (
        <Star className="w-6 h-6 text-amber-600 group-hover:text-amber-700 transition-colors duration-300" />
      ),
      color: "bg-gradient-to-br from-amber-50 to-yellow-100",
      hoverBg: "hover:from-amber-100 hover:to-yellow-200",
      bordercolor: "border-amber-300 hover:border-amber-500",
      hoverGlow: "hover:shadow-[0_15px_40px_-10px_rgba(245,158,11,0.4)]",
      iconBg:
        "bg-gradient-to-br from-amber-100 to-amber-200 group-hover:from-amber-200 group-hover:to-amber-300",
      ringColor: "group-hover:ring-4 group-hover:ring-amber-300/30",
    },
    {
      title: "Local Purchases",
      value: "8",
      change: "+0%",
      icon: (
        <ShoppingBasket className="w-6 h-6 text-blue-600 group-hover:text-blue-700 transition-colors duration-300" />
      ),
      color: "bg-gradient-to-br from-blue-50 to-cyan-100",
      hoverBg: "hover:from-blue-100 hover:to-cyan-200",
      bordercolor: "border-blue-300 hover:border-blue-500",
      hoverGlow: "hover:shadow-[0_15px_40px_-10px_rgba(59,130,246,0.4)]",
      iconBg:
        "bg-gradient-to-br from-blue-100 to-blue-200 group-hover:from-blue-200 group-hover:to-blue-300",
      ringColor: "group-hover:ring-4 group-hover:ring-blue-300/30",
    },
    {
      title: "Community Rank",
      value: "#1,247",
      change: "+5",
      icon: (
        <TrendingUp className="w-6 h-6 text-violet-600 group-hover:text-violet-700 transition-colors duration-300" />
      ),
      color: "bg-gradient-to-br from-violet-50 to-purple-100",
      hoverBg: "hover:from-violet-100 hover:to-purple-200",
      bordercolor: "border-violet-300 hover:border-violet-500",
      hoverGlow: "hover:shadow-[0_15px_40px_-10px_rgba(139,92,246,0.4)]",
      iconBg:
        "bg-gradient-to-br from-violet-100 to-violet-200 group-hover:from-violet-200 group-hover:to-violet-300",
      ringColor: "group-hover:ring-4 group-hover:ring-violet-300/30",
    },
  ];

  const recentActivities = [
    {
      title: "Welcome to VerdiGo!",
      description: "Your account has been successfully created",
      time: "Just now",
      icon: <CheckCircle className="w-5 h-5 text-green-500" />,
    },
    {
      title: "Eco-Challenge Available",
      description: 'Join the "Plastic-Free Week" challenge',
      time: "2 hours ago",
      icon: <Target className="w-5 h-5 text-blue-500" />,
    },
    {
      title: "Air Quality Alert",
      description: "Good air quality in your area today",
      time: "4 hours ago",
      icon: <Wind className="w-5 h-5 text-teal-500" />,
    },
  ];

  // Mock carbon footprint data for badge calculation
  const mockFootprint = {
    total: 4.2, // Below 5 tons - should earn "Eco Warrior"
    travel: 1.5, // Below 2 tons - should earn "Green Commuter"
    home: 2.0, // Below 2.5 tons - should earn "Energy Saver"
    food: 1.8, // Below 2 tons - should earn "Plant Lover"
    waste: 0.3, // Below 0.5 tons - should earn "Waste Reducer"
  };

  const badges = calculateBadges(mockFootprint);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/40 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-emerald-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-r from-teal-400/10 to-green-400/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Header */}
      <header className="bg-card/80 backdrop-blur-xl shadow-lg border-b border-border/50 sticky top-0 z-50">
        <div data-aos="fade-down" className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4 group">
              <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 p-3 rounded-xl shadow-lg shadow-emerald-500/30 group-hover:shadow-emerald-500/50 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                <Leaf className="w-7 h-7 text-white animate-pulse" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent hover:from-cyan-600 hover:via-teal-600 hover:to-emerald-600 transition-all duration-500">
                  VerdiGo
                </h1>
                <p className="text-sm text-muted-foreground font-medium hidden sm:block">
                  Welcome back,{" "}
                  <span className="text-emerald-600 font-semibold">
                    {user?.name || "Eco Warrior"}
                  </span>
                  !
                </p>
              </div>
            </div>

            {/* Desktop Navigation - Hidden on Mobile */}
            <div className="hidden lg:flex items-center space-x-3">
              <button className="relative p-3 bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-pink-950/30 text-rose-600 hover:from-rose-100 hover:to-pink-100 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-rose-500/20 group">
                <Bell className="w-5 h-5 group-hover:animate-bounce" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-red-500 to-rose-500 rounded-full text-[10px] text-white flex items-center justify-center font-bold animate-pulse">
                  3
                </span>
              </button>
              <button className="p-3 text-muted-foreground hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 dark:hover:from-blue-950/30 dark:hover:to-cyan-950/30 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/20 hover:rotate-90">
                <Settings className="w-5 h-5" />
              </button>
              <button className="p-3 text-muted-foreground bg-gradient-to-r from-slate-100 to-gray-100 dark:from-slate-800 dark:to-gray-800 hover:from-violet-50 hover:to-purple-50 dark:hover:from-violet-950/30 dark:hover:to-purple-950/30 hover:text-violet-600 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-violet-500/20">
                <User className="w-5 h-5" />
              </button>
              <ThemeToggle />
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-5 py-2.5 text-red-600 bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-950/30 dark:to-rose-950/30 hover:from-red-100 hover:to-rose-100 dark:hover:from-red-900/40 dark:hover:to-rose-900/40 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/20 group"
              >
                <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
                <span className="font-semibold">Logout</span>
              </button>
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="flex lg:hidden items-center space-x-2">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-3 text-muted-foreground hover:text-emerald-600 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 dark:hover:from-emerald-950/30 dark:hover:to-teal-950/30 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-emerald-500/20"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          {isMobileMenuOpen && (
            <div className="lg:hidden mt-4 pt-4 border-t border-border/50 animate-in slide-in-from-top duration-300">
              <div className="flex flex-col space-y-3">
                <button className="relative flex items-center justify-between p-3 bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-pink-950/30 text-rose-600 hover:from-rose-100 hover:to-pink-100 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-rose-500/20 group">
                  <div className="flex items-center space-x-3">
                    <Bell className="w-5 h-5" />
                    <span className="font-semibold">Notifications</span>
                  </div>
                  <span className="w-6 h-6 bg-gradient-to-r from-red-500 to-rose-500 rounded-full text-xs text-white flex items-center justify-center font-bold">
                    3
                  </span>
                </button>

                <button className="flex items-center space-x-3 p-3 text-muted-foreground hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 dark:hover:from-blue-950/30 dark:hover:to-cyan-950/30 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20">
                  <Settings className="w-5 h-5" />
                  <span className="font-semibold">Settings</span>
                </button>

                <button className="flex items-center space-x-3 p-3 text-muted-foreground bg-gradient-to-r from-slate-100 to-gray-100 dark:from-slate-800 dark:to-gray-800 hover:from-violet-50 hover:to-purple-50 dark:hover:from-violet-950/30 dark:hover:to-purple-950/30 hover:text-violet-600 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/20">
                  <User className="w-5 h-5" />
                  <span className="font-semibold">Profile</span>
                </button>

                {/* Theme Controls Section */}
                <div className="pt-3 border-t border-border/50">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-1">Appearance</p>
                  <div className="flex flex-col space-y-3">
                    {/* Full ThemeToggle Component */}
                    <div className="p-3 bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-800/50 dark:to-gray-800/50 rounded-xl border border-border/50">
                      <ThemeToggle />
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-3 p-3 text-red-600 bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-950/30 dark:to-rose-950/30 hover:from-red-100 hover:to-rose-100 dark:hover:from-red-900/40 dark:hover:to-rose-900/40 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20 group mt-3 border-t border-border/50 pt-6"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-semibold">Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8 relative z-10">
        {/* Welcome Banner */}
        <div className="relative bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-3xl p-8 text-white mb-8 overflow-hidden group hover:shadow-2xl hover:shadow-emerald-500/30 transition-all duration-500">
          {/* Animated Background Patterns */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-0 w-40 h-40 bg-white/20 rounded-full -translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-700"></div>
            <div className="absolute bottom-0 right-0 w-60 h-60 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3 group-hover:scale-125 transition-transform duration-700"></div>
            <div
              className="absolute top-1/2 left-1/2 w-32 h-32 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 animate-ping"
              style={{ animationDuration: "3s" }}
            ></div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 via-transparent to-cyan-600/20 group-hover:from-emerald-600/30 group-hover:to-cyan-600/30 transition-all duration-500"></div>
          <div
            data-aos="fade-up"
            data-aos-delay="100"
            className="relative z-10"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Sparkles className="w-8 h-8 text-yellow-300 animate-pulse" />
                  <h2 className="text-4xl font-bold">
                    Welcome to Your Eco-Dashboard!
                  </h2>
                </div>
                <p className="text-emerald-100 text-lg leading-relaxed max-w-2xl">
                  You've successfully joined the VerdiGo community. Your
                  sustainable living journey starts here. Let's make a positive
                  impact together!
                </p>
                <button className="mt-6 px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl font-semibold flex items-center gap-2 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  <span>Start Your Journey</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                </button>
              </div>
              <div className="hidden lg:block">
                <Globe
                  className="w-36 h-36 text-white/30 animate-spin"
                  style={{ animationDuration: "20s" }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {quickStats.map((stat, index) => (
            <div
              data-aos="zoom-in"
              data-aos-delay={index * 100}
              key={index}
              className={`${stat.color} ${stat.hoverBg} dark:bg-card dark:hover:bg-card/80 rounded-2xl p-6 border-2 ${stat.bordercolor} shadow-md ${stat.hoverGlow} ${stat.ringColor} transition-all duration-500 hover:-translate-y-3 hover:scale-[1.03] group cursor-pointer relative overflow-hidden`}
            >
              {/* Shimmer Effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"></div>
              {/* Glow Orb */}
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br from-white/40 to-transparent rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-700"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`p-3 rounded-xl ${stat.iconBg} shadow-md group-hover:scale-125 group-hover:rotate-12 group-hover:shadow-lg transition-all duration-500`}
                  >
                    {stat.icon}
                  </div>
                  <span className="text-sm font-bold text-green-700 bg-green-100/80 px-3 py-1.5 rounded-lg group-hover:bg-green-200 group-hover:scale-110 transition-all duration-300">
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-3xl dark:text-black font-extrabold text-foreground mb-1 group-hover:scale-110 transition-transform duration-300 origin-left">
                  {stat.value}
                </h3>
                <p className="text-muted-foreground font-semibold group-hover:text-foreground transition-colors duration-300">
                  {stat.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Carbon Widget */}
        <div data-aos="fade-up" data-aos-delay="200" className="mb-10">
          <QuickCarbonWidget />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Features Grid */}
            <div>
              <div
                data-aos="fade-right"
                className="flex items-center justify-between mb-6"
              >
                <h3 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                  Your Eco-Tools
                </h3>
                <button className="text-emerald-600 hover:text-emerald-700 font-semibold flex items-center space-x-1 group px-4 py-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-all duration-300">
                  <span>View All</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <Link
                    data-aos="flip-up"
                    data-aos-delay={index * 100}
                    to={feature.link}
                    key={index}
                    className={`bg-card/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border-2 border-border/30 ${feature.borderHover} ${feature.glowColor} transition-all duration-500 group cursor-pointer hover:-translate-y-4 hover:scale-[1.03] relative overflow-hidden`}
                  >
                    {/* Animated Gradient Border */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                    {/* Animated Corner Glow */}
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-current/30 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-150 blur-xl"></div>
                    {/* Bottom Glow */}
                    <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-gradient-to-tr from-current/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-125 blur-xl"></div>
                    {/* Sparkle Effect */}
                    <div className="absolute top-4 right-4 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping"></div>

                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-4">
                        <div
                          className={`bg-gradient-to-br ${feature.color} ${feature.hoverColor} p-4 rounded-xl shadow-lg group-hover:scale-125 group-hover:rotate-6 transition-all duration-500 group-hover:shadow-2xl relative overflow-hidden`}
                        >
                          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                          {feature.icon}
                        </div>
                        {feature.comingSoon && (
                          <span className="bg-gradient-to-r from-amber-100 via-yellow-100 to-orange-100 dark:from-amber-900/50 dark:via-yellow-900/50 dark:to-orange-900/50 text-amber-700 dark:text-amber-300 px-4 py-2 rounded-full text-sm font-bold shadow-md group-hover:scale-110 group-hover:shadow-lg group-hover:from-amber-200 group-hover:via-yellow-200 group-hover:to-orange-200 transition-all duration-300">
                            ✨ Explore
                          </span>
                        )}
                      </div>
                      <h4
                        className={`text-xl font-bold text-card-foreground mb-2 ${feature.textHover} transition-colors duration-300`}
                      >
                        {feature.title}
                      </h4>
                      <p className="text-muted-foreground mb-4 leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                        {feature.description}
                      </p>
                      <div className="flex items-center justify-between pt-4 border-t border-border/50 group-hover:border-current/20 transition-colors duration-300">
                        <span className="text-sm font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent group-hover:from-current group-hover:to-current">
                          {feature.stats}
                        </span>
                        <div
                          className={`flex items-center gap-2 text-slate-400 ${feature.textHover} transition-all duration-300`}
                        >
                          <span className="text-sm font-semibold -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                            Explore
                          </span>
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-3 group-hover:scale-110 transition-all duration-300" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Progress Section */}
            <div
              data-aos="fade-up"
              data-aos-delay="100"
              className="bg-card/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-border/50 hover:shadow-xl transition-all duration-500 group"
            >
              <h3 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent mb-6 flex items-center gap-3">
                <Activity className="w-6 h-6 text-emerald-500" />
                Your Sustainability Journey
              </h3>
              <div className="space-y-8">
                <AnimatedProgressBar
                  label="Weekly Eco Goal"
                  current={2}
                  total={7}
                  percentage={28}
                  color="from-cyan-500 via-teal-500 to-emerald-500"
                  delay={200}
                />
                <AnimatedProgressBar
                  label="Carbon Footprint Reduction"
                  current={15}
                  total={100}
                  percentage={15}
                  color="from-emerald-500 via-green-500 to-lime-500"
                  delay={400}
                />
                <AnimatedProgressBar
                  label="Community Impact"
                  current={8}
                  total={20}
                  percentage={40}
                  color="from-violet-500 via-purple-500 to-fuchsia-500"
                  delay={600}
                />
              </div>
            </div>

            {/* Getting Started */}
            <div
              data-aos="fade-up"
              data-aos-delay="200"
              className="bg-card/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-border/50 hover:shadow-xl transition-all duration-500"
            >
              <h3 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent mb-6 flex items-center gap-3">
                <Zap className="w-6 h-6 text-amber-500" />
                Getting Started
              </h3>
              <div className="space-y-5">
                {[
                  {
                    step: 1,
                    title: "Explore Your Features",
                    description:
                      "Each tool is designed to help you live more sustainably",
                    completed: true,
                    color: "from-emerald-500 to-green-500",
                  },
                  {
                    step: 2,
                    title: "Set Your Goals",
                    description:
                      "Define your sustainability objectives and track progress",
                    completed: false,
                    color: "from-cyan-500 to-blue-500",
                  },
                  {
                    step: 3,
                    title: "Join the Community",
                    description: "Connect with other eco-conscious individuals",
                    completed: false,
                    color: "from-violet-500 to-purple-500",
                  },
                  {
                    step: 4,
                    title: "Track Your Impact",
                    description: "Monitor your carbon savings and eco-score",
                    completed: false,
                    color: "from-pink-500 to-rose-500",
                  },
                  {
                    step: 5,
                    title: "Earn Green Rewards",
                    description:
                      "Get rewarded for taking eco-friendly actions and hitting milestones",
                    completed: false,
                    color: "from-amber-500 to-orange-500",
                  },
                  {
                    step: 6,
                    title: "Share Your Achievements",
                    description:
                      "Inspire others by sharing your sustainability progress",
                    completed: false,
                    color: "from-teal-500 to-cyan-500",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-4 p-4 rounded-xl bg-gradient-to-r from-transparent via-transparent to-transparent hover:from-slate-50/80 hover:via-emerald-50/60 hover:to-teal-50/40 dark:hover:from-slate-800/60 dark:hover:via-emerald-900/30 dark:hover:to-teal-900/20 transition-all duration-500 cursor-pointer group border-2 border-transparent hover:border-emerald-200/50 dark:hover:border-emerald-800/30 hover:shadow-md hover:shadow-emerald-500/10 relative overflow-hidden"
                  >
                    {/* Background Glow on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-teal-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white shadow-lg group-hover:scale-125 group-hover:rotate-6 group-hover:shadow-xl transition-all duration-500 relative z-10 ${
                        item.completed
                        ? "bg-gradient-to-br from-green-500 via-emerald-500 to-teal-600 group-hover:from-green-400 group-hover:via-emerald-400 group-hover:to-teal-500"
                        : `bg-gradient-to-br ${item.color}`
                        }`}
                    >
                      {item.completed ? (
                        <CheckCircle className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                      ) : (
                        <span className="text-lg font-extrabold">
                          {item.step}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 relative z-10">
                      <h4 className="font-bold text-foreground mb-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                        {item.title}
                      </h4>
                      <p className="text-muted-foreground leading-relaxed text-sm group-hover:text-foreground/70 transition-colors duration-300">
                        {item.description}
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-emerald-500 group-hover:translate-x-3 group-hover:scale-110 transition-all duration-500 opacity-0 group-hover:opacity-100 relative z-10" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Recent Activity */}
            <div
              data-aos="fade-left"
              data-aos-delay="100"
              className="bg-gradient-to-br from-card/90 via-card/80 to-blue-50/30 dark:to-blue-950/20 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-blue-200/50 dark:border-blue-800/30 hover:shadow-2xl hover:shadow-blue-500/20 hover:border-blue-300/60 dark:hover:border-blue-700/50 transition-all duration-500 hover:-translate-y-1 group/card"
            >
              <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 dark:from-blue-400 dark:via-cyan-400 dark:to-teal-400 bg-clip-text text-transparent mb-6 flex items-center gap-2">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg shadow-md shadow-blue-500/30 group-hover/card:scale-110 group-hover/card:rotate-6 transition-all duration-500">
                  <Activity className="w-5 h-5 text-white" />
                </div>
                Recent Activity
              </h3>
              <div className="space-y-3">
                {recentActivities.map((activity, index) => (
                  <div
                    key={index}
                    data-aos="fade-up"
                    data-aos-delay={150 + index * 100}
                    className="flex items-start space-x-3 p-4 rounded-xl bg-gradient-to-r from-white/80 via-blue-50/50 to-cyan-50/30 dark:from-slate-800/80 dark:via-blue-900/30 dark:to-cyan-900/20 hover:from-blue-100 hover:via-cyan-100 hover:to-teal-100 dark:hover:from-blue-900/50 dark:hover:via-cyan-900/40 dark:hover:to-teal-900/30 transition-all duration-500 cursor-pointer group border-2 border-transparent hover:border-blue-400/50 dark:hover:border-blue-600/40 hover:shadow-xl hover:shadow-blue-500/15 hover:-translate-y-2 hover:scale-[1.02] relative overflow-hidden"
                  >
                    {/* Animated Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-cyan-500/10 to-teal-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 group-hover:animate-pulse"></div>
                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"></div>
                    <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-100 via-cyan-100 to-teal-100 dark:from-blue-800/50 dark:via-cyan-800/50 dark:to-teal-800/50 group-hover:from-blue-200 group-hover:via-cyan-200 group-hover:to-teal-200 dark:group-hover:from-blue-700/60 dark:group-hover:via-cyan-700/60 dark:group-hover:to-teal-700/60 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-md group-hover:shadow-lg group-hover:shadow-blue-500/30 relative z-10">
                      {activity.icon}
                    </div>
                    <div className="flex-1 relative z-10">
                      <h4 className="font-semibold text-foreground text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                        {activity.title}
                      </h4>
                      <p className="text-muted-foreground text-sm group-hover:text-foreground/80 transition-colors duration-300">
                        {activity.description}
                      </p>
                      <span className="text-xs font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mt-1 inline-block">
                        {activity.time}
                      </span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500 transition-all duration-500 group-hover:translate-x-3 group-hover:scale-125 opacity-0 group-hover:opacity-100 relative z-10" />
                  </div>
                ))}
              </div>
            </div>

            {/* Eco Badge Showcase */}
            <div data-aos="fade-left" data-aos-delay="200">
              <EcoBadgeShowcase badges={badges} />
            </div>

            {/* Eco Tips Carousel */}
            <div data-aos="fade-left" data-aos-delay="300">
              <EcoTipsCarousel />
            </div>

            {/* Weather Widget */}
            <div data-aos="fade-left" data-aos-delay="400">
              <WeatherCard />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Dashboard;
