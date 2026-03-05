import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  Calculator,
  Wind,
  Route,
  ShoppingBasket,
  Recycle,
  LayoutDashboard,
  Map,
  ArrowRight,
  CheckCircle2,
  Zap,
  Users,
  Globe,
  TrendingUp,
  ChevronRight,
  Leaf,
  Star,
} from "lucide-react";

const categories = [
  "All",
  "Environmental",
  "Navigation",
  "Community",
  "Analytics",
];

const featuresData = [
  {
    category: "Analytics",
    icon: Calculator,
    gradient: "from-emerald-500 to-teal-500",
    lightBg: "bg-emerald-50 dark:bg-emerald-900/20",
    badge: "Most Used",
    badgeColor:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
    route: "/dashboard/carbon-footprint-calculator",
    title: "Carbon Footprint Calculator",
    tagline: "Measure your environmental impact",
    description:
      "Get a detailed breakdown of your carbon emissions across energy usage, transport, food habits, and waste generation.",
    points: [
      "Home energy: electricity, heating & cooling",
      "Transportation: car, transit, flights",
      "Food: diet choices and food waste",
      "Waste: recycling and disposal habits",
    ],
  },
  {
    category: "Environmental",
    icon: Wind,
    gradient: "from-sky-500 to-blue-600",
    lightBg: "bg-sky-50 dark:bg-sky-900/20",
    badge: "Real-time",
    badgeColor: "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300",
    route: "/dashboard/air-buddy",
    title: "AirBuddy — Air Quality Monitor",
    tagline: "Breathe smarter, live healthier",
    description:
      "Real-time air quality data for your location with health recommendations and historical trend analysis.",
    points: [
      "Live AQI index with color-coded alerts",
      "Personalised health recommendations",
      "Historical air quality trend charts",
      "Location-based push notifications",
    ],
  },
  {
    category: "Navigation",
    icon: Route,
    gradient: "from-violet-500 to-purple-600",
    lightBg: "bg-violet-50 dark:bg-violet-900/20",
    badge: "Eco-Smart",
    badgeColor:
      "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
    route: "/dashboard/green-lane",
    title: "Green Lane Navigation",
    tagline: "Navigate with the planet in mind",
    description:
      "Plan smarter eco-friendly routes with real-time carbon comparisons across every transport mode.",
    points: [
      "Carbon footprint comparison per route",
      "EV charging station map integration",
      "Public transport & cycling options",
      "Eco-score for every journey",
    ],
  },
  {
    category: "Community",
    icon: ShoppingBasket,
    gradient: "from-lime-500 to-green-600",
    lightBg: "bg-lime-50 dark:bg-lime-900/20",
    badge: "Local",
    badgeColor:
      "bg-lime-100 text-lime-700 dark:bg-lime-900/40 dark:text-lime-300",
    route: "/dashboard/local-harvest",
    title: "Local Harvest",
    tagline: "Eat local, support farmers",
    description:
      "Discover farmers markets, seasonal produce, community gardens, and local sustainable food producers near you.",
    points: [
      "Farmers market locations & schedules",
      "Seasonal produce availability tracker",
      "Community garden directory",
      "Local sustainable producer listings",
    ],
  },
  {
    category: "Environmental",
    icon: Recycle,
    gradient: "from-amber-500 to-orange-500",
    lightBg: "bg-amber-50 dark:bg-amber-900/20",
    badge: "Reduce & Reuse",
    badgeColor:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
    route: "/dashboard/waste-less",
    title: "WasteLess",
    tagline: "Less waste, more future",
    description:
      "Track your waste habits, get personalised recycling guidance, and see how small changes create a big environmental difference.",
    points: [
      "Waste generation & recycling tracker",
      "Personalised waste-reduction tips",
      "Visual trend charts over time",
      "Sustainability practices library",
    ],
  },
  {
    category: "Analytics",
    icon: LayoutDashboard,
    gradient: "from-rose-500 to-pink-600",
    lightBg: "bg-rose-50 dark:bg-rose-900/20",
    badge: "Insights",
    badgeColor:
      "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300",
    route: "/dashboard",
    title: "Interactive Dashboard",
    tagline: "Your eco-impact at a glance",
    description:
      "A unified view of all your environmental data with beautiful charts, goal tracking, and progress milestones.",
    points: [
      "Visual carbon, waste & AQI charts",
      "Personalised sustainability goals",
      "Progress milestones & eco-badges",
      "Weekly & monthly impact reports",
    ],
  },
  {
    category: "Navigation",
    icon: Map,
    gradient: "from-cyan-500 to-teal-600",
    lightBg: "bg-cyan-50 dark:bg-cyan-900/20",
    badge: "Interactive",
    badgeColor:
      "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300",
    route: "/dashboard/green-lane",
    title: "Interactive Maps",
    tagline: "Explore your environment visually",
    description:
      "Location-aware maps showing environmental data, green spaces, pollution hotspots, and sustainable services around you.",
    points: [
      "Pollution & AQI heat maps",
      "Green space & park locator",
      "Sustainable services directory",
      "Neighbourhood eco-score overlays",
    ],
  },
];

const stats = [
  {
    icon: Users,
    value: "10K+",
    label: "Active Users",
    color: "text-emerald-600 dark:text-emerald-400",
  },
  {
    icon: Globe,
    value: "50+",
    label: "Cities Covered",
    color: "text-sky-600 dark:text-sky-400",
  },
  {
    icon: TrendingUp,
    value: "2M+",
    label: "CO₂ kg Saved",
    color: "text-violet-600 dark:text-violet-400",
  },
  {
    icon: Star,
    value: "4.9★",
    label: "User Rating",
    color: "text-amber-600 dark:text-amber-400",
  },
];

const Features = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: "ease-out-cubic",
      once: true,
      offset: 40,
    });
  }, []);

  const filtered =
    activeCategory === "All"
      ? featuresData
      : featuresData.filter((f) => f.category === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/40 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-500">
      {/* Animated background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-20 left-10 w-80 h-80 bg-gradient-to-r from-emerald-400/15 to-teal-400/15 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-32 right-10 w-96 h-96 bg-gradient-to-r from-sky-400/15 to-blue-400/15 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1.2s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-violet-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <Navbar />

      {/* ── Hero ── */}
      <section className="relative pt-20 pb-16 px-6 text-center overflow-hidden">
        <div data-aos="fade-up">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 text-sm font-semibold tracking-wide mb-6">
            <Leaf className="w-4 h-4" /> Platform Features
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight">
            <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
              Everything you need
            </span>
            <br />
            <span className="text-slate-800 dark:text-white">
              to live greener
            </span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            VerdiGo gives you a full suite of eco-tools — from carbon tracking
            to real-time air quality and eco-smart navigation.
          </p>
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => navigate("/signup")}
              className="flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold shadow-lg hover:shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all duration-300"
            >
              Get Started Free <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-2 px-8 py-3.5 rounded-2xl border border-emerald-400 text-emerald-700 dark:text-emerald-300 font-semibold hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:scale-105 active:scale-95 transition-all duration-300"
            >
              Explore Dashboard <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section className="px-6 pb-16 max-w-5xl mx-auto" data-aos="fade-up">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map(({ icon: Icon, value, label, color }, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-2 bg-white/70 dark:bg-slate-800/50 backdrop-blur-lg border border-white/50 dark:border-slate-700/50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <Icon className={`w-7 h-7 ${color}`} />
              <span className={`text-2xl font-extrabold ${color}`}>
                {value}
              </span>
              <span className="text-sm text-slate-500 dark:text-slate-400 text-center">
                {label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Filter Tabs ── */}
      <section className="px-6 pb-10 max-w-7xl mx-auto" data-aos="fade-up">
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 border ${
                activeCategory === cat
                  ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-transparent shadow-md shadow-emerald-500/20"
                  : "bg-white/70 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* ── Feature Cards Grid ── */}
      <section className="px-6 pb-20 max-w-7xl mx-auto">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                data-aos="fade-up"
                data-aos-delay={index * 70}
                className="group relative bg-white/80 dark:bg-slate-800/60 backdrop-blur-lg border border-white/60 dark:border-slate-700/50 rounded-3xl p-7 shadow-sm hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500 hover:-translate-y-2 flex flex-col"
              >
                {/* Gradient glow on hover */}
                <div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition duration-500 pointer-events-none`}
                />

                {/* Header row */}
                <div className="flex items-start justify-between mb-5">
                  <div
                    className={`p-3 rounded-2xl bg-gradient-to-br ${feature.gradient} shadow-lg`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${feature.badgeColor}`}
                  >
                    {feature.badge}
                  </span>
                </div>

                {/* Title & tagline */}
                <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                  {feature.title}
                </h2>
                <p className="text-xs font-medium text-slate-400 dark:text-slate-500 mb-3 italic">
                  {feature.tagline}
                </p>

                {/* Description */}
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-5">
                  {feature.description}
                </p>

                {/* Bullet points */}
                <ul className="space-y-2 mb-7 flex-1">
                  {feature.points.map((point, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300"
                    >
                      <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-emerald-500" />
                      {point}
                    </li>
                  ))}
                </ul>

                {/* CTA button */}
                <button
                  onClick={() => navigate(feature.route)}
                  className={`relative mt-auto w-full py-2.5 rounded-2xl bg-gradient-to-r ${feature.gradient} text-white text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.03] flex items-center justify-center gap-2`}
                >
                  Explore Feature <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Why VerdiGo banner ── */}
      <section className="px-6 pb-24 max-w-5xl mx-auto" data-aos="fade-up">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 p-10 md:p-16 text-white text-center shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(255,255,255,0.15)_0%,_transparent_60%)] pointer-events-none" />
          <Zap className="w-12 h-12 mx-auto mb-4 opacity-90" />
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight">
            Ready to make a difference?
          </h2>
          <p className="text-white/80 text-lg max-w-xl mx-auto mb-8">
            Join thousands of users already reducing their environmental
            footprint with VerdiGo's smart eco-tools.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => navigate("/signup")}
              className="flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-white text-emerald-700 font-bold shadow-lg hover:shadow-white/30 hover:scale-105 active:scale-95 transition-all duration-300"
            >
              Start for Free <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate("/about-us")}
              className="flex items-center gap-2 px-8 py-3.5 rounded-2xl border-2 border-white/60 text-white font-semibold hover:bg-white/10 hover:scale-105 active:scale-95 transition-all duration-300"
            >
              Learn About Us
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Features;
