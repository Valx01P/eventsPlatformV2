// components/EventDetails.tsx
import React from 'react'
import { Event } from './../../src/store/useAPIStore'

interface EventDetailsProps {
  event: Event
}

const EventDetails: React.FC<EventDetailsProps> = ({ event }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">{event.name}</h2>
      <img src={event.image_url} alt={event.name} className="w-full h-64 object-cover rounded-md mb-4" />
      <p className="text-gray-600 mb-4">{event.description}</p>
    </div>
  )
}

export default EventDetails