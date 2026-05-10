const pool = require('../config/db');

const publicUserFields = `
    id,
    name,
    email,
    role,
    created_at
`;

const createUser = async ({ name, email, passwordHash, role }) => {
    const result = await pool.query(
        `INSERT INTO users (name, email, password_hash, role)
         VALUES ($1, $2, $3, $4)
         RETURNING ${publicUserFields}`,
        [name, email, passwordHash, role]
    );

    return result.rows[0];
};

const findUserByEmail = async (email) => {
    const result = await pool.query(
        `SELECT id, name, email, password_hash, role, created_at
         FROM users
         WHERE email = $1`,
        [email]
    );

    return result.rows[0];
};

const findUserById = async (id) => {
    const result = await pool.query(
        `SELECT ${publicUserFields}
         FROM users
         WHERE id = $1`,
        [id]
    );

    return result.rows[0];
};

const createPasswordResetToken = async ({ userId, tokenHash, expiresAt }) => {
    const result = await pool.query(
        `INSERT INTO password_reset_tokens (user_id, token_hash, expires_at)
         VALUES ($1, $2, $3)
         RETURNING id, expires_at`,
        [userId, tokenHash, expiresAt]
    );

    return result.rows[0];
};

const findValidPasswordResetToken = async (tokenHash) => {
    const result = await pool.query(
        `SELECT id, user_id, expires_at
         FROM password_reset_tokens
         WHERE token_hash = $1
           AND used_at IS NULL
           AND expires_at > NOW()
         ORDER BY created_at DESC
         LIMIT 1`,
        [tokenHash]
    );

    return result.rows[0];
};

const updatePassword = async (userId, passwordHash) => {
    await pool.query(
        `UPDATE users
         SET password_hash = $1
         WHERE id = $2`,
        [passwordHash, userId]
    );
};

const markResetTokenUsed = async (tokenId) => {
    await pool.query(
        `UPDATE password_reset_tokens
         SET used_at = NOW()
         WHERE id = $1`,
        [tokenId]
    );
};

module.exports = {
    createUser,
    findUserByEmail,
    findUserById,
    createPasswordResetToken,
    findValidPasswordResetToken,
    updatePassword,
    markResetTokenUsed
};
