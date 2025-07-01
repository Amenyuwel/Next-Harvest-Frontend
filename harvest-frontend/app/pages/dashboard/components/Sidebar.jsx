"use client";
import React, { useState, useEffect } from 'react'
import { Icon } from '@iconify/react'
import { useRouter, usePathname } from 'next/navigation'

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
      label: 'Analytics',
      path: '/pages/dashboard/analytics'
    },
    {
      id: 'inventory',
      icon: 'system-uicons:graph-box',
      label: 'Inventory',
      path: '/pages/dashboard/inventory'
    },
    {
      id: 'reports',
      icon: 'mingcute:document-line',
      label: 'Reports',
      path: '/pages/dashboard/reports'
    },
    {
      id: 'profile',
      icon: 'lucide:user-round',
      label: 'Profile',
      path: '/pages/dashboard/profile'
    }
  ]

  // Bottom navigation items
  const bottomMenuItems = [
    {
      id: 'settings',
      icon: 'ic:round-settings',
      label: 'Settings',
      path: '/pages/dashboard/settings'
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

  const renderMenuItem = (item) => (
    <div
      key={item.id}
      onClick={() => handleItemClick(item)}
      className={`w-12 h-12 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-200 group relative ${
        activeItem === item.id 
          ? 'bg-[#019601] text-white' 
          : 'text-gray-400 hover:text-white hover:bg-gray-700'
      }`}
    >
      <Icon 
        icon={item.icon} 
        width="24" 
        height="24" 
      />
      
      {/* Tooltip */}
      <div className='absolute left-16 bg-gray-800 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10'>
        {item.label}
        <div className='absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-800 rotate-45'></div>
      </div>
    </div>
  )

  return (
    <div className='w-20 bg-[#2C2C2C] rounded-3xl flex flex-col items-center py-6 shadow-lg'>
      {/* Logo/Avatar */}
      <div className='w-12 h-12  rounded-full mb-8 flex items-center justify-center'>
        <div className='w-8 h-8 bg-gray-500 rounded-full'></div>
      </div>

      {/* Main Menu Items */}
      <div className='flex flex-col gap-6 flex-1'>
        {mainMenuItems.map((item) => renderMenuItem(item))}
      </div>

      {/* Separator Line */}
      <div className='w-8 h-px bg-gray-600 my-4'></div>

      {/* Bottom Menu Items */}
      <div className='flex flex-col gap-6'>
        {bottomMenuItems.map((item) => renderMenuItem(item))}
      </div>
    </div>
  )
}

export default Sidebar