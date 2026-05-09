const express = require('express');
const cors = require('cors');
const pool = require('./config/db');

const internshipRoutes = require('./routes/internshipRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Initialize database
const initDB = async () => {
    try {
        // Create table with all columns
        await pool.query(`
            CREATE TABLE IF NOT EXISTS internships (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description TEXT,
                type VARCHAR(50),
                category VARCHAR(100),
                deadline DATE
            )
        `);

        // Ensure all columns exist (in case table was created without them)
        await pool.query(`ALTER TABLE internships ADD COLUMN IF NOT EXISTS description TEXT`);
        await pool.query(`ALTER TABLE internships ADD COLUMN IF NOT EXISTS type VARCHAR(50)`);
        await pool.query(`ALTER TABLE internships ADD COLUMN IF NOT EXISTS category VARCHAR(100)`);
        await pool.query(`ALTER TABLE internships ADD COLUMN IF NOT EXISTS deadline DATE`);

        console.log('Database initialized');
    } catch (err) {
        console.error('Database initialization error:', err);
    }
};

// USE ROUTES
app.use('/', internshipRoutes);

app.listen(5000, async () => {
    console.log("Server running on port 5000");
    await initDB();
});
