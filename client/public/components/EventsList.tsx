// client/public/components/EventsList.tsx
// components/EventsList.tsx
import React from 'react'
import { useAPIStore } from './../../src/store/useAPIStore'
import EventCard from '../modules/EventCard'

const EventsList: React.FC = () => {
    const events = useAPIStore(state => state.events)
  
    if (events.length === 0) {
      return <div>No events found for this location.</div>
    }
  
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map(event => (
          <EventCard key={event.event_id} event={event} />
        ))}
      </div>
    )
  }
  
  export default EventsList