// client/public/pages/Events.tsx
// pages/Events.tsx
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useAPIStore } from './../../src/store/useAPIStore'
import EventsHero from '../components/EventsHero'
import EventsList from '../components/EventsList'

const Events: React.FC = () => {
    const { locationId } = useParams<{ locationId: string }>()
    const fetchAllEvents = useAPIStore(state => state.fetchAllEvents)
    const fetchSingleLocation = useAPIStore(state => state.fetchSingleLocation)
    const [location, setLocation] = useState<Location | null>(null)
    const [isLoading, setIsLoading] = useState(true)
  
    useEffect(() => {
      const loadData = async () => {
        if (locationId) {
          setIsLoading(true)
          try {
            const [fetchedLocation] = await Promise.all([
              fetchSingleLocation(Number(locationId)),
              fetchAllEvents(Number(locationId))
            ])
            setLocation(fetchedLocation)
          } catch (error) {
            console.error('Error loading data:', error)
            // Handle error (e.g., show error message to user)
          } finally {
            setIsLoading(false)
          }
        }
      }
      loadData()
    }, [locationId, fetchAllEvents, fetchSingleLocation])
  
    if (isLoading) return <div>Loading...</div>
    if (!location) return <div>Location not found</div>
  
    return (
      <div>
        <EventsHero locationName={location.name} />
        <div className="container mx-auto px-4 py-8">
          <Link 
            to={`/locations/${locationId}/events/new`}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-6 inline-block"
          >
            Create New Event
          </Link>
          <EventsList />
        </div>
      </div>
    )
  }
  
  export default Events