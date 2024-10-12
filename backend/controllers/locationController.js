// backend/controllers/locationController.js
import Location from '../models/Location.js'
import Event from '../models/Event.js'
import { DeleteObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { s3Client } from '../config/s3Config.js'

const locationController = {
    getAllLocations: async (req, res, next) => {
        try {
            const locations = await Location.getAll()
            for (let location of locations) {
                if (location.image_name) {
                    const command = new GetObjectCommand({
                        Bucket: process.env.S3_BUCKET_NAME,
                        Key: location.image_name,
                    })
                    location.image_url = await getSignedUrl(s3Client, command, { expiresIn: 3600 })
                }
            }
            res.json(locations)
        } catch (error) {
            next(error)
        }
    },
    createLocation: async (req, res, next) => {
        try {
            const { name, city, state } = req.body
            let image_name = null
            if (req.file) {
                console.log(req.file)
                console.log(req.file.Location)
                image_name = req.file.key
            }
    
            const location = await Location.create({ name, city, state, image_name })
            res.status(201).json(location)
        } catch (error) {
            console.error('Error in createLocation:', error)
            next(error)
        }
    },
    getLocation: async (req, res, next) => {
        try {
            const { locationId } = req.params
            const location = await Location.getById(locationId)
            if (!location) {
                return res.status(404).json({ message: 'Location not found' })
            }
            if (location.image_name) {
                const command = new GetObjectCommand({
                    Bucket: process.env.S3_BUCKET_NAME,
                    Key: location.image_name,
                })
                location.image_url = await getSignedUrl(s3Client, command, { expiresIn: 3600 })
            }
            res.json(location)
        } catch (error) {
            next(error)
        }
    },
    updateLocation: async (req, res, next) => {
        try {
            const { locationId } = req.params
            const { name, city, state } = req.body
            let image_name = undefined
    
            if (req.file) {
                image_name = req.file.key
                
                // Delete old image from S3 if it exists
                const oldLocation = await Location.getById(locationId)
                if (oldLocation && oldLocation.image_name) {
                    const deleteParams = {
                        Bucket: process.env.S3_BUCKET_NAME,
                        Key: oldLocation.image_name
                    }
                    await s3Client.send(new DeleteObjectCommand(deleteParams))
                }
            }
    
            const location = await Location.update(locationId, { name, city, state, image_name })
            if (!location) {
                return res.status(404).json({ message: 'Location not found' })
            }
            res.json(location)
        } catch (error) {
            next(error)
        }
    },
    deleteLocation: async (req, res, next) => {
        try {
            const { locationId } = req.params
            
            // Get all events associated with this location
            const events = await Event.getAllByLocationId(locationId)
            
            // Delete all associated events and their images
            for (const event of events) {
                if (event.image_name) {
                    const deleteParams = {
                        Bucket: process.env.S3_BUCKET_NAME,
                        Key: event.image_name
                    }
                    await s3Client.send(new DeleteObjectCommand(deleteParams))
                }
                await Event.delete(event.event_id)
            }
    
            // Delete the location and its image
            const deleted = await Location.delete(locationId)
            if (!deleted) {
                return res.status(404).json({ message: 'Location not found' })
            }
    
            if (deleted.image_name) {
                const deleteParams = {
                    Bucket: process.env.S3_BUCKET_NAME,
                    Key: deleted.image_name
                }
                await s3Client.send(new DeleteObjectCommand(deleteParams))
            }
    
            res.status(204).end()
        } catch (error) {
            next(error)
        }
    }
}

export default locationController