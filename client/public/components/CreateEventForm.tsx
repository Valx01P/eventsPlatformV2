// client/public/components/CreateEventForm.tsx
// components/CreateEventForm.tsx
import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { useAPIStore } from './../../src/store/useAPIStore'

const CreateEventForm: React.FC = () => {
  const { register, handleSubmit } = useForm()
  const navigate = useNavigate()
  const { locationId } = useParams<{ locationId: string }>()
  const addEvent = useAPIStore(state => state.addEvent)

  const onSubmit = async (data: any) => {
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('description', data.description)
    formData.append('image', data.image[0])
    // formData.append('location_id', locationId!)

    
    await addEvent(Number(locationId), formData as any)
    navigate(`/locations/${Number(locationId)}/events`)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Event Name</label>
        <input {...register('name')} type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
        <textarea {...register('description')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
      </div>
      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
        <input {...register('image')} type="file" accept="image/*" className="mt-1 block w-full" />
      </div>
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Create Event
      </button>
    </form>
  )
}

export default CreateEventForm