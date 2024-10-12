// client/public/modules/EventCard.tsx
// modules/EventCard.tsx
import React from 'react'
import { Link } from 'react-router-dom'
import { Event } from './../../src/store/useAPIStore'

interface EventCardProps {
  event: Event
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img src={event.image_url} alt={event.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{event.name}</h3>
        <p className="text-gray-600 mb-4">{event.description.substring(0, 100)}...</p>
        <Link 
          to={`/locations/${event.location_id}/events/${event.event_id}`}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          View Details
        </Link>
      </div>
    </div>
  )
}

export default EventCard