import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import ThemeToggle from "@/components/ThemeToggle";
import AOS from "aos";
import "aos/dist/aos.css";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Bell,
  Facebook,
  Instagram,
  Leaf,
  Linkedin,
  LogOut,
  Mail,
  MapPin,
  Phone,
  Settings,
  Twitter,
  User,
} from "lucide-react";

const TermsOfService = () => {
  const termsContent = [
    {
      title: "1. Introduction",
      description:
        "Welcome to VerdiGo, an eco-system platform designed to promote environmental sustainability. By using our services, you agree to comply with these Terms & Conditions. Please read them carefully before participating.",
    },
    {
      title: "2. User Responsibilities",
      description:
        "Users must provide accurate data and use all features ethically. You are responsible for maintaining the confidentiality of your account and for all activities under your account.",
    },
    {
      title: "3. Data and Privacy",
      description:
        "We are committed to protecting your privacy. User data is handled according to our Privacy Policy, which outlines how we collect, use, and protect your personal information within the app.",
    },
    {
      title: "4. Third-Party Services",
      description:
        "VerdiGo uses third-party APIs, maps, and external data sources. We are not responsible for the accuracy or availability of these external services and disclaim liability for any issues arising from their use.",
    },
    {
      title: "5. Limitation of Liability",
      description:
        "VerdiGo provides environmental data 'as-is' and makes no warranties regarding accuracy. We are not liable for any damages arising from the use of our services or reliance on the data provided.",
    },
    {
      title: "6. Contact Information",
      description:
        "If you have any questions or concerns regarding these Terms & Conditions, please contact us at hello@verdigo.com. We are here to help and address any queries you may have.",
    },
  ];
  const { user, logout } = useAuth();
  const navigate = useNavigate();

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
                <p className="text-sm text-muted-foreground font-medium">
                  Welcome back,{" "}
                  <span className="text-emerald-600 font-semibold">
                    {user?.name || "Eco Warrior"}
                  </span>
                  !
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
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
          </div>
        </div>
      </header>
      <main className="container mx-auto px-6 py-8 relative z-10">
        {/* Header */}
        <div className="mb-12 py-5 px-1  ">
          <h1 className="text-3xl font-bold mb-2">Terms & Conditions</h1>
          <p className="text-muted-foreground">
            Please read these terms before participating.
          </p>
        </div>
        {/* main content */}
        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6">
          {/* terms content */}
          <div className="lg:col-span-2 space-y-6">
            {termsContent.map((term, idx) => (
              <div
                key={idx}
                className="group relative overflow-hidden bg-gradient-to-br from-white via-emerald-50/30 to-teal-50/40 dark:from-slate-900 dark:via-emerald-950/20 dark:to-teal-950/20 rounded-xl p-6 shadow-lg border-2 border-emerald-200/50 dark:border-emerald-800/30 hover:shadow-2xl hover:shadow-emerald-500/30 hover:border-emerald-400/60 hover:-translate-y-1 transition-all duration-500"
                data-aos="fade-up"
                data-aos-delay={idx * 200}
              >
                {/* Decorative gradient accent */}
                <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-emerald-500 via-teal-500 to-cyan-500 rounded-l-xl group-hover:w-2 transition-all duration-300"></div>

                {/* Animated background glow */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative z-10">
                  <h2 className="text-lg font-bold mb-3 bg-gradient-to-r from-emerald-700 via-teal-600 to-cyan-600 dark:from-emerald-400 dark:via-teal-400 dark:to-cyan-400 bg-clip-text text-transparent group-hover:from-emerald-600 group-hover:via-teal-500 group-hover:to-cyan-500 transition-all duration-300">
                    {term.title}
                  </h2>
                  <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors duration-300">
                    {term.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {/* sidebar */}
          <div className="space-y-6">
            {/* quick links */}
            <div
              className="bg-card rounded-lg p-7 shadow-md border border-border/50 hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay={400}
            >
              <h3 className="text-sm font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#faqs"
                    className="text-sm text-muted-foreground hover:text-black transition-colors duration-200"
                  >
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    href="#privacy-policy"
                    className="text-sm text-muted-foreground hover:text-black transition-colors duration-200"
                  >
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
            {/* Need help card */}
            <div
              className="relative overflow-hidden rounded-lg p-7 shadow-md hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 border border-emerald-400/50"
              data-aos="fade-up"
              data-aos-delay={600}
            >
              {/* Animated background overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10">
                <h3 className="font-bold text-base text-white mb-3 flex items-center space-x-2">
                  <Mail className="w-5 h-5" />
                  <span>Need Help?</span>
                </h3>
                <p className="text-sm text-white/95 leading-relaxed">
                  Contact us at{" "}
                  <a
                    href="mailto:hello@site.xyz"
                    className="font-semibold text-white underline decoration-2 underline-offset-2 hover:text-emerald-100 hover:decoration-emerald-100 transition-all duration-200"
                  >
                    hello@verdigo.com
                  </a>{" "}
                  for any legal inquiries.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
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
    </div>
  );
};

export default TermsOfService;
