import React, { useEffect, useState } from 'react'
import {
  MapPin,
  Navigation,
  Award,
  Zap,
  Shield,
  Wind,
  Leaf
} from 'lucide-react'

const transportModes = [
  { id: 'driving', label: 'Driving' },
  { id: 'cycling', label: 'Cycling' },
  { id: 'walking', label: 'Walking' },
  { id: 'motorbike', label: 'Motorbike' },
  { id: 'transit', label: 'Public Transport' }
]

export default function SideBarGreenLane ({ onRouteChange, routeData, allRoutes }) {
  const [source, setSource] = useState('')
  const [destination, setDestination] = useState('')
  const [selectedMode, setSelectedMode] = useState('driving')
  const [ecoScore, setEcoScore] = useState(85)
  const [ecoPoints, setEcoPoints] = useState(1247)
  const [co2Saved, setCo2Saved] = useState(0)

  useEffect(() => {
    if (routeData && allRoutes && allRoutes.length > 1) {
      const safetyScore = routeData.safetyScore || 0
      const co2Factor =
        selectedMode === 'walking'
          ? 100
          : selectedMode === 'cycling'
          ? 95
          : selectedMode === 'transit'
          ? 75
          : selectedMode === 'driving'
          ? 30
          : 40
      const aqiFactor = routeData.aqi
        ? Math.max(0, ((150 - routeData.aqi) / 150) * 100)
        : 50

      const calculatedEcoScore = Math.round(
        safetyScore * 0.4 + aqiFactor * 0.3 + co2Factor * 0.3
      )
      setEcoScore(Math.min(100, Math.max(0, calculatedEcoScore)))

      const leastSafeRoute = allRoutes[allRoutes.length - 1]
      const safestRoute = allRoutes[0]

      if (leastSafeRoute && safestRoute) {
        const savedCo2 = Math.max(
          0,
          leastSafeRoute.environmentalData.co2Emissions -
            safestRoute.environmentalData.co2Emissions
        )
        setCo2Saved(savedCo2)
        if (savedCo2 > 0) {
          const bonusPoints = Math.round(savedCo2 * 10)
          setEcoPoints(prev => prev + bonusPoints)
        }
      }
    }
  }, [routeData, allRoutes, selectedMode])

  const handlePlanRoute = () => {
    if (source && destination) {
      onRouteChange(source, destination, selectedMode)
    }
  }

  return (
    <div className='w-96 bg-white shadow-xl border-r border-gray-100 flex flex-col h-full overflow-y-auto scrollbar-hidden'>
      {/* Route Planning */}
      <div className='p-6'>
        <h2 className='text-lg font-semibold text-gray-900 mb-4'>
          Plan Your Route
        </h2>

        <div className='space-y-4'>
          <div className='relative'>
            <MapPin className='w-5 h-5 text-green-500 absolute left-3 top-1/2 transform -translate-y-1/2' />
            <input
              type='text'
              placeholder='From where?'
              value={source}
              onChange={e => setSource(e.target.value)}
              className='w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors'
            />
          </div>

          <div className='relative'>
            <Navigation className='w-5 h-5 text-blue-500 absolute left-3 top-1/2 transform -translate-y-1/2' />
            <input
              type='text'
              placeholder='To where?'
              value={destination}
              onChange={e => setDestination(e.target.value)}
              className='w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors'
            />
          </div>

          <button
            onClick={handlePlanRoute}
            disabled={!source || !destination}
            className='w-full py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white font-medium rounded-xl hover:from-green-600 hover:to-blue-600 disabled:opacity-80 disabled:cursor-not-allowed transition-all'
          >
            Plan Route
          </button>
        </div>
      </div>

      {/* Transport Mode Selection */}
      <div className='px-6 pb-6'>
        <h2 className='text-lg font-semibold text-gray-900 mb-4'>Mode</h2>

        <div className='relative'>
          <select
            value={selectedMode}
            onChange={e => setSelectedMode(e.target.value)}
            className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors appearance-none bg-white text-gray-900 font-medium'
          >
            {transportModes.map(mode => (
              <option key={mode.id} value={mode.id}>
                {mode.label}
              </option>
            ))}
          </select>
          <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
            <svg
              className='w-5 h-5 text-gray-400'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M19 9l-7 7-7-7'
              />
            </svg>
          </div>
        </div>
      </div>

      {/* CO₂ Savings Alert */}
      {co2Saved > 0 && (
        <div className='mx-6 mb-6'>
          <div className='flex items-center justify-between p-4 bg-emerald-50 rounded-xl border border-emerald-200'>
            <div className='flex items-center space-x-3'>
              <Leaf className='w-5 h-5 text-emerald-600' />
              <div>
                <span className='text-sm font-semibold text-emerald-800'>CO₂ Saved</span>
                <p className='text-xs text-emerald-600'>vs. least safe route</p>
              </div>
            </div>
            <span className='text-lg font-bold text-emerald-600'>
              {co2Saved.toFixed(1)} kg
            </span>
          </div>
        </div>
      )}

      {/* Route Environmental Info */}
      {routeData && (
        <div className='px-6 pb-6'>
          <h2 className='text-lg font-semibold text-gray-900 mb-4'>
            Route Impact
          </h2>

          <div className='space-y-3'>
            <div className='flex items-center justify-between p-3 bg-green-50 rounded-lg'>
              <div className='flex items-center space-x-2'>
                <Zap className='w-4 h-4 text-green-600' />
                <span className='text-sm font-medium text-gray-700'>
                  CO₂ Emissions
                </span>
              </div>
              <span className='text-sm font-bold text-green-600'>
                {routeData.co2Emissions} kg
              </span>
            </div>

            <div className='flex items-center justify-between p-3 bg-blue-50 rounded-lg'>
              <div className='flex items-center space-x-2'>
                <Wind className='w-4 h-4 text-blue-600' />
                <span className='text-sm font-medium text-gray-700'>
                  Air Quality
                </span>
              </div>
              <span
                className={`text-sm font-bold ${routeData.aqiCategory?.color}`}
              >
                AQI {routeData.aqi}
              </span>
            </div>

            <div className='flex items-center justify-between p-3 bg-purple-50 rounded-lg'>
              <div className='flex items-center space-x-2'>
                <Shield className='w-4 h-4 text-purple-600' />
                <span className='text-sm font-medium text-gray-700'>
                  Safety Score
                </span>
              </div>
              <span className='text-sm font-bold text-purple-600'>
                {routeData.safetyScore}/100
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Dynamic Eco Meter */}
      <div className='px-6 pb-6'>
        <h2 className='text-lg font-semibold text-gray-900 mb-4'>Eco Meter</h2>

        <div className='relative'>
          <div className='flex items-center justify-between mb-2'>
            <span className='text-sm font-medium text-gray-600'>
              Environmental Impact
            </span>
            <span className={`text-sm font-bold ${
              ecoScore >= 80
                ? 'text-green-600'
                : ecoScore >= 60
                ? 'text-yellow-600'
                : 'text-red-600'
            }`}>
              {ecoScore}/100
            </span>
          </div>

          <div className='w-full bg-gray-200 rounded-full h-3'>
            <div
              className={`bg-gradient-to-r ${
                ecoScore >= 80
                  ? 'from-green-400 to-green-600'
                  : ecoScore >= 60
                  ? 'from-yellow-400 to-orange-500'
                  : 'from-orange-500 to-red-500'
              } h-3 rounded-full transition-all duration-500`}
              style={{ width: `${ecoScore}%` }}
            ></div>
          </div>

          <div className='flex justify-between mt-2 text-xs text-gray-500'>
            <span>Poor</span>
            <span>Excellent</span>
          </div>
        </div>

        <div className={`mt-4 p-4 rounded-xl ${
          ecoScore >= 80
            ? 'bg-green-50 border border-green-200'
            : ecoScore >= 60
            ? 'bg-yellow-50 border border-yellow-200'
            : 'bg-red-50 border border-red-200'
        }`}>
          <div className='flex items-start space-x-3'>
            <Zap className={`w-5 h-5 mt-0.5 ${
              ecoScore >= 80
                ? 'text-green-600'
                : ecoScore >= 60
                ? 'text-yellow-600'
                : 'text-red-600'
            }`} />
            <div>
              <div className={`text-sm font-semibold ${
                ecoScore >= 80
                  ? 'text-green-800'
                  : ecoScore >= 60
                  ? 'text-yellow-800'
                  : 'text-red-800'
              }`}>
                {ecoScore >= 80
                  ? 'Excellent Choice!'
                  : ecoScore >= 60
                  ? 'Good Choice'
                  : 'Consider Alternatives'}
              </div>
              <div className={`text-xs mt-1 ${
                ecoScore >= 80
                  ? 'text-green-700'
                  : ecoScore >= 60
                  ? 'text-yellow-700'
                  : 'text-red-700'
              }`}>
                {routeData
                  ? co2Saved > 0
                    ? `You saved ${co2Saved.toFixed(1)}kg CO₂ by choosing the safer route`
                    : `This route emits ${routeData.co2Emissions}kg CO₂`
                  : 'Plan a route to see environmental impact'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Eco Points */}
      <div className='px-6 pb-6 flex-1'>
        <div className='bg-gradient-to-br from-teal-200 to-green-200 rounded-xl p-6 border border-gray-100'>
          <h2 className='text-lg font-semibold text-gray-900 mb-4'>
            Your Eco Points
          </h2>

          <div className='text-center'>
            <div className='w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg'>
              <Award className='w-8 h-8 text-white' />
            </div>

            <div className='text-3xl font-bold text-gray-900 mb-1'>
              {ecoPoints.toLocaleString()}
            </div>
            <div className='text-sm text-gray-500 mb-4'>
              Total Points Earned
            </div>

            <div className='space-y-2'>
              <div className='flex justify-between text-sm'>
                <span className='text-gray-600'>This Week</span>
                <span className='font-semibold text-green-600'>+127 pts</span>
              </div>
              <div className='flex justify-between text-sm'>
                <span className='text-gray-600'>This Month</span>
                <span className='font-semibold text-blue-600'>+456 pts</span>
              </div>
              {routeData && (
                <div className='flex justify-between text-sm'>
                  <span className='text-gray-600'>This Route</span>
                  <span className='font-semibold text-purple-600'>
                    +{routeData.ecoPoints} pts
                  </span>
                </div>
              )}
              {co2Saved > 0 && (
                <div className='flex justify-between text-sm border-t pt-2 mt-2'>
                  <span className='text-gray-600 font-medium'>🌱 CO₂ Bonus</span>
                  <span className='font-bold text-emerald-600'>
                    +{Math.round(co2Saved * 10)} pts
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className='mt-6 p-4 bg-white bg-opacity-60 rounded-xl'>
            <div className='text-center'>
              <div className='text-sm font-medium text-gray-700 mb-1'>
                Next Reward
              </div>
              <div className='text-xs text-gray-500 mb-2'>253 points to go!</div>
              <div className='w-full bg-gray-200 rounded-full h-2'>
                <div className='bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300' style={{ width: '80%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}