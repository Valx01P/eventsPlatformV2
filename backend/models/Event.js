// backend/models/Event.js
import { pool } from '../config/database.js'

const Event = {
    getAllByLocationId: async (locationId) => {
        const result = await pool.query('SELECT * FROM events WHERE location_id = $1', [locationId])
        return result.rows
    },
 
    create: async ({ locationId, name, description, image_name }) => {
      const result = await pool.query(
        'INSERT INTO events (location_id, name, description, image_name) VALUES ($1, $2, $3, $4) RETURNING *',
        [locationId, name, description, image_name]
    )
    return result.rows[0]
    },

    getById: async (eventId) => {
        const result = await pool.query('SELECT * FROM events WHERE event_id = $1', [eventId])
        return result.rows[0]
    },

    update: async (eventId, { name, description, image_name }) => {
        const result = await pool.query(
            'UPDATE events SET name = COALESCE($1, name), description = COALESCE($2, description), image_name = COALESCE($3, image_name) WHERE event_id = $4 RETURNING *',
            [name, description, image_name, eventId]
        )
        return result.rows[0]
    },

    delete: async (eventId) => {
        const result = await pool.query('DELETE FROM events WHERE event_id = $1 RETURNING *', [eventId])
        return result.rows[0]
    }
}

export default Event
