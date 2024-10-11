// backend/routes/locationRoutes.js
import express from 'express'
import locationController from '../controllers/locationController.js'
import { upload } from '../config/s3Config.js'

const router = express.Router()

router.route('/')
    .get(locationController.getAllLocations)
    .post(upload.single('image'), locationController.createLocation)

router.route('/:locationId')
    .get(locationController.getLocation)
    .patch(upload.single('image'), locationController.updateLocation)
    .delete(locationController.deleteLocation)

export default router