const mongoose = require('mongoose');

const eventSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        title: {
            type: String,
            required: [true, 'Please add a title for the event'],
        },
        date: {
            type: Date,
            required: [true, 'Please add a date for the event'],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Event', eventSchema);
