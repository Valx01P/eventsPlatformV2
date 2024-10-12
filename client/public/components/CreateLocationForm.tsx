// client/public/components/CreateLocationForm.tsx
// components/CreateLocationForm.tsx
import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useAPIStore } from './../../src/store/useAPIStore'

const CreateLocationForm: React.FC = () => {
  const { register, handleSubmit } = useForm()
  const navigate = useNavigate()
  const addLocation = useAPIStore(state => state.addLocation)

  const onSubmit = async (data: any) => {
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('city', data.city)
    formData.append('state', data.state)
    formData.append('image', data.image[0])

    await addLocation(formData as any)
    navigate('/locations')
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
        <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
        <input {...register('image')} type="file" accept="image/*" className="mt-1 block w-full" />
      </div>
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Create Location
      </button>
    </form>
  )
}

export default CreateLocationForm