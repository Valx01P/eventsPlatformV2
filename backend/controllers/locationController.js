// backend/controllers/locationController.js
import Location from '../models/Location.js'
import { DeleteObjectCommand } from '@aws-sdk/client-s3'
import { s3Client } from '../config/s3Config.js'

const locationController = {
    getAllLocations: async (req, res, next) => {
        try {
          const locations = await Location.getAll()
          res.json(locations)
        } catch (error) {
          next(error)
        }
      },
    createLocation: async (req, res, next) => {
        try {
          const { name, city, state } = req.body
          let image_name = null
          let image_url = null
          console.log(req.file)
          console.log(req.file.location)
          console.log(req.file.originalname)
          if (req.file) {
            // The file has been uploaded to S3 by multer-s3
            image_name = req.file.originalname
            image_url = req.file.location // This is the S3 URL
          }
    
          const location = await Location.create({ name, city, state, image_name, image_url })
          res.status(201).json(location)
        } catch (error) {
          console.error('Error in createLocation:', error)
          next(error)
        }
      },
      getLocation: async (req, res, next) => {
        try {
          const { id } = req.params
          const location = await Location.getById(id)
          if (!location) {
            return res.status(404).json({ message: 'Location not found' })
          }
          res.json(location)
        } catch (error) {
          next(error)
        }
      },
  
      updateLocation: async (req, res, next) => {
        try {
          const { id } = req.params
          const { name, city, state } = req.body
          let image_name = undefined
          let image_url = undefined
    
          if (req.file) {
            image_name = req.file.originalname
            image_url = req.file.location
            
            // Delete old image from S3 if it exists
            const oldLocation = await Location.getById(id)
            if (oldLocation && oldLocation.image_url) {
              const deleteParams = {
                Bucket: process.env.S3_BUCKET_NAME,
                Key: oldLocation.image_url.split('/').pop()
              }
              await s3Client.send(new DeleteObjectCommand(deleteParams))
            }
          }
    
          const location = await Location.update(id, { name, city, state, image_name, image_url })
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
          const { id } = req.params
          
          // Get all events associated with this location
          const events = await Event.getAllByLocationId(id)
          
          // Delete all associated events and their images
          for (const event of events) {
            if (event.image_url) {
              const deleteParams = {
                Bucket: process.env.S3_BUCKET_NAME,
                Key: event.image_url.split('/').pop()
              }
              await s3Client.send(new DeleteObjectCommand(deleteParams))
            }
            await Event.delete(event.event_id)
          }
    
          // Delete the location and its image
          const deleted = await Location.delete(id)
          if (!deleted) {
            return res.status(404).json({ message: 'Location not found' })
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
  
  export default locationController