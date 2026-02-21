import React, { useState, useContext } from 'react';
import { Box, Typography, Paper, IconButton, List, ListItem, ListItemText, TextField, Button } from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import DeleteIcon from '@mui/icons-material/Delete';
import { TaskContext } from '../context/TaskContext';
import dayjs from 'dayjs';

const CalendarSidebar = () => {
    const { events, addEvent, deleteEvent } = useContext(TaskContext);
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [newEventTitle, setNewEventTitle] = useState('');

    const handleAddEvent = () => {
        if (!newEventTitle.trim()) return;
        addEvent(newEventTitle, selectedDate.toISOString());
        setNewEventTitle('');
    };

    return (
        <Paper elevation={3} sx={{ height: '100%', p: 2, display: 'flex', flexDirection: 'column', borderRadius: 3, background: 'rgba(30, 30, 30, 0.6)', backdropFilter: 'blur(10px)' }}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, color: 'primary.main' }}>
                Important Dates
            </Typography>

            <Box sx={{ mb: 2, backgroundColor: 'background.paper', borderRadius: 2, p: 1 }}>
                <DateCalendar value={selectedDate} onChange={(newDate) => setSelectedDate(newDate)} />
            </Box>

            <Box sx={{ mb: 3 }}>
                <TextField
                    size="small"
                    fullWidth
                    placeholder="New event on selected date..."
                    value={newEventTitle}
                    onChange={(e) => setNewEventTitle(e.target.value)}
                    sx={{ mb: 1 }}
                />
                <Button variant="contained" fullWidth onClick={handleAddEvent} color="secondary">
                    Add Date
                </Button>
            </Box>

            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                Upcoming Events
            </Typography>
            <List sx={{ flexGrow: 1, overflowY: 'auto' }}>
                {events.map((event) => (
                    <ListItem key={event._id} secondaryAction={
                        <IconButton edge="end" aria-label="delete" size="small" onClick={() => deleteEvent(event._id)} color="error">
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    } sx={{ bgcolor: 'rgba(255,255,255,0.05)', mb: 1, borderRadius: 2 }}>
                        <ListItemText
                            primary={event.title}
                            secondary={dayjs(event.date).format('MMM D, YYYY')}
                            primaryTypographyProps={{ variant: 'body2', fontWeight: 500 }}
                            secondaryTypographyProps={{ variant: 'caption' }}
                        />
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
};

export default CalendarSidebar;
