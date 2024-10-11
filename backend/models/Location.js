// backend/models/Location.js
import { pool } from '../config/database.js'

const Location = {
    getAll: async () => {
      const result = await pool.query('SELECT * FROM locations')
      return result.rows
    },
  
    create: async ({ name, city, state, image_name, image_url }) => {
      const result = await pool.query(
        'INSERT INTO locations (name, city, state, image_name, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [name, city, state, image_name, image_url]
      )
      return result.rows[0]
    },
  
    getById: async (id) => {
      const result = await pool.query('SELECT * FROM locations WHERE location_id = $1', [id])
      return result.rows[0]
    },
  
    update: async (id, { name, city, state, image_name, image_url }) => {
      const result = await pool.query(
        'UPDATE locations SET name = COALESCE($1, name), city = COALESCE($2, city), state = COALESCE($3, state), image_name = COALESCE($4, image_name), image_url = COALESCE($5, image_url) WHERE location_id = $6 RETURNING *',
        [name, city, state, image_name, image_url, id]
      )
      return result.rows[0]
    },
  
    delete: async (id) => {
      const result = await pool.query('DELETE FROM locations WHERE location_id = $1 RETURNING *', [id])
      return result.rows[0]
    }
  }
  
  export default Location