const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const JWT_SECRET = process.env.JWT_SECRET || 'internlink-dev-secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';
const VALID_ROLES = ['admin', 'company', 'student'];

const sanitizeEmail = (email = '') => email.trim().toLowerCase();

const createToken = (user) => {
    return jwt.sign(
        { id: user.id, role: user.role },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
    );
};

const sendAuthResponse = (res, user, message) => {
    const token = createToken(user);
    res.json({ message, token, user });
};

const register = async (req, res) => {
    try {
        const name = (req.body.name || '').trim();
        const email = sanitizeEmail(req.body.email);
        const password = req.body.password || '';
        const role = (req.body.role || 'student').toLowerCase();

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Name, email, and password are required' });
        }

        if (!VALID_ROLES.includes(role)) {
            return res.status(400).json({ message: 'Role must be admin, company, or student' });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters' });
        }

        const existingUser = await userModel.findUserByEmail(email);
        if (existingUser) {
            return res.status(409).json({ message: 'Email is already registered' });
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const user = await userModel.createUser({ name, email, passwordHash, role });

        sendAuthResponse(res.status(201), user, 'Registration successful');
    } catch (err) {
        console.error('Registration error:', err);
        res.status(500).json({ message: 'Registration failed' });
    }
};

const login = async (req, res) => {
    try {
        const email = sanitizeEmail(req.body.email);
        const password = req.body.password || '';

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const userRecord = await userModel.findUserByEmail(email);
        if (!userRecord) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isValid = await bcrypt.compare(password, userRecord.password_hash);
        if (!isValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const { password_hash, ...user } = userRecord;
        sendAuthResponse(res, user, 'Login successful');
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ message: 'Login failed' });
    }
};

const logout = async (req, res) => {
    res.json({ message: 'Logout successful' });
};

const me = async (req, res) => {
    res.json({ user: req.user });
};

const forgotPassword = async (req, res) => {
    try {
        const email = sanitizeEmail(req.body.email);

        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        const user = await userModel.findUserByEmail(email);
        if (!user) {
            return res.json({ message: 'If that email exists, a reset link has been generated' });
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        const tokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');
        const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

        await userModel.createPasswordResetToken({
            userId: user.id,
            tokenHash,
            expiresAt
        });

        res.json({
            message: 'Password reset token generated',
            resetToken,
            expiresAt
        });
    } catch (err) {
        console.error('Forgot password error:', err);
        res.status(500).json({ message: 'Could not start password reset' });
    }
};

const resetPassword = async (req, res) => {
    try {
        const token = req.body.token || '';
        const password = req.body.password || '';

        if (!token || !password) {
            return res.status(400).json({ message: 'Reset token and new password are required' });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters' });
        }

        const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
        const resetRecord = await userModel.findValidPasswordResetToken(tokenHash);

        if (!resetRecord) {
            return res.status(400).json({ message: 'Reset token is invalid or expired' });
        }

        const passwordHash = await bcrypt.hash(password, 10);
        await userModel.updatePassword(resetRecord.user_id, passwordHash);
        await userModel.markResetTokenUsed(resetRecord.id);

        res.json({ message: 'Password has been reset' });
    } catch (err) {
        console.error('Reset password error:', err);
        res.status(500).json({ message: 'Could not reset password' });
    }
};

module.exports = {
    register,
    login,
    logout,
    me,
    forgotPassword,
    resetPassword
};
