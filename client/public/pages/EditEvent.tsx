// client/public/pages/EditEvent.tsx
// pages/EditEvent.tsx
import React from 'react'
import { useParams } from 'react-router-dom'
import UpdateEventForm from '../components/UpdateEventForm'

const EditEvent: React.FC = () => {
  const { locationId, eventId } = useParams<{ locationId: string, eventId: string }>()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Edit Event</h1>
      <UpdateEventForm />
    </div>
  )
}

export default EditEvent