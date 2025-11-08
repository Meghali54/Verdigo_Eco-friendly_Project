import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PenLine } from "lucide-react";




import {
  Leaf,
  ShoppingBasket,
  Wind,
  Trash2,
  LogIn,
  UserPlus,
  ArrowRight,
  Star,
  Users,
  Globe,
  Shield,
  Zap,
  Heart,
  Award,
  ChevronDown,
  ChevronUp,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ShoppingBasketIcon,
  WindIcon,
  Trash2Icon,
  ZapIcon,
  ShieldIcon,
  HeartIcon,
  AwardIcon,
  LogInIcon,
  UserPlus2,
  LeafIcon,
  StarHalf,
  StarsIcon,
  ArrowRightLeft,
  Users2,
  Globe2,
  RouteIcon,
  WindArrowDown,
} from "lucide-react";
import Chatbot from "../components/ChatBot";
import FeatureCard from "../components/FeatureCard";
import ThemeToggle from "../components/ThemeToggle";
const LandingPage = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);
  
  const features = [
    {
      title: "Green Lane",
      description:
        "Revolutionary eco-smart navigation that considers environmental impact alongside travel time, helping you reduce your carbon footprint.",
      icon: <RouteIcon className="w-10 h-10 text-white " />,
      gradient: "bg-gradient-to-br from-emerald-500 via-teal-500 to-blue-500 ",
    },
    {
      title: "Local Harvest",
      description:
        "Connect directly with local farmers and discover fresh, sustainable food sources in your community.",
      icon: <ShoppingBasketIcon className="w-10 h-10 text-white" />,
      gradient: "bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500",
    },
    {
      title: "Air Buddy",
      description:
        "Real-time air quality monitoring with personalized recommendations for healthier outdoor activities.",
      icon: <WindIcon className="w-10 h-10 text-white" />,
      gradient: "from-blue-400 to-blue-600",
    },
    {
      title: "WasteLess",
      description:
        "Intelligent waste tracking and recycling guidance to minimize your environmental impact.",
      icon: <Trash2Icon className="w-10 h-10 text-white" />,
      gradient: "from-teal-400 to-teal-600",
    },
  ];

  const powerfulFeatures = [
    {
      icon: <ZapIcon className="w-8 h-8 text-yellow-500" />,
      title: "AI-Powered Insights",
      description:
        "Advanced machine learning algorithms provide personalized sustainability recommendations",
    },
    {
      icon: <ShieldIcon className="w-8 h-8 text-blue-500" />,
      title: "Privacy First",
      description:
        "Your data is encrypted and secure. We never sell your information to third parties",
    },
    {
      icon: <HeartIcon className="w-8 h-8 text-red-500" />,
      title: "Community Driven",
      description:
        "Join thousands of eco-warriors making a real difference in their communities",
    },
    {
      icon: <AwardIcon className="w-8 h-8 text-purple-500" />,
      title: "Gamified Experience",
      description:
        "Earn rewards, unlock achievements, and compete with friends in sustainability challenges",
    },
  ];

  const faqs = [
    {
      question: "How does VerdiGo help me live more sustainably?",
      answer:
        "VerdiGo provides four comprehensive tools that cover different aspects of sustainable living: eco-friendly navigation, local food sourcing, air quality monitoring, and waste management. Each tool uses AI to provide personalized recommendations based on your location and preferences.",
    },
    {
      question: "Is VerdiGo free to use?",
      answer:
        "VerdiGo offers a free tier with basic features for all users. Premium plans unlock advanced analytics, unlimited tracking, and exclusive community features. We believe sustainability should be accessible to everyone.",
    },
    {
      question: "How accurate is the air quality data?",
      answer:
        "Air Buddy uses data from official government monitoring stations, satellite imagery, and our network of community sensors to provide hyper-local air quality information that's updated in real-time.",
    },
    {
      question: "Can I use VerdiGo in my city?",
      answer:
        "VerdiGo is available in over 500 cities worldwide and expanding rapidly. Our Green Lane works globally, while Local Harvest and other location-specific features are continuously being added to new regions.",
    },
    {
      question: "How does the waste tracking work?",
      answer:
        "WasteLess allows you to log your waste through our mobile app using photo recognition or manual entry. It categorizes waste types, tracks trends, and provides personalized tips for reduction and proper disposal.",
    },
  ];

  const handleFeatureClick = () => {
    navigate("/signup");
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    // Updated background to be theme-aware
    <div className="min-h-screen bg-background">
      <Chatbot />

      {/* Header */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-md shadow-md container mx-auto px-4 py-4 z-50">
        <nav data-aos="fade-down" className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          {/* Logo & Title */}
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-3 rounded-xl shadow-lg">
              <LeafIcon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-emerald-800">
                VerdiGo
              </h1>
              <p className="text-sm text-emerald-600 font-medium">
                Eco-System Platform
              </p>
              
            </div>
            
          </div>
          <div className="flex space-x-4">
            <ThemeToggle />
            <button
              onClick={() => navigate("/login")}
              className="flex items-center space-x-2 px-6 py-3 border-2 border-primary text-primary hover:text-primary/80 hover:bg-primary/10 font-semibold transition-all duration-200 rounded-md"
            >
              <LogInIcon className="w-4 h-4" />
              <span>Sign In</span>
            </button>

            <button
              onClick={() => navigate("/signup")}
              className="flex items-center space-x-2 px-6 mr-18 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-md font-semibold transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5"
            >
              <UserPlus2 className="w-4 h-4" />
              <span>Sign Up</span>
            </button>
            
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center relative">
        <div data-aos="fade-in" className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Green living hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-100/40 via-green-100/50 to-teal-400"></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r bg-green-600/20 z-10"></div>
        <div className="max-w-5xl mx-auto relative z-10">
          <div data-aos="zoom-in" className="inline-flex items-center space-x-2 bg-yellow-50 text-yellow-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <StarsIcon className="w-4 h-4" />
            <span>Trusted by 50,000+ Eco-Warriors</span>
          </div>
          <h2 data-aos="zoom-in" className="text-6xl font-bold text-foreground mb-8 leading-tight">
            Your Complete{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r bg-gray-50">
              Eco-System
            </span>{" "}
            for Sustainable Living
          </h2>
          <p data-aos="zoom-in" className="text-xl font-lightbold text-gradient-to-r from-gray-900 via-white to-gray-800 mb-12 leading-relaxed max-w-4xl mx-auto ">
            Transform your lifestyle with AI-powered tools that make sustainable
            living effortless, rewarding, and impactful. Join the green
            revolution today.
          </p>
          <div data-aos="fade-up" className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <button
              onClick={() => navigate("/signup")}
              className="flex items-center space-x-3 px-10 py-5 border border-primary-foreground bg-primary hover:bg-primary/90 text-primary-foreground rounded-md font-semibold text-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group"
            >
              <span>Start Your Journey</span>
              <ArrowRightLeft className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            <div className="flex items-center space-x-8 text-gray-50">
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-1">
                  {[1, 2, 3].map((i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <span className="font-semibold">4.9/5 Rating</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users2 className="w-6 h-6 text-gray-50" />
                <span className="font-semibold">50K+ Active Users</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-6 py-20 ">
        <div data-aos="fade-in" className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-100 to-green-200 text-emerald-700 px-6 py-3 rounded-full text-lg font-semibold mb-6">
            <Leaf className="w-5 h-5" />
            <span>Our Eco-Tools</span>
          </div>
          <h3 className="text-5xl font-bold text-foreground mb-6">
            Four Powerful Tools for a{" "}
            <span className="text-emerald-600">Greener Tomorrow</span>
          </h3>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Each feature is meticulously designed to make sustainable living
            easier, more accessible, and incredibly rewarding.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto ">
          {features.map((feature, index) => (
            <div key={index} data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}>
              <FeatureCard
                key={index}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                gradient={feature.gradient}
                onClick={handleFeatureClick}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Powerful Features Section */}
      <section className="container mx-auto px-6 py-20 bg-gradient-to-r from-emerald-300 via-gray-100 to-teal-300 ">
        <div data-aos="fade-in" className="text-center mb-16">
          <h3 className="text-4xl font-bold text-foreground mb-6">
            Why VerdiGo is{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-blue-700 bg-clip-text text-transparent">
              Exceptional
            </span>
          </h3>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover what makes our platform the most powerful and comprehensive
            eco-system for sustainable living
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 m-10">
          {powerfulFeatures.map((feature, index) => (
            <div
              data-aos="fade-put"
              key={index}
              className="bg-card rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-border hover:border-primary group"
            >
              <div className="bg-muted hover:bg-accent w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h4 className="text-xl font-semibold text-foreground mb-4">
                {feature.title}
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
        
      </section>

      {/* Detailed Information Heading */}
      <section data-aos="fade-in" className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-teal-100 text-blue-700 px-6 py-3 rounded-full text-lg font-semibold mb-6">
            <Globe2 className="w-5 h-5" />
            <span>Deep Dive</span>
          </div>
          <h3 className="text-5xl font-bold text-foreground mb-6">
            How Our <span className="text-emerald-600">Eco-Tools</span>{" "}
            Transform Your Life
          </h3>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Explore the comprehensive features and real-world impact of each
            tool in our sustainable living ecosystem
          </p>
        </div>
      </section>

      {/* Detailed Information */}
      <section className="container mx-auto px-6 pb-20">
        <div className="max-w-7xl mx-auto space-y-20">
          {/* Green Lane */}
          <div data-aos="fade-right" className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-3xl shadow-2xl overflow-hidden">
            <div className="flex flex-col lg:flex-row items-center">
              <div className="flex-1 p-12 text-white">
                <div className="bg-white/20 p-4 rounded-2xl w-fit mb-6">
                  <RouteIcon className="w-12 h-12 text-white" />
                </div>
                <h4 className="text-4xl font-bold mb-6">
                  Green Lane - Eco-Smart Navigation
                </h4>
                <p className="text-emerald-100 mb-8 text-lg leading-relaxed">
                  Revolutionary navigation that considers environmental impact
                  alongside travel time. Green Lane analyzes traffic patterns,
                  vehicle emissions, and route efficiency to suggest the most
                  sustainable paths to your destination.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-emerald-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-emerald-300 rounded-full"></div>
                    <span>Real-time carbon footprint tracking</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-emerald-300 rounded-full"></div>
                    <span>Alternative transport suggestions</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-emerald-300 rounded-full"></div>
                    <span>Eco-friendly stops and charging stations</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-emerald-300 rounded-full"></div>
                    <span>Gamified rewards for green choices</span>
                  </div>
                </div>
              </div>
              <div className="flex-1 p-12">
                <img
                  src="https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Eco-friendly navigation"
                  className="rounded-2xl shadow-2xl w-full h-80 object-cover"
                />
              </div>
            </div>
          </div>

          {/* Local Harvest */}
          <div data-aos="fade-left" className="bg-gradient-to-r from-amber-300 to-green-600 rounded-3xl shadow-2xl overflow-hidden">
            <div className="flex flex-col lg:flex-row-reverse items-center">
              <div className="flex-1 p-12 text-white">
                <div className="bg-white/20 p-4 rounded-2xl w-fit mb-6">
                  <ShoppingBasket className="w-12 h-12 text-white" />
                </div>
                <h4 className="text-4xl font-bold mb-6">
                  Local Harvest - Farm to Table Connection
                </h4>
                <p className="text-green-100 mb-8 text-lg leading-relaxed">
                  Connect directly with local farmers, community gardens, and
                  sustainable food producers in your area. Support your local
                  economy while enjoying the freshest, most nutritious food
                  available.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-green-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-300 rounded-full"></div>
                    <span>Interactive map of local farms</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-300 rounded-full"></div>
                    <span>Seasonal produce calendar</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-300 rounded-full"></div>
                    <span>Direct ordering and pickup</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-300 rounded-full"></div>
                    <span>Community recipes and tips</span>
                  </div>
                </div>
              </div>
              <div className="flex-1 p-12">
                <img
                  src="https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Local farming and fresh produce"
                  className="rounded-2xl shadow-2xl w-full h-80 object-cover"
                />
              </div>
            </div>
          </div>

          {/* Air Buddy */}
          <div data-aos="fade-right" className="bg-gradient-to-r from-blue-400 to-blue-900 rounded-3xl shadow-2xl overflow-hidden">
            <div className="flex flex-col lg:flex-row items-center">
              <div className="flex-1 p-12 text-white">
                <div className="bg-white/20 p-4 rounded-2xl w-fit mb-6">
                  <WindArrowDown className="w-12 h-12 text-white" />
                </div>
                <h4 className="text-4xl font-bold mb-6">
                  Air Buddy - Your Personal Air Quality Monitor
                </h4>
                <p className="text-blue-100 mb-8 text-lg leading-relaxed">
                  Stay informed about air quality conditions and make better
                  decisions about outdoor activities. Air Buddy provides
                  hyper-local air quality data and personalized recommendations
                  for healthier living.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-blue-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
                    <span>Real-time AQI monitoring</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
                    <span>Personalized activity recommendations</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
                    <span>Pollen and allergen tracking</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
                    <span>Indoor air quality tips</span>
                  </div>
                </div>
              </div>
              <div className="flex-1 p-12">
                <img
                  src="https://images.pexels.com/photos/459728/pexels-photo-459728.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Clean air and environmental monitoring"
                  className="rounded-2xl shadow-2xl w-full h-80 object-cover"
                />
              </div>
            </div>
          </div>

          {/* WasteLess */}
          <div data-aos="fade-left" className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-3xl shadow-2xl overflow-hidden">
            <div className="flex flex-col lg:flex-row-reverse items-center">
              <div className="flex-1 p-12 text-white">
                <div className="bg-white/20 p-4 rounded-2xl w-fit mb-6">
                  <Trash2 className="w-12 h-12 text-white" />
                </div>
                <h4 className="text-4xl font-bold mb-6">
                  WasteLess - Smart Waste Management
                </h4>
                <p className="text-teal-100 mb-8 text-lg leading-relaxed">
                  Transform your approach to waste with intelligent tracking,
                  recycling guidance, and actionable insights. WasteLess helps
                  you minimize environmental impact through smarter consumption
                  and disposal habits.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-teal-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-teal-300 rounded-full"></div>
                    <span>Waste tracking with trends</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-teal-300 rounded-full"></div>
                    <span>Recycling center locator</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-teal-300 rounded-full"></div>
                    <span>Composting tips and programs</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-teal-300 rounded-full"></div>
                    <span>Zero-waste challenges</span>
                  </div>
                </div>
              </div>
              <div className="flex-1 p-12">
                <img
                  src="https://images.pexels.com/photos/3735218/pexels-photo-3735218.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Waste management and recycling"
                  className="rounded-2xl shadow-2xl w-full h-80 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-6 py-20">
        <div data-aos="fade-in" className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-foreground mb-6">
              Frequently Asked{" "}
              <span className="bg-gradient-to-r from-emerald-600 via-yellow-400 to-teal-500 bg-clip-text text-transparent">
                Questions
              </span>
            </h3>
            <p className="text-xl text-muted-foreground">
              Everything you need to know about VerdiGo and sustainable living
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                data-aos="fade-up"
                key={index}
                className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-6 text-left flex justify-between items-center hover:bg-emerald-50 transition-colors duration-200 cursor-pointer"
                >
                  <h4 className="text-lg font-semibold text-foreground pr-4">
                    {faq.question}
                  </h4>
                  {openFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="container mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-emerald-500 via-emerald-400 to-green-600 rounded-2xl m-10 p-16 text-center text-white relative overflow-hidden">
          <div data-aos="fade-in" className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-green-600/20"></div>
          <div data-aos="fade-out" className="relative z-10">
            <Globe className="w-20 h-20 mx-auto mb-8 opacity-90" />
            <h3 className="text-5xl font-bold mb-6">
              Ready to Transform Your Impact?
            </h3>
            <p className="text-2xl mb-12 opacity-90 max-w-3xl mx-auto leading-relaxed">
              Join the VerdiGo community and start your journey towards a more
              sustainable lifestyle today. Every small action contributes to a
              greener planet for future generations.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button
                onClick={() => navigate("/signup")}
                className="px-10 py-5 bg-card text-primary rounded-2xl font-semibold text-xl hover:bg-card/80 transition-all duration-200 hover:shadow-2xl hover:-translate-y-1"
              >
                Start Your Eco-Journey
              </button>
  


              <div className="flex items-center space-x-4 text-emerald-50">
                <span className="text-lg">✓ Free to start</span>
                <span className="text-lg">✓ No credit card required</span>
                <span className="text-lg">✓ Join 50K+ users</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div data-aos="fade-up" className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-3 rounded-xl">
                  <Leaf className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">VerdiGo</h3>
                  <p className="text-emerald-400">Eco-System Platform</p>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
                Empowering individuals and communities to make sustainable
                choices through innovative technology and AI-powered insights.
                Together, we're building a greener future.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="bg-gray-800 p-3 rounded-lg hover:bg-emerald-600 transition-colors duration-200"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="bg-gray-800 p-3 rounded-lg hover:bg-emerald-600 transition-colors duration-200"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="bg-gray-800 p-3 rounded-lg hover:bg-emerald-600 transition-colors duration-200"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="bg-gray-800 p-3 rounded-lg hover:bg-emerald-600 transition-colors duration-200"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-emerald-400 transition-colors duration-200"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-emerald-400 transition-colors duration-200"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-emerald-400 transition-colors duration-200"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-emerald-400 transition-colors duration-200"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-emerald-400 transition-colors duration-200"
                  >
                    Community
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Contact</h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-emerald-400" />
                  <span className="text-gray-300">hello@verdigo.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-emerald-400" />
                  <span className="text-gray-300">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-emerald-400" />
                  <span className="text-gray-300">San Francisco, CA</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              &copy; 2025 VerdiGo. Making the world greener, one choice at a
              time.
            </p>
            <div className="flex space-x-6 text-sm">
              <a
                href="#"
                className="text-gray-400 hover:text-emerald-400 transition-colors duration-200"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-emerald-400 transition-colors duration-200"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-emerald-400 transition-colors duration-200"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
<button
  onClick={() => navigate("/feedback")}
  className="fixed bottom-28 right-8 z-[9999] bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 flex items-center justify-center"
  title="Give Feedback"
>
  <PenLine className="w-6 h-6" />
</button>
     

    </div>
  );
};


export default LandingPage;
