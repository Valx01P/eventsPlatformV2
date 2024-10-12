// client/public/components/UpdateEventForm.tsx
// components/UpdateEventForm.tsx
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { useAPIStore, Event } from './../../src/store/useAPIStore'

const UpdateEventForm: React.FC = () => {
  const { register, handleSubmit, setValue } = useForm()
  const navigate = useNavigate()
  const { locationId, eventId } = useParams<{ locationId: string, eventId: string }>()
  const updateEvent = useAPIStore(state => state.updateEvent)
  const fetchSingleEvent = useAPIStore(state => state.fetchSingleEvent)

  useEffect(() => {
    const loadEvent = async () => {
      if (locationId && eventId) {
        const event = await fetchSingleEvent(Number(locationId), Number(eventId))
        setValue('name', event.name)
        setValue('description', event.description)
      }
    }
    loadEvent()
  }, [locationId, eventId, fetchSingleEvent, setValue])

  const onSubmit = async (data: any) => {
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('description', data.description)
    if (data.image[0]) {
      formData.append('image', data.image[0])
    }

    await updateEvent(Number(locationId), Number(eventId), formData as any as Event)
    navigate(`/locations/${Number(locationId)}/events/${Number(eventId)}`)
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
        <label htmlFor="image" className="block text-sm font-medium text-gray-700">Update Image (optional)</label>
        <input {...register('image')} type="file" accept="image/*" className="mt-1 block w-full" />
      </div>
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Update Event
      </button>
    </form>
  )
}

export default UpdateEventForm