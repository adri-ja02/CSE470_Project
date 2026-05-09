const express = require('express');
const cors = require('cors');
const pool = require('./config/db');

const internshipRoutes = require('./routes/internshipRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const applicationRoutes = require('./routes/applicationRoutes');

const app = express();

app.use(cors());
app.use(express.json());

const initDB = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS internships (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description TEXT,
                type VARCHAR(50),
                category VARCHAR(100),
                deadline DATE,
                company VARCHAR(255)
            )
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS applications (
                id SERIAL PRIMARY KEY,
                internship_id INTEGER REFERENCES internships(id) ON DELETE CASCADE,
                applicant_name VARCHAR(255),
                status VARCHAR(50) DEFAULT 'pending',
                applied_at TIMESTAMP DEFAULT NOW()
            )
        `);

        await pool.query(`ALTER TABLE internships ADD COLUMN IF NOT EXISTS company VARCHAR(255)`);
        console.log('Database initialized');
    } catch (err) {
        console.error('Database initialization error:', err);
    }
};

// USE ROUTES
app.use('/', internshipRoutes);
app.use('/', applicationRoutes);
app.use('/', analyticsRoutes);

app.listen(5000, async () => {
    console.log("Server running on port 5000");
    await initDB();
});
