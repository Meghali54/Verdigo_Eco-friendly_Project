import React from 'react'
import { Trash2 } from 'lucide-react'
import { ModeToggle } from '../components/ModeToggle'

const WasteLess = () => {
  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
      {/* Header */}
      <div className='w-full bg-gradient-to-r from-teal-500 to-teal-600 shadow-sm border-b border-gray-200 px-6 py-4 flex items-center justify-between'>
        <div className='flex items-center space-x-3'>
          <div className='w-10 h-10 bg-gradient-to-br from-teal-300 to-teal-500 rounded-xl flex items-center justify-center'>
            <Trash2 className='w-6 h-6 text-white' />
          </div>
          <div>
            <h1 className='text-2xl font-semibold text-white font-stretch-ultra-expanded font-sans'>WASTE LESS</h1>
            <p className='text-teal-100'>Smart waste management and tracking</p>
          </div>
        </div>
        <ModeToggle />
      </div>
      
      {/* Content */}
      <div className='container mx-auto px-6 py-8'>
        <div className='text-center'>
          <h2 className='text-3xl font-bold text-gray-800 dark:text-white mb-4'>Coming Soon</h2>
          <p className='text-gray-600 dark:text-gray-300'>Track and reduce your environmental footprint with intelligent waste management.</p>
        </div>
      </div>
    </div>
  )
}

export default WasteLess