// client/public/components/LocationsList.tsx
// components/LocationsList.tsx
import React from 'react'
import { useAPIStore } from './../../src/store/useAPIStore'
import LocationCard from '../modules/LocationCard'

const LocationsList: React.FC = () => {
  const locations = useAPIStore(state => state.locations)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {locations.map(location => (
        <LocationCard key={location.location_id} location={location} />
      ))}
    </div>
  )
}

export default LocationsList