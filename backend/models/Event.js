// backend/models/Event.js
import { pool } from '../config/database.js'

const Event = {
  getAllByLocationId: async (locationId) => {
    const result = await pool.query('SELECT * FROM events WHERE location_id = $1', [locationId])
    return result.rows
  },

  create: async ({ locationId, name, description, image_name, image_url }) => {
    const result = await pool.query(
      'INSERT INTO events (location_id, name, description, image_name, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [locationId, name, description, image_name, image_url]
    )
    return result.rows[0]
  },

  getById: async (id) => {
    const result = await pool.query('SELECT * FROM events WHERE event_id = $1', [id])
    return result.rows[0]
  },

  update: async (id, { name, description, image_name, image_url }) => {
    const result = await pool.query(
      'UPDATE events SET name = COALESCE($1, name), description = COALESCE($2, description), image_name = COALESCE($3, image_name), image_url = COALESCE($4, image_url) WHERE event_id = $5 RETURNING *',
      [name, description, image_name, image_url, id]
    )
    return result.rows[0]
  },

  delete: async (id) => {
    const result = await pool.query('DELETE FROM events WHERE event_id = $1 RETURNING *', [id])
    return result.rows[0]
  }
}

export default Event