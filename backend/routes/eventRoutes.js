const express = require('express');
const router = express.Router();
const {
    getEvents,
    setEvent,
    deleteEvent,
} = require('../controllers/eventController');

// Define auth middleware inline or require if separated
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized' });
        }
    }
    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

router.route('/').get(protect, getEvents).post(protect, setEvent);
router.route('/:id').delete(protect, deleteEvent);

module.exports = router;
