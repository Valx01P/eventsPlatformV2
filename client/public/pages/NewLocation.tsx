// client/public/pages/NewLocation.tsx
// pages/NewLocation.tsx
import React from 'react'
import CreateLocationForm from '../components/CreateLocationForm'

const NewLocation: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Create New Location</h1>
      <CreateLocationForm />
    </div>
  )
}

export default NewLocation