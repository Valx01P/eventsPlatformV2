// backend/controllers/eventController.js
import Event from '../models/Event.js'
import { DeleteObjectCommand } from '@aws-sdk/client-s3'
import { s3Client } from '../config/s3Config.js'

const eventController = {
  getAllEvents: async (req, res, next) => {
    try {
      const { locationId } = req.params
      const events = await Event.getAllByLocationId(locationId)
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
      let image_url = null

      if (req.file) {
        image_name = req.file.originalname
        image_url = req.file.location
      }

      const event = await Event.create({ locationId, name, description, image_name, image_url })
      res.status(201).json(event)
    } catch (error) {
      next(error)
    }
  },

  getEvent: async (req, res, next) => {
    try {
      const { id } = req.params
      const event = await Event.getById(id)
      if (!event) {
        return res.status(404).json({ message: 'Event not found' })
      }
      res.json(event)
    } catch (error) {
      next(error)
    }
  },

  updateEvent: async (req, res, next) => {
    try {
      const { id } = req.params
      const { name, description } = req.body
      let image_name = undefined
      let image_url = undefined

      if (req.file) {
        image_name = req.file.originalname
        image_url = req.file.location
        
        // Delete old image from S3 if it exists
        const oldEvent = await Event.getById(id)
        if (oldEvent && oldEvent.image_url) {
          const deleteParams = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: oldEvent.image_url.split('/').pop()
          }
          await s3Client.send(new DeleteObjectCommand(deleteParams))
        }
      }

      const event = await Event.update(id, { name, description, image_name, image_url })
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
      const { id } = req.params
      const deleted = await Event.delete(id)
      if (!deleted) {
        return res.status(404).json({ message: 'Event not found' })
      }

      if (deleted.image_url) {
        const deleteParams = {
          Bucket: process.env.S3_BUCKET_NAME,
          Key: deleted.image_url.split('/').pop()
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