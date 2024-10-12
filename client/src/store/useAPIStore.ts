// src/store/useStore.ts
import { create } from 'zustand'
import axios from 'axios'

export type Location = {
  location_id: number
  name: string
  city: string
  state: string
  image_name: string
  image_url: string
}

export type Event = {
  event_id: number
  location_id: number
  name: string
  description: string
  image_name: string
  image_url: string
}

export type State = {
    locations: Location[]
    events: Event[]
}

export type Actions = {
    fetchAllLocations: () => Promise<void>
    fetchAllEvents: (locationId: number) => Promise<void>
    fetchSingleLocation: (locationId: number) => Promise<Location>
    fetchSingleEvent: (locationId: number, eventId: number) => Promise<Event>
    addLocation: (location: Omit<Location, 'location_id'>) => Promise<void>
    updateLocation: (locationId: number, location: Location) => Promise<void>
    deleteLocation: (locationId: number) => Promise<void>
    addEvent: (locationId: number, event: Omit<Event, 'event_id'>) => Promise<void>
    updateEvent: (locationId: number, eventId: number, event: Event) => Promise<void>
    deleteEvent: (locationId: number, eventId: number) => Promise<void>
}

export const useAPIStore = create<State & Actions>((set) => ({
    locations: [],
    events: [],
    fetchAllLocations: async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/locations`)
            set({ locations: response.data })
        } catch (error) {
            console.error('Error fetching locations:', error)
        }
    },
    fetchAllEvents: async (locationId) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/locations/${locationId}/events`)
            set({ events: response.data })
        } catch (error) {
            console.error('Error fetching events:', error)
        }
    },
    fetchSingleLocation: async (locationId) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/locations/${locationId}`)
            return response.data
        } catch (error) {
            console.error('Error fetching single location:', error)
            throw error
        }
    },
    fetchSingleEvent: async (locationId, eventId) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/locations/${locationId}/events/${eventId}`)
            return response.data
        } catch (error) {
            console.error('Error fetching single event:', error)
            throw error
        }
    },
    addLocation: async (location) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/locations`, location)
            set((state) => ({ locations: [...state.locations, response.data] }))
        } catch (error) {
            console.error('Error adding location:', error)
            throw error
        }
    },
    updateLocation: async (locationId, location) => {
        try {
            await axios.patch(`${import.meta.env.VITE_API_URL}/locations/${locationId}`, location)
            set((state) => ({
                locations: state.locations.map((l) =>
                    l.location_id === location.location_id ? location : l
                ),
            }))
        } catch (error) {
            console.error('Error updating location:', error)
            throw error
        }
    },
    deleteLocation: async (locationId) => {
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/locations/${locationId}`)
            set((state) => ({
                locations: state.locations.filter((l) => l.location_id !== locationId),
            }))
        } catch (error) {
            console.error('Error deleting location:', error)
            throw error
        }
    },
    addEvent: async (locationId, event) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/locations/${locationId}/events`, event)
            set((state) => ({ events: [...state.events, response.data] }))
        } catch (error) {
            console.error('Error adding event:', error)
            throw error
        }
    },
    updateEvent: async (locationId, eventId, event) => {
        try {
            await axios.patch(`${import.meta.env.VITE_API_URL}/locations/${locationId}/events/${eventId}`, event)
            set((state) => ({
                events: state.events.map((e) =>
                    e.event_id === event.event_id ? event : e
                ),
            }))
        } catch (error) {
            console.error('Error updating event:', error)
            throw error
        }
    },
    deleteEvent: async (locationId, eventId) => {
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/locations/${locationId}/events/${eventId}`)
            set((state) => ({
                events: state.events.filter((e) => e.event_id !== eventId),
            }))
        } catch (error) {
            console.error('Error deleting event:', error)
            throw error
        }
    },
}))