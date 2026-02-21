import React from 'react';
import { Card, CardContent, Typography, IconButton, Box, Chip } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import DeleteIcon from '@mui/icons-material/Delete';

const TaskCard = ({ task, updateTask, deleteTask }) => {
    const isCompleted = task.status === 'Completed';

    const handleToggle = () => {
        updateTask(task._id, { status: isCompleted ? 'Pending' : 'Completed' });
    };

    return (
        <Card sx={{ mb: 2, display: 'flex', alignItems: 'center', p: 1 }}>
            <IconButton onClick={handleToggle} color={isCompleted ? 'secondary' : 'default'}>
                {isCompleted ? <CheckCircleIcon /> : <RadioButtonUncheckedIcon />}
            </IconButton>
            <CardContent sx={{ flexGrow: 1, p: '0 !important', display: 'flex', flexDirection: 'column', justifyContent: 'center', ml: 1 }}>
                <Typography variant="body1" sx={{ textDecoration: isCompleted ? 'line-through' : 'none', color: isCompleted ? 'text.secondary' : 'text.primary', fontWeight: 500 }}>
                    {task.title}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                    Created: {new Date(task.createdAt).toLocaleDateString()}
                </Typography>
            </CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Chip label={task.status} color={isCompleted ? 'success' : 'warning'} size="small" sx={{ mr: 2, fontWeight: 'bold' }} />
                <IconButton onClick={() => deleteTask(task._id)} color="error" size="small">
                    <DeleteIcon />
                </IconButton>
            </Box>
        </Card>
    );
};

export default TaskCard;
