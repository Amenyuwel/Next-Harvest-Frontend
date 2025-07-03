"use client";
import React, { useState, useEffect } from 'react'
import { Icon } from '@iconify/react'
import { useRouter, usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

function Sidebar() {
  const [activeItem, setActiveItem] = useState('dashboard')
  const router = useRouter()
  const pathname = usePathname()

  // Main navigation items
  const mainMenuItems = [
    {
      id: 'dashboard',
      icon: 'material-symbols:home-outline-rounded',
      label: 'Dashboard',
      path: '/pages/dashboard'
    },
    {
      id: 'analytics',
      icon: 'mdi:graph',
      label: 'Train',
      path: '/pages/train'
    },
    {
      id: 'inventory',
      icon: 'system-uicons:graph-box',
      label: 'Inventory',
      path: '/pages/inventory'
    },
    {
      id: 'reports',
      icon: 'mingcute:document-line',
      label: 'Reports',
      path: '/pages/reports'
    },
    {
      id: 'profile',
      icon: 'lucide:user-round',
      label: 'Profile',
      path: '/pages/profile'
    }
  ]

  // Bottom navigation items
  const bottomMenuItems = [
    {
      id: 'settings',
      icon: 'ic:round-settings',
      label: 'Settings',
      path: '/pages/settings'
    },
    {
      id: 'logout',
      icon: 'line-md:logout',
      label: 'Logout',
      action: 'logout'
    }
  ]

  // Update active item based on current path
  useEffect(() => {
    const allItems = [...mainMenuItems, ...bottomMenuItems]
    const currentItem = allItems.find(item => item.path === pathname)
    if (currentItem) {
      setActiveItem(currentItem.id)
    }
  }, [pathname])

  const handleItemClick = (item) => {
    setActiveItem(item.id)
    
    if (item.action === 'logout') {
      localStorage.removeItem('token')
      router.push('/pages/login')
    } else if (item.path) {
      router.push(item.path)
    }
  }

  const renderMenuItem = (item, index) => (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      onClick={() => handleItemClick(item)}
      className={`w-12 h-12 rounded-3xl flex items-center justify-center cursor-pointer transition-all duration-200 group relative${
        activeItem === item.id 
          ? 'border-icons bg-transparent' 
          : 'border-transparent hover:border-gray-500'
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        animate={activeItem === item.id ? { scale: [1, 1.2, 1] } : { scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Icon 
          icon={item.icon} 
          width="24" 
          height="24" 
          className={`transition-colors duration-200 ${
            activeItem === item.id 
              ? 'text-[#BDFFAF]' 
              : 'text-gray-400 group-hover:text-white'
          }`}
        />
      </motion.div>
      
      {/* Animated Tooltip */}
      <motion.div 
        className='absolute left-16 bg-gray-800 text-white text-sm px-3 py-2 rounded-lg pointer-events-none whitespace-nowrap z-10'
        initial={{ opacity: 0, x: -10, scale: 0.8 }}
        whileHover={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        {item.label}
        <div className='absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-800 rotate-45'></div>
      </motion.div>
    </motion.div>
  )

  return (
    <motion.div 
      className='w-20 h-[96%] bg-[#2C2C2C] rounded-3xl flex flex-col items-center py-6 shadow-lg mt-4'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Logo/Avatar */}
      <motion.div 
        className='w-12 h-12 rounded-full mb-8 flex items-center justify-center'
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4, delay: 0.2, type: "spring" }}
      >
        <div className='w-8 h-8 bg-gray-500 rounded-full'></div>
      </motion.div>

      {/* Main Menu Items */}
      <div className='flex flex-col gap-6 flex-1'>
        {mainMenuItems.map((item, index) => renderMenuItem(item, index))}
      </div>

      {/* Separator Line */}
      <motion.div 
        className='w-8 h-px bg-gray-600 my-4'
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.4, delay: 0.8 }}
      />

      {/* Bottom Menu Items */}
      <div className='flex flex-col gap-6'>
        {bottomMenuItems.map((item, index) => renderMenuItem(item, index + mainMenuItems.length))}
      </div>
    </motion.div>
  )
}

export default Sidebar