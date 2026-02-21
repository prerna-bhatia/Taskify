const Event = require('../models/Event');

// @desc    Get events
// @route   GET /api/events
// @access  Private
const getEvents = async (req, res) => {
    try {
        const events = await Event.find({ user: req.user.id });
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Set event
// @route   POST /api/events
// @access  Private
const setEvent = async (req, res) => {
    try {
        if (!req.body.title || !req.body.date) {
            return res.status(400).json({ message: 'Please add title and date' });
        }

        const event = await Event.create({
            title: req.body.title,
            date: req.body.date,
            user: req.user.id,
        });

        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Delete event
// @route   DELETE /api/events/:id
// @access  Private
const deleteEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(400).json({ message: 'Event not found' });
        }

        // Check for user
        if (!req.user) {
            return res.status(401).json({ message: 'User not found' });
        }

        // Make sure the logged in user matches the event user
        if (event.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        await event.deleteOne();

        res.status(200).json({ id: req.params.id });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getEvents,
    setEvent,
    deleteEvent,
};
