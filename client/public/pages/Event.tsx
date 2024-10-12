// pages/Event.tsx
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useAPIStore, Event as EventType } from './../../src/store/useAPIStore'
import EventDetails from '../components/EventDetails'

const Event: React.FC = () => {
  const { locationId, eventId } = useParams<{ locationId: string, eventId: string }>()
  const [event, setEvent] = useState<EventType | null>(null)
  const fetchSingleEvent = useAPIStore(state => state.fetchSingleEvent)
  const deleteEvent = useAPIStore(state => state.deleteEvent)

  useEffect(() => {
    const loadEvent = async () => {
      if (locationId && eventId) {
        const fetchedEvent = await fetchSingleEvent(parseInt(locationId), parseInt(eventId))
        setEvent(fetchedEvent)
      }
    }
    loadEvent()
  }, [locationId, eventId, fetchSingleEvent])

  const handleDelete = async () => {
    if (locationId && eventId) {
      await deleteEvent(parseInt(locationId), parseInt(eventId))
      // Redirect to events list after deletion
      window.location.href = `/locations/${locationId}/events`
    }
  }

  if (!event) return <div>Loading...</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <EventDetails event={event} />
      <div className="mt-6 space-x-4">
        <Link 
          to={`/locations/${locationId}/events/${eventId}/edit`}
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
        >
          Edit Event
        </Link>
        <button 
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Delete Event
        </button>
      </div>
    </div>
  )
}

export default Event