// client/public/modules/LocationCard.tsx
// modules/LocationCard.tsx
import React from 'react'
import { Link } from 'react-router-dom'
import { Location } from './../../src/store/useAPIStore'

interface LocationCardProps {
  location: Location
}

const LocationCard: React.FC<LocationCardProps> = ({ location }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img src={location.image_url} alt={location.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{location.name}</h3>
        <p className="text-gray-600 mb-4">{location.city}, {location.state}</p>
        <div className="flex justify-between">
          <Link 
            to={`/locations/${location.location_id}`}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            View Details
          </Link>
          <Link 
            to={`/locations/${location.location_id}/events`}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            View Events
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LocationCard