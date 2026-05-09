const pool = require('../config/db');

const getCategoryStats = async () => {
  const result = await pool.query(
    `SELECT category, COUNT(*) AS total
     FROM internships
     GROUP BY category
     ORDER BY total DESC`
  );
  return result.rows;
};

const getApplicationSuccessStats = async () => {
  const result = await pool.query(
    `SELECT
       COUNT(*) AS total_applications,
       SUM(CASE WHEN status = 'accepted' THEN 1 ELSE 0 END) AS accepted_count,
       SUM(CASE WHEN status = 'rejected' THEN 1 ELSE 0 END) AS rejected_count
     FROM applications`
  );
  return result.rows[0] || { total_applications: 0, accepted_count: 0, rejected_count: 0 };
};

const getCompanyHiringReport = async () => {
  const result = await pool.query(
    `SELECT i.company,
            COUNT(a.id) FILTER (WHERE a.status = 'accepted') AS hires
     FROM internships i
     LEFT JOIN applications a ON a.internship_id = i.id
     GROUP BY i.company
     ORDER BY hires DESC, i.company`
  );
  return result.rows;
};

const getMonthlyPlacementReport = async () => {
  const result = await pool.query(
    `SELECT TO_CHAR(a.applied_at, 'YYYY-MM') AS month,
            COUNT(*) AS placements
     FROM applications a
     WHERE a.status = 'accepted'
     GROUP BY month
     ORDER BY month ASC`
  );
  return result.rows;
};

module.exports = {
  getCategoryStats,
  getApplicationSuccessStats,
  getCompanyHiringReport,
  getMonthlyPlacementReport
};