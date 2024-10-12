// components/LocationDetails.tsx
import React from 'react'
import { Location } from './../../src/store/useAPIStore'

interface LocationDetailsProps {
  location: Location
}

const LocationDetails: React.FC<LocationDetailsProps> = ({ location }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">{location.name}</h2>
      <img src={location.image_url} alt={location.name} className="w-full h-64 object-cover rounded-md mb-4" />
      <p className="text-gray-600 mb-2">City: {location.city}</p>
      <p className="text-gray-600">State: {location.state}</p>
    </div>
  )
}

export default LocationDetails