// client/public/pages/NewEvent.tsx
// pages/NewEvent.tsx
import React from 'react'
import { useParams } from 'react-router-dom'
import CreateEventForm from '../components/CreateEventForm'

const NewEvent: React.FC = () => {
  const { locationId } = useParams<{ locationId: string }>()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Create New Event</h1>
      <CreateEventForm />
    </div>
  )
}

export default NewEvent