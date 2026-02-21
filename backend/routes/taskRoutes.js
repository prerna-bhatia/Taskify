const express = require('express');
const router = express.Router();
const {
    getTasks,
    setTask,
    updateTask,
    deleteTask,
} = require('../controllers/taskController');

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

router.route('/').get(protect, getTasks).post(protect, setTask);
router.route('/:id').delete(protect, deleteTask).put(protect, updateTask);

module.exports = router;
