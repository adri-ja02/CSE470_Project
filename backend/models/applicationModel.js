const pool = require('../config/db');

const createApplication = async (data) => {
  const { internship_id, applicant_name, status } = data;

  const result = await pool.query(
    `INSERT INTO applications (internship_id, applicant_name, status)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [internship_id, applicant_name, status || 'pending']
  );

  return result.rows[0];
};

const getAllApplications = async () => {
  const result = await pool.query(
    `SELECT a.id,
            a.internship_id,
            i.title AS internship_title,
            i.company AS internship_company,
            a.applicant_name,
            a.status,
            a.applied_at
     FROM applications a
     LEFT JOIN internships i ON i.id = a.internship_id
     ORDER BY a.applied_at DESC`
  );
  return result.rows;
};

const getInternshipById = async (id) => {
  const result = await pool.query(
    `SELECT id FROM internships WHERE id=$1`,
    [id]
  );
  return result.rows[0];
};

module.exports = {
  createApplication,
  getAllApplications,
  getInternshipById
};