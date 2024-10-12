// client/public/pages/Home.tsx
// pages/Home.tsx
import React from 'react'
import { Link } from 'react-router-dom'

const Home: React.FC = () => {
  return (
    <div className="bg-gray-800 min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Event Platform</h1>
        <p className="text-xl mb-8">Discover amazing locations and events</p>
        <div className="space-x-4">
          <Link to="/locations" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            View Locations
          </Link>
          <Link to="/locations/new" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Add New Location
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home