// pages/Location.tsx
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useAPIStore, Location as LocationType } from './../../src/store/useAPIStore'
import LocationDetails from '../components/LocationDetails'

const Location: React.FC = () => {
  const { locationId } = useParams<{ locationId: string }>()
  const [location, setLocation] = useState<LocationType | null>(null)
  const fetchSingleLocation = useAPIStore(state => state.fetchSingleLocation)
  const deleteLocation = useAPIStore(state => state.deleteLocation)

  useEffect(() => {
    const loadLocation = async () => {
      if (locationId) {
        const fetchedLocation = await fetchSingleLocation(parseInt(locationId))
        setLocation(fetchedLocation)
      }
    }
    loadLocation()
  }, [locationId, fetchSingleLocation])

  const handleDelete = async () => {
    if (locationId) {
      await deleteLocation(parseInt(locationId))
      // Redirect to locations list after deletion
      window.location.href = '/locations'
    }
  }

  if (!location) return <div>Loading...</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <LocationDetails location={location} />
      <div className="mt-6 space-x-4">
        <Link 
          to={`/locations/${locationId}/edit`}
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
        >
          Edit Location
        </Link>
        <Link 
          to={`/locations/${locationId}/events`}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          View Events
        </Link>
        <button 
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Delete Location
        </button>
      </div>
    </div>
  )
}

export default Location