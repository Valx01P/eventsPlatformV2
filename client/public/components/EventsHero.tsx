// client/public/components/EventsHero.tsx
// components/EventsHero.tsx
import React from 'react'

interface EventsHeroProps {
  locationName: string
}

const EventsHero: React.FC<EventsHeroProps> = ({ locationName }) => {
  return (
    <div className="bg-blue-600 text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Events at {locationName}</h1>
        <p className="text-xl">Explore all the exciting events happening at this location!</p>
      </div>
    </div>
  )
}

export default EventsHero
