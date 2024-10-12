// client/public/pages/EditLocation.tsx
// pages/EditLocation.tsx
import React from 'react'
import { useParams } from 'react-router-dom'
import UpdateLocationForm from '../components/UpdateLocationForm'

const EditLocation: React.FC = () => {
  const { locationId } = useParams<{ locationId: string }>()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Edit Location</h1>
      <UpdateLocationForm />
    </div>
  )
}

export default EditLocation