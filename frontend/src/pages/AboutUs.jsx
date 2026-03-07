import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Leaf,
  LogOut,
  User,
  Settings,
  MapPin,
  Bell,
  Target,
  Users,
  Lightbulb,
  Activity,
  Globe,
  Heart,
  Mail,
  Phone,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

import ThemeToggle from "@/components/ThemeToggle";

import AOS from "aos";
import "aos/dist/aos.css";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const AboutUs = () => {
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

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8 relative z-10">
        {/* about Section */}
        <section className="bg-gradient-to-br from-primary/5 via-accent/20 to-secondary/10 py-20 px-6 rounded-2xl border border-border mb-20">
          <div data-aos="fade-up" className=" text-center mx-auto max-w-4xl">
            <h2 className="mb-6 text-4xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              About VerdiGo
            </h2>
            <p className="text-muted-foreground text-lg mx-auto max-w-4xl">
              VerdiGo is built to help people make better choices for the
              planet, without making life complicated. We believe small actions,
              done consistently, can create real change.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-5">
              <Button size="lg">Get in Touch</Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </div>
        </section>
        <div className="py-16 px-6  bg-card rounded-2xl border border-border mb-20">
          <div className="text-center  mb-12">
            <h2 className="mb-4  text-3xl font-bold text-emerald-600 ">
              Our Mission & Vision{" "}
            </h2>
            <p className="text-md text-muted-foreground">
              Driving innovation and excellence in everything we do
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-5 mb-20 ">
            <div
              data-aos="fade-right"
              className="bg-card rounded-2xl p-8 shadow-md border border-border hover:border-emerald-600 hover:shadow-xl transition-shadow duration-600 "
            >
              <div className="flex items-center gap-3 mb-4">
                <Target className="text-emerald-600 w-6 h-6" />
                <h3 className="text-2xl font-semibold">Our Mission</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Our mission is to make eco-friendly living easy and rewarding.
                We want to help users track their impact, reduce waste, and
                adopt sustainable habits in a simple and practical way.
              </p>
            </div>
            <div
              data-aos="fade-left"
              className="bg-card rounded-2xl p-8 shadow-md border border-border hover:border-emerald-600 hover:shadow-xl transition-shadow duration-600"
            >
              <div className="flex items-center gap-3 mb-4">
                <Globe className="text-teal-600 w-6 h-6" />
                <h3 className="text-2xl font-semibold">Our Vision</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                We imagine a future where sustainable choices are part of
                everyday life. A world where technology supports the planet, not
                harms it. VerdiGo aims to be a small step toward that future.
              </p>
            </div>
          </div>
        </div>
        {/* what we do  */}
        <div data-aos="fade-up" className="mb-10 py-10">
          <h3 className="text-3xl font-bold text-center mb-10">What We Do</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-xl  border border-border shadow-sm">
              <Activity className="w-8 h-8 text-emerald-600 mb-4 ml-1" />
              <h4 className="text-xl font-semibold mb-4 text-emerald-600">
                Track Your Impact
              </h4>
              <p className="text-muted-foreground">
                {" "}
                Monitor your daily actions and understand how they affect the
                environment.
              </p>
            </div>
            <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
              <Lightbulb className="w-8 h-8 text-cyan-600 mb-4" />
              <h4 className="text-xl font-semibold mb-2 text-cyan-600">
                Smart Suggestions
              </h4>
              <p className="text-muted-foreground">
                Get simple tips and ideas to live more sustainably without
                changing your lifestyle too much.
              </p>
            </div>
            <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
              <Users className="w-8 h-8 text-teal-600 mb-4" />
              <h4 className="text-xl font-semibold mb-2  text-teal-600">
                Community Driven
              </h4>
              <p className="text-muted-foreground">
                Be part of a growing community that believes in positive,
                long-term change.
              </p>
            </div>
          </div>
        </div>
        <div className="py-16 px-6  bg-card rounded-2xl border border-border mb-20">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-semibold  mb-4">Get In Touch</h2>
              <p className="text-muted-foreground">
                Ready to start your digital transformation journey? We'd love to
                hear from you.
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card
              data-aos="fade-right"
              className="text-center hover:bg-gradient-to-r hover:from-emerald-50 hover:to-cyan-50 dark:hover:from-emerald-950/30 dark:hover:to-cyan-950/30 transition-colors duration-300"
            >
              <CardContent className="p-6">
                <Mail className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="mb-2">Email</h3>
                <p className="text-muted-foreground">hello@verdigo.com</p>
              </CardContent>
            </Card>
            <Card
              data-aos="fade-up"
              className="text-center hover:bg-gradient-to-r hover:from-emerald-50 hover:to-cyan-50 dark:hover:from-emerald-950/30 dark:hover:to-cyan-950/30 transition-colors duration-300"
            >
              <CardContent className="p-6">
                <Phone className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="mb-2">Phone</h3>
                <p className="text-muted-foreground">+1 (555) 123-4567</p>
              </CardContent>
            </Card>
            <Card
              data-aos="fade-left"
              className="text-center hover:bg-gradient-to-r hover:from-emerald-50 hover:to-cyan-50 dark:hover:from-emerald-950/30 dark:hover:to-cyan-950/30 transition-colors duration-300"
            >
              <CardContent className="p-6">
                <MapPin className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="mb-2">Location</h3>
                <p className="text-muted-foreground">San Francisco, CA</p>
              </CardContent>
            </Card>
          </div>
          <div data-aos="fade-up" className="text-center">
            <Button size="lg" className="mr-4">
              Contact Us
            </Button>
            <Button size="lg" className="ml-4" variant="outline">
              Careers
            </Button>
          </div>
        </div>
        {/* Closing Note */}
        <div
          data-aos="zoom-in"
          className="text-center bg-gradient-to-r from-emerald-50 to-cyan-50 dark:from-emerald-950/30 dark:to-cyan-950/30 p-10 rounded-2xl border border-border py-10  "
        >
          <Heart className="w-10 h-10 text-rose-500 mx-auto mb-4" />
          <h3 className="text-2xl font-semibold mb-3">
            Built with Care for the Planet
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            VerdiGo is more than an app. It is a reminder that every small
            effort counts. Together, we can move toward a cleaner and greener
            future.
          </p>
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
              <Link
                to="/privacy-policy"
                className="text-gray-400 hover:text-emerald-400 transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms-of-service"
                className="text-gray-400 hover:text-emerald-400 transition-colors duration-200"
              >
                Terms of Service
              </Link>
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

export default AboutUs;
