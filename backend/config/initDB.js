// backend/config/initDB.js
import { pool } from './database.js'

const initDB = async () => {
    try {
        // await pool.query(createImageTableQuery)
        await pool.query(createLocationTableQuery)
        // await pool.query(createLocationImageTableQuery)
        await pool.query(createEventTableQuery)
        // await pool.query(createEventImageTableQuery)
    } catch (error) {
        console.error('Error initializing database', error)
    }
}



const createLocationTableQuery = `
CREATE TABLE IF NOT EXISTS locations (
    location_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    image_name VARCHAR(100) NOT NULL,
    image_url TEXT NOT NULL
);`

const createEventTableQuery = `
CREATE TABLE IF NOT EXISTS events (
    event_id SERIAL PRIMARY KEY,
    location_id INT,
    FOREIGN KEY (location_id) REFERENCES locations(location_id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    image_name VARCHAR(100) NOT NULL,
    image_url TEXT NOT NULL
);`


// const createImageTableQuery = `
// CREATE TABLE IF NOT EXISTS images (
//   image_id SERIAL PRIMARY KEY,
//   url TEXT NOT NULL,
//   alt_text TEXT,
//   created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
// );`


// const createLocationTableQuery = `
// CREATE TABLE IF NOT EXISTS locations (
//     location_id SERIAL PRIMARY KEY,
//     name VARCHAR(100) NOT NULL,
//     city VARCHAR(100) NOT NULL,
//     state VARCHAR(100) NOT NULL
// );`


// const createEventTableQuery = `
// CREATE TABLE IF NOT EXISTS events (
//     event_id SERIAL PRIMARY KEY,
//     location_id INT,
//     name VARCHAR(100) NOT NULL,
//     description TEXT NOT NULL,
//     FOREIGN KEY (location_id) REFERENCES locations(location_id) ON DELETE CASCADE
// );`


// const createEventImageTableQuery = `
// CREATE TABLE IF NOT EXISTS event_images (
//     event_id INT,
//     image_id INT,
//     PRIMARY KEY (event_id, image_id),
//     FOREIGN KEY (event_id) REFERENCES events(event_id) ON DELETE CASCADE,
//     FOREIGN KEY (image_id) REFERENCES images(image_id) ON DELETE CASCADE
// );`


// const createLocationImageTableQuery = `
// CREATE TABLE IF NOT EXISTS location_images (
//     location_id INT,
//     image_id INT,
//     PRIMARY KEY (location_id, image_id),
//     FOREIGN KEY (location_id) REFERENCES locations(location_id) ON DELETE CASCADE,
//     FOREIGN KEY (image_id) REFERENCES images(image_id) ON DELETE CASCADE
// );`

initDB()