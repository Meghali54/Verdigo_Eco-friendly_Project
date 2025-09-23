import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Leaf, Mail, Lock, User, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      const success = await signup(formData.name, formData.email, formData.password);
      if (success) {
        navigate('/dashboard');
      } else {
        setErrors({ general: 'Failed to create account. Please try again.' });
      }
    } catch (error) {
      setErrors({ general: 'An error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    
      <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-emerald-300 via-green-50 to-teal-500 overflow-hidden">
        {/* Left Side - Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center m-10">
          {/* Back Button */}
          <button
            onClick={() => navigate('/')}
            className="flex items-center font-normal space-x-2 text-emerald-700 hover:text-emerald-800 mb-8 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span >Back to Home</span>
          </button>

          {/* Header */}
          <div className="mb-8">
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-3 rounded-xl w-fit mb-4">
              <Leaf className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Join VerdiGo</h1>
            <p className="text-lg text-gray-600">Start your sustainable living journey today</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {errors.general && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {errors.general}
              </div>
            )}

            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors duration-200 ${
                    errors.name ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter your full name"
                />
              </div>
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors duration-200 ${
                    errors.email ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors duration-200 ${
                    errors.password ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Create a password"
                />
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors duration-200 ${
                    errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Confirm your password"
                />
              </div>
              {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white py-4 rounded-lg font-semibold text-lg transition-all duration-200 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors duration-200">
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="w-full md:w-1/2 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/90 to-green-600/90 z-10"></div>
          <img 
            src="https://images.pexels.com/photos/1072179/pexels-photo-1072179.jpeg?auto=compress&cs=tinysrgb&w=800" 
            alt="Sustainable living and eco-friendly lifestyle" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 z-20 flex items-center justify-center p-12">
            <div className="text-center text-white">
              <h2 className="text-4xl font-bold mb-6">Welcome to the Green Revolution</h2>
              <p className="text-xl leading-relaxed opacity-90">
                Join thousands of eco-warriors who are already making a positive impact on our planet through smart, sustainable choices.
              </p>
              <div className="mt-8 flex justify-center space-x-8">
                <div className="text-center">
                  <div className="text-3xl font-bold">50K+</div>
                  <div className="text-sm opacity-80">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">1M+</div>
                  <div className="text-sm opacity-80">CO₂ Saved (kg)</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">500+</div>
                  <div className="text-sm opacity-80">Cities</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    
  );
};

export default SignupPage;