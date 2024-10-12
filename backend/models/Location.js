// backend/models/Location.js
import { pool } from '../config/database.js'

const Location = {
    getAll: async () => {
        const result = await pool.query('SELECT * FROM locations')
        return result.rows
    },
    
    create: async ({ name, city, state, image_name }) => {
        const result = await pool.query(
            'INSERT INTO locations (name, city, state, image_name) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, city, state, image_name]
        )
        return result.rows[0]
    },
    
    getById: async (locationId) => {
        const result = await pool.query('SELECT * FROM locations WHERE location_id = $1', [locationId])
        return result.rows[0]
    },
    
    update: async (locationId, { name, city, state, image_name }) => {
        const result = await pool.query(
            'UPDATE locations SET name = COALESCE($1, name), city = COALESCE($2, city), state = COALESCE($3, state), image_name = COALESCE($4, image_name) WHERE location_id = $5 RETURNING *',
            [name, city, state, image_name, locationId]
        )
        return result.rows[0]
    },
    
    delete: async (locationId) => {
        const result = await pool.query('DELETE FROM locations WHERE location_id = $1 RETURNING *', [locationId])
        return result.rows[0]
    }
}
    
export default Location
