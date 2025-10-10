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
//       <header className="bg-white shadow-sm border-b border-emerald-100">
//         <div className="container mx-auto px-6 py-4">
//           <div className="flex justify-between items-center">
//             <div className="flex items-center space-x-3">
//               <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-2 rounded-lg">
//                 <Leaf className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-xl font-bold text-emerald-800">VerdiGo</h1>
//                 <p className="text-sm text-gray-600">Welcome back, {user?.name}!</p>
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
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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
  Calculator
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { ModeToggle } from '../components/ModeToggle'
import WeatherCard from '@/components/weatherCard'


const Dashboard = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const features = [
    {
      title: 'Green Lane',
      description: 'Plan your eco-friendly routes and track carbon savings',
      icon: <Route className='w-8 h-8 text-white' />,
      color: 'from-emerald-400 to-emerald-600',
      comingSoon: true,
      stats: '0 routes planned',
      link:'/dashboard/green-lane'
    },
    {
      title: 'Local Harvest',
      description: 'Find local farmers and fresh produce near you',
      icon: <ShoppingBasket className='w-8 h-8 text-white' />,
      color: 'from-green-400 to-green-600',
      comingSoon: true,
      stats: '12 farms nearby',
      link:'/dashboard/local-harvest'
    },
    {
      title: 'Air Buddy',
      description: 'Monitor air quality and get health recommendations',
      icon: <Wind className='w-8 h-8 text-white' />,
      color: 'from-blue-400 to-blue-600',
      comingSoon: true,
      stats: 'AQI: Good (45)',
      link:'/dashboard/air-buddy'
    },
    {
      title: 'WasteLess',
      description: 'Track and reduce your environmental footprint',
      icon: <Trash2 className='w-8 h-8 text-white' />,
      color: 'from-teal-400 to-teal-600',
      comingSoon: true,
      stats: '15% reduction',
      link:'https://trash-vision-classify-it.vercel.app/'
    },
    {
      title: 'Carbon Footprint Calculator',
      description: 'Track and reduce your environmental footprint',
      icon: <Calculator className='w-8 h-8 text-white' />,
      color: 'from-teal-400 to-teal-600',
      comingSoon: true,
      stats: '15% reduction',
      link:'/dashboard/carbon-footprint-calculator'
    }


  ]

  const quickStats = [
    {
      title: 'Carbon Saved',
      value: '30 kg',
      change: '+0%',
      icon: <TreePine className='w-6 h-6 text-green-600' />,
      color: 'bg-green-50 border-green-200'
    },
    {
      title: 'Eco Score',
      value: '750',
      change: '+12%',
      icon: <Star className='w-6 h-6 text-yellow-600' />,
      color: 'bg-yellow-50 border-yellow-200'
    },
    {
      title: 'Local Purchases',
      value: '8',
      change: '+0%',
      icon: <ShoppingBasket className='w-6 h-6 text-blue-600' />,
      color: 'bg-blue-50 border-blue-200'
    },
    {
      title: 'Community Rank',
      value: '#1,247',
      change: '+5',
      icon: <TrendingUp className='w-6 h-6 text-teal-600' />,
      color: 'bg-teal-50 border-teal-200'
    }
  ]

  const recentActivities = [
    {
      title: 'Welcome to VerdiGo!',
      description: 'Your account has been successfully created',
      time: 'Just now',
      icon: <CheckCircle className='w-5 h-5 text-green-500' />
    },
    {
      title: 'Eco-Challenge Available',
      description: 'Join the "Plastic-Free Week" challenge',
      time: '2 hours ago',
      icon: <Target className='w-5 h-5 text-blue-500' />
    },
    {
      title: 'Air Quality Alert',
      description: 'Good air quality in your area today',
      time: '4 hours ago',
      icon: <Wind className='w-5 h-5 text-teal-500' />
    }
  ]

  const ecoTips = [
    {
      title: 'Start Small',
      description: 'Begin with simple changes like using reusable bags',
      icon: <Lightbulb className='w-5 h-5 text-yellow-500' />
    },
    {
      title: 'Local Shopping',
      description: 'Support local farmers and reduce transportation emissions',
      icon: <MapPin className='w-5 h-5 text-green-500' />
    },
    {
      title: 'Energy Saving',
      description: 'Switch to LED bulbs and unplug unused devices',
      icon: <Zap className='w-5 h-5 text-blue-500' />
    }
  ]

  const achievements = [
    {
      title: 'First Steps',
      description: 'Created your VerdiGo account',
      icon: <Award className='w-6 h-6 text-yellow-500' />,
      earned: true
    },
    {
      title: 'Eco Warrior',
      description: 'Complete 5 sustainable actions',
      icon: <Award className='w-6 h-6 text-gray-400' />,
      earned: false
    },
    {
      title: 'Community Helper',
      description: 'Help 3 community members',
      icon: <Award className='w-6 h-6 text-gray-400' />,
      earned: false
    }
  ]

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
      {/* Header */}
      <header className='bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50'>
        <div className='container mx-auto px-6 py-4'>
          <div className='flex justify-between items-center'>
            <div className='flex items-center space-x-4'>
              <div className='bg-gradient-to-r from-blue-500 to-teal-500 p-3 rounded-xl shadow-lg'>
                <Leaf className='w-7 h-7 text-white' />
              </div>
              <div>
                <h1 className='text-2xl font-semibold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent'>
                  VerdiGo
                </h1>
                <p className='text-sm text-gray-600 font-medium'>
                  Welcome back, {user?.name || 'Eco Warrior'}!
                </p>
              </div>
            </div>
            <div className='flex items-center space-x-3'>
              <ModeToggle />
              <button className='relative p-3 bg-green-100 text-green-800 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200'>
                <Bell className='w-5 h-5 '  />
                <span className='absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full'></span>
              </button>
              <button className='p-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200'>
                <Settings className='w-5 h-5' />
              </button>
              <button className='p-3 text-gray-600 bg-gray-50 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200'>
                <User className='w-5 h-5' />
              </button>
              <button
                onClick={handleLogout}
                className='flex items-center space-x-2 px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all duration-200'
              >
                <LogOut className='w-4 h-4' />
                <span className='font-medium'>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className='container mx-auto px-6 py-8'>
        {/* Welcome Banner */}
        <div className='bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 rounded-3xl p-8 text-white mb-8 relative overflow-hidden'>
          <div className='absolute inset-0 bg-gradient-to-r from-blue-600/20 to-green-600/20'></div>
          <div className='relative z-10'>
            <div className='flex items-center justify-between'>
              <div>
                <h2 className='text-4xl font-semibold mb-3'>
                  Welcome to Your Eco-Dashboard! 🌱
                </h2>
                <p className='text-blue-100 text-lg leading-relaxed max-w-2xl'>
                  You've successfully joined the VerdiGo community. Your
                  sustainable living journey starts here. Let's make a positive
                  impact together!
                </p>
              </div>
              <div className='hidden lg:block'>
                <Globe className='w-32 h-32 text-white/20' />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10'>
          {quickStats.map((stat, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl p-6 border-2 ${stat.color} shadow-sm hover:shadow-lg transition-all duration-300`}
            >
              <div className='flex items-center justify-between mb-4'>
                <div className='p-3 rounded-xl bg-gray-100 shadow-sm'>
                  {stat.icon}
                </div>
                <span className='text-sm font-semibold text-green-600'>
                  {stat.change}
                </span>
              </div>
              <h3 className='text-2xl font-bold text-gray-800 mb-1'>
                {stat.value}
              </h3>
              <p className='text-gray-600 font-medium'>{stat.title}</p>
            </div>
          ))}
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Left Column */}
          <div className='lg:col-span-2 space-y-8'>
            {/* Features Grid */}
            <div>
              <div className='flex items-center justify-between mb-6'>
                <h3 className='text-2xl font-bold text-gray-800'>
                  Your Eco-Tools
                </h3>
                <button className='text-blue-600 hover:text-blue-800 font-semibold flex items-center space-x-1'>
                  <span>View All</span>
                  <ArrowRight className='w-4 h-4' />
                </button>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {features.map((feature, index) => (
                  <Link 
                    to={feature.link}
                    key={index}
                    className='bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl hover:border-blue-200 transition-all duration-300 group cursor-pointer'
                  >
                    <div className='flex items-start justify-between mb-4'>
                      <div
                        className={`bg-gradient-to-br ${feature.color} p-4 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      >
                        {feature.icon}
                      </div>
                      {feature.comingSoon && (
                        <span className='bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold'>
                          Tap to Explore
                        </span>
                      )}
                    </div>
                    <h4 className='text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300'>
                      {feature.title}
                    </h4>
                    <p className='text-gray-600 mb-3 leading-relaxed'>
                      {feature.description}
                    </p>
                    <div className='flex items-center justify-between'>
                      <span className='text-sm font-semibold text-teal-600'>
                        {feature.stats}
                      </span>
                      <ArrowRight className='w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300' />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Progress Section */}
            <div className='bg-white rounded-2xl shadow-lg p-8 border border-gray-100'>
              <h3 className='text-2xl font-bold text-gray-800 mb-6'>
                Your Sustainability Journey
              </h3>
              <div className='space-y-6'>
                <div>
                  <div className='flex items-center justify-between mb-2'>
                    <span className='font-semibold text-gray-700'>
                      Weekly Eco Goal
                    </span>
                    <span className='text-sm font-bold text-blue-600'>
                      2/7 completed
                    </span>
                  </div>
                  <div className='w-full bg-gray-200 rounded-full h-3'>
                    <div
                      className='bg-gradient-to-r from-blue-500 to-teal-500 h-3 rounded-full transition-all duration-500'
                      style={{ width: '28%' }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className='flex items-center justify-between mb-2'>
                    <span className='font-semibold text-gray-700'>
                      Carbon Footprint Reduction
                    </span>
                    <span className='text-sm font-bold text-green-600'>
                      15% this month
                    </span>
                  </div>
                  <div className='w-full bg-gray-200 rounded-full h-3'>
                    <div
                      className='bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-500'
                      style={{ width: '15%' }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Getting Started */}
            <div className='bg-white rounded-2xl shadow-lg p-8 border border-gray-100'>
              <h3 className='text-2xl font-bold text-gray-800 mb-6'>
                Getting Started
              </h3>
              <div className='space-y-6'>
                {[
                  {
                    step: 1,
                    title: 'Explore Your Features',
                    description:
                      'Each tool is designed to help you live more sustainably',
                    completed: true
                  },
                  {
                    step: 2,
                    title: 'Set Your Goals',
                    description:
                      'Define your sustainability objectives and track progress',
                    completed: false
                  },
                  {
                    step: 3,
                    title: 'Join the Community',
                    description: 'Connect with other eco-conscious individuals',
                    completed: false
                  },
                  {
                    step: 4,
                    title: 'Track Your Impact',
                    description: 'Monitor your carbon savings and eco-score',
                    completed: false
                  },
                  {
                    step: 5,
                    title: 'Earn Green Rewards',
                    description:
                      'Get rewarded for taking eco-friendly actions and hitting milestones',
                    completed: false
                  },
                  {
                    step: 6,
                    title: 'Share Your Achievements',
                    description:
                      'Inspire others by sharing your sustainability progress',
                    completed: false
                  }
                  
                  
                ].map((item, index) => (
                  <div key={index} className='flex items-start space-x-4'>
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                        item.completed
                          ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                          : 'bg-gradient-to-r from-blue-500 to-teal-500'
                      }`}
                    >
                      {item.completed ? (
                        <CheckCircle className='w-5 h-5' />
                      ) : (
                        item.step
                      )}
                    </div>
                    <div className='flex-1'>
                      <h4 className='font-bold text-gray-800 mb-1'>
                        {item.title}
                      </h4>
                      <p className='text-gray-600 leading-relaxed'>
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className='space-y-8'>
            {/* Recent Activity */}
            <div className='bg-white rounded-2xl shadow-lg p-6 border border-gray-100'>
              <h3 className='text-xl font-bold text-gray-800 mb-6'>
                Recent Activity
              </h3>
              <div className='space-y-4'>
                {recentActivities.map((activity, index) => (
                  <div
                    key={index}
                    className='flex items-start space-x-3 p-3 rounded-xl hover:bg-green-100 transition-colors duration-200'
                  >
                    <div className='p-2 rounded-lg bg-gray-50'>
                      {activity.icon}
                    </div>
                    <div className='flex-1'>
                      <h4 className='font-semibold text-gray-800 text-sm'>
                        {activity.title}
                      </h4>
                      <p className='text-gray-600 text-sm'>
                        {activity.description}
                      </p>
                      <span className='text-xs text-gray-500'>
                        {activity.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className='bg-white rounded-2xl shadow-lg p-6 border border-gray-100'>
              <h3 className='text-xl font-bold text-gray-800 mb-6'>
                Achievements
              </h3>
              <div className='space-y-4'>
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-3 p-3 rounded-xl ${
                      achievement.earned
                        ? 'bg-yellow-50 border border-yellow-200'
                        : 'bg-gray-50'
                    }`}
                  >
                    {achievement.icon}
                    <div className='flex-1'>
                      <h4
                        className={`font-semibold text-sm ${
                          achievement.earned
                            ? 'text-yellow-800'
                            : 'text-gray-600'
                        }`}
                      >
                        {achievement.title}
                      </h4>
                      <p
                        className={`text-xs ${
                          achievement.earned
                            ? 'text-yellow-600'
                            : 'text-gray-500'
                        }`}
                      >
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Eco Tips */}
            <div className='bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl shadow-lg p-6 border border-green-200'>
              <h3 className='text-xl font-bold text-gray-800 mb-6'>
                💡 Daily Eco Tips
              </h3>
              <div className='space-y-4'>
                {ecoTips.map((tip, index) => (
                  <div
                    key={index}
                    className='flex items-start space-x-3 p-3 bg-white rounded-xl shadow-sm'
                  >
                    <div className='p-2 rounded-lg bg-gray-50'>{tip.icon}</div>
                    <div>
                      <h4 className='font-semibold text-gray-800 text-sm mb-1'>
                        {tip.title}
                      </h4>
                      <p className='text-gray-600 text-sm leading-relaxed'>
                        {tip.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Weather Widget */}
            <WeatherCard />
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
