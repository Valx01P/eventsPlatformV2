// backend/controllers/eventController.js
import Event from '../models/Event.js'
import { DeleteObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { s3Client } from '../config/s3Config.js'

const eventController = {
    getAllEvents: async (req, res, next) => {
        try {
            const { locationId } = req.params
            const events = await Event.getAllByLocationId(locationId)
            for (let event of events) {
                if (event.image_name) {
                    const command = new GetObjectCommand({
                        Bucket: process.env.S3_BUCKET_NAME,
                        Key: event.image_name,
                    })
                    event.image_url = await getSignedUrl(s3Client, command, { expiresIn: 3600 })
                }
            }
            res.json(events)
        } catch (error) {
            next(error)
        }
    },
    createEvent: async (req, res, next) => {
        try {
            const { locationId } = req.params
            const { name, description } = req.body
            let image_name = null
            if (req.file) {
                image_name = req.file.key
            }
    
            const event = await Event.create({ locationId, name, description, image_name })
            res.status(201).json(event)
        } catch (error) {
            next(error)
        }
    },
    getEvent: async (req, res, next) => {
        try {
            const { eventId } = req.params
            const event = await Event.getById(eventId)
            if (!event) {
                return res.status(404).json({ message: 'Event not found' })
            }
            if (event.image_name) {
                const command = new GetObjectCommand({
                    Bucket: process.env.S3_BUCKET_NAME,
                    Key: event.image_name,
                })
                event.image_url = await getSignedUrl(s3Client, command, { expiresIn: 3600 })
            }
            res.json(event)
        } catch (error) {
            next(error)
        }
    },
    updateEvent: async (req, res, next) => {
        try {
            const { eventId } = req.params
            const { name, description } = req.body
            let image_name = undefined
    
            if (req.file) {
                image_name = req.file.key
                
                // Delete old image from S3 if it exists
                const oldEvent = await Event.getById(eventId)
                if (oldEvent && oldEvent.image_name) {
                    const deleteParams = {
                        Bucket: process.env.S3_BUCKET_NAME,
                        Key: oldEvent.image_name
                    }
                    await s3Client.send(new DeleteObjectCommand(deleteParams))
                }
            }
    
            const event = await Event.update(eventId, { name, description, image_name })
            if (!event) {
                return res.status(404).json({ message: 'Event not found' })
            }
            res.json(event)
        } catch (error) {
            next(error)
        }
    },
    deleteEvent: async (req, res, next) => {
        try {
            const { eventId } = req.params
            const deleted = await Event.delete(eventId)
            if (!deleted) {
                return res.status(404).json({ message: 'Event not found' })
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

export default eventController