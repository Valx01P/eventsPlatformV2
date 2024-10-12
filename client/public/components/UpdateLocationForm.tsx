// client/public/components/UpdateLocationForm.tsx
// components/UpdateLocationForm.tsx
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { useAPIStore, Location } from './../../src/store/useAPIStore'

const UpdateLocationForm: React.FC = () => {
  const { register, handleSubmit, setValue } = useForm()
  const navigate = useNavigate()
  const { locationId } = useParams<{ locationId: string }>()
  const updateLocation = useAPIStore(state => state.updateLocation)
  const fetchSingleLocation = useAPIStore(state => state.fetchSingleLocation)

  useEffect(() => {
    const loadLocation = async () => {
      if (locationId) {
        const location = await fetchSingleLocation(Number(locationId))
        setValue('name', location.name)
        setValue('city', location.city)
        setValue('state', location.state)
      }
    }
    loadLocation()
  }, [locationId, fetchSingleLocation, setValue])

  const onSubmit = async (data: any) => {
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('city', data.city)
    formData.append('state', data.state)
    if (data.image[0]) {
      formData.append('image', data.image[0])
    }

    await updateLocation(Number(locationId), formData as any as Location)
    navigate(`/locations/${Number(locationId)}`)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Location Name</label>
        <input {...register('name')} type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
      </div>
      <div>
        <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
        <input {...register('city')} type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
      </div>
      <div>
        <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
        <input {...register('state')} type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
      </div>
      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700">Update Image (optional)</label>
        <input {...register('image')} type="file" accept="image/*" className="mt-1 block w-full" />
      </div>
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Update Location
      </button>
    </form>
  )
}

export default UpdateLocationForm