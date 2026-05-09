const pool = require('../config/db');

// CREATE
const createInternship = async (data) => {
    const { title, description, type, category, deadline, company } = data;

    const result = await pool.query(
        `INSERT INTO internships (title, description, type, category, deadline, company)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING *`,
        [title, description, type, category, deadline, company]
    );

    return result.rows[0];
};

// READ
const getAllInternships = async () => {
    const result = await pool.query(`SELECT * FROM internships ORDER BY id DESC`);
    return result.rows;
};

// UPDATE
const updateInternship = async (id, data) => {
    const { title, description, type, category, deadline, company } = data;

    const result = await pool.query(
        `UPDATE internships
         SET title=$1, description=$2, type=$3, category=$4, deadline=$5, company=$6
         WHERE id=$7
         RETURNING *`,
        [title, description, type, category, deadline, company, id]
    );

    return result.rows[0];
};

// DELETE
const deleteInternship = async (id) => {
    await pool.query(`DELETE FROM internships WHERE id=$1`, [id]);
};

module.exports = {
    createInternship,
    getAllInternships,
    updateInternship,
    deleteInternship
};
