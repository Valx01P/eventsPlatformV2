// client/public/pages/Locations.tsx
// pages/Locations.tsx
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAPIStore } from './../../src/store/useAPIStore'
import LocationsHero from '../components/LocationsHero'
import LocationsList from '../components/LocationsList'

const Locations: React.FC = () => {
  const fetchAllLocations = useAPIStore(state => state.fetchAllLocations)

  useEffect(() => {
    fetchAllLocations()
  }, [fetchAllLocations])

  return (
    <div>
      <LocationsHero />
      <div className="container mx-auto px-4 py-8">
        <Link 
          to="/locations/new"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-6 inline-block"
        >
          Create New Location
        </Link>
        <LocationsList />
      </div>
    </div>
  )
}

export default Locations