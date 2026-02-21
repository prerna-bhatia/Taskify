import React, { useContext, useMemo } from 'react';
import { Alert, AlertTitle, Box, Collapse } from '@mui/material';
import { TaskContext } from '../context/TaskContext';

const PendingAlerts = () => {
    const { tasks } = useContext(TaskContext);

    const delayedTasks = useMemo(() => {
        const oneDayInMs = 24 * 60 * 60 * 1000;
        const now = new Date().getTime();

        return tasks.filter((task) => {
            if (task.status === 'Completed') return false;
            const createdAtMs = new Date(task.createdAt).getTime();
            return (now - createdAtMs) > oneDayInMs;
        });
    }, [tasks]);

    if (delayedTasks.length === 0) return null;

    return (
        <Box sx={{ mb: 3 }}>
            <Collapse in={delayedTasks.length > 0}>
                <Alert severity="warning" variant="filled" sx={{ borderRadius: 2, boxShadow: '0 4px 12px rgba(255, 152, 0, 0.3)' }}>
                    <AlertTitle>Tasks Pending for &gt; 1 Day</AlertTitle>
                    You have {delayedTasks.length} task(s) that have been pending for more than a day. Stay on track!
                    <ul style={{ margin: '5px 0 0 0', paddingLeft: '20px' }}>
                        {delayedTasks.slice(0, 3).map(task => (
                            <li key={task._id}>{task.title}</li>
                        ))}
                        {delayedTasks.length > 3 && <li>...and {delayedTasks.length - 3} more.</li>}
                    </ul>
                </Alert>
            </Collapse>
        </Box>
    );
};

export default PendingAlerts;
