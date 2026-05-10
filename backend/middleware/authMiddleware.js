const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const JWT_SECRET = process.env.JWT_SECRET || 'internlink-dev-secret';

const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization || '';
        const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

        if (!token) {
            return res.status(401).json({ message: 'Authentication required' });
        }

        const payload = jwt.verify(token, JWT_SECRET);
        const user = await userModel.findUserById(payload.id);

        if (!user) {
            return res.status(401).json({ message: 'Invalid session' });
        }

        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired session' });
    }
};

const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'You do not have permission to access this resource' });
        }

        next();
    };
};

module.exports = {
    authenticate,
    authorize
};
