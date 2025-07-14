"use client";
import React, { useState } from 'react'
import GlobalHeader from '../../components/GlobalHeader'
import FarmerTable from './components/FarmerTable'
import FarmerStats from './components/FarmerStats'
import FarmerCount from './components/FarmerCount'

function InventoryPage() {
  const [activeTab, setActiveTab] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')

  const farmersData = [
    {
      id: 1,
      rsbsa: 'G1015',
      name: 'Emerson Alvarado',
      description: 'Regular',
      crop: 'Maisud Rana',
      area: '1.1 ha',
      barangay: 'Lagao',
      contact: '+63 912 345 6789'
    },
    {
      id: 2,
      rsbsa: 'G1015',
      name: 'Romel Birada',
      description: 'Regular',
      crop: 'Maisud Rana',
      area: '1.1 ha',
      barangay: 'San Isidro',
      contact: '+63 912 345 6789'
    },
    {
      id: 3,
      rsbsa: 'G1015',
      name: 'Billy Joe Mengote',
      description: 'Regular',
      crop: 'Maisud Rana',
      area: '10 ha',
      barangay: 'Fatima',
      contact: '+63 912 345 6789'
    },
    {
      id: 4,
      rsbsa: 'G1015',
      name: 'Kylie Malagamba',
      description: 'Regular',
      crop: 'Maisud Rana',
      area: '5 ha',
      barangay: 'San Isidro',
      contact: '+63 912 345 6789'
    },
    {
      id: 5,
      rsbsa: 'G1015',
      name: 'Anita Salubre Palomares',
      description: 'Regular',
      crop: 'Maisud Rana',
      area: '2 ha',
      barangay: 'Lagao',
      contact: '+63 912 345 6789'
    },
    {
      id: 6,
      rsbsa: 'G1015',
      name: 'Snail',
      description: 'Regular',
      crop: 'Maisud Rana',
      area: '1 ha',
      barangay: 'Conel',
      contact: '+63 912 345 6789'
    },
    {
      id: 7,
      rsbsa: 'G1015',
      name: 'Snail',
      description: 'Regular',
      crop: 'Maisud Rana',
      area: '1 ha',
      barangay: 'Antipolo',
      contact: '+63 912 345 6789'
    }
  ]

  const filteredFarmers = farmersData.filter(farmer =>
    farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    farmer.barangay.toLowerCase().includes(searchTerm.toLowerCase()) ||
    farmer.crop.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <GlobalHeader 
        title="Farmers" 
        addButtonText="Add Farmer"
        onAddClick={() => console.log('Add farmer clicked')}
      />
      
      <div className="flex gap-6">
        {/* Main Content */}
        <div className="flex-1 space-y-6">
          <FarmerTable 
            farmers={filteredFarmers} 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
          <FarmerStats />
        </div>
        
        {/* Right Sidebar */}
        <div className="w-80">
          <FarmerCount riceFarmers={3} cornFarmers={7} />
        </div>
      </div>
    </div>
  )
}

export default InventoryPage