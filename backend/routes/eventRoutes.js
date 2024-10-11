// backend/routes/eventRoutes.js
import express from 'express'
import eventController from '../controllers/eventController.js'
import { upload } from '../config/s3Config.js'

const router = express.Router({ mergeParams: true })

router.route('/')
    .get(eventController.getAllEvents)
    .post(upload.single('image'), eventController.createEvent)

router.route('/:eventId')
    .get(eventController.getEvent)
    .patch(upload.single('image'), eventController.updateEvent)
    .delete(eventController.deleteEvent)

export default router