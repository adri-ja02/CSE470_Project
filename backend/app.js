const express = require('express');
const cors = require('cors');
const pool = require('./config/db');

const internshipRoutes = require('./routes/internshipRoutes');
const authRoutes = require('./routes/authRoutes');

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

        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(120) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password_hash TEXT NOT NULL,
                role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'company', 'student')),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS password_reset_tokens (
                id SERIAL PRIMARY KEY,
                user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                token_hash TEXT NOT NULL,
                expires_at TIMESTAMP NOT NULL,
                used_at TIMESTAMP,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        await pool.query(`
            CREATE INDEX IF NOT EXISTS idx_password_reset_tokens_hash
            ON password_reset_tokens(token_hash)
        `);

        console.log('Database initialized');
    } catch (err) {
        console.error('Database initialization error:', err);
    }
};

// USE ROUTES
app.use('/api/auth', authRoutes);
app.use('/', internshipRoutes);

app.listen(5000, async () => {
    console.log("Server running on port 5000");
    await initDB();
});
