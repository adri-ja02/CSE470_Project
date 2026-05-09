const pool = require('../config/db')

// CREATE APPLICATION
const createApplication = async (data) => {

    const {
        student_name,
        email,
        internship_id,
        cv_link,
        status
    } = data

    const result = await pool.query(
        `
        INSERT INTO applications
        (student_name, email, internship_id, cv_link, status)

        VALUES ($1, $2, $3, $4, $5)

        RETURNING *
        `,
        [
            student_name,
            email,
            internship_id,
            cv_link,
            status || 'Pending'
        ]
    )

    return result.rows[0]
}

// GET ALL
const getAllApplications = async () => {

    const result = await pool.query(
        'SELECT * FROM applications ORDER BY id DESC'
    )

    return result.rows
}

// DELETE
const deleteApplication = async (id) => {

    await pool.query(
        'DELETE FROM applications WHERE id = $1',
        [id]
    )
}

module.exports = {
    createApplication,
    getAllApplications,
    deleteApplication
}