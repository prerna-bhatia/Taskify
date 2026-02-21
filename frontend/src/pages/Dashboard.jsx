import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { TaskContext } from '../context/TaskContext';
import { Container, Grid, Box, Typography, Button, TextField, Paper } from '@mui/material';
import TaskCard from '../components/TaskCard';
import CalendarSidebar from '../components/CalendarSidebar';
import PendingAlerts from '../components/PendingAlerts';
import LogoutIcon from '@mui/icons-material/Logout';
import AddTaskIcon from '@mui/icons-material/AddTask';

const Dashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const { tasks, addTask, updateTask, deleteTask } = useContext(TaskContext);
    const [newTaskTitle, setNewTaskTitle] = useState('');

    const handleAddTask = (e) => {
        e.preventDefault();
        if (!newTaskTitle.trim()) return;
        addTask(newTaskTitle, 'Pending');
        setNewTaskTitle('');
    };

    const pendingTasks = tasks.filter(t => t.status === 'Pending');
    const completedTasks = tasks.filter(t => t.status === 'Completed');

    return (
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4, height: 'calc(100vh - 64px)' }} className="fade-in">
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4" fontWeight="bold">
                    Welcome, <Box component="span" sx={{ color: 'primary.main' }}>{user?.name}</Box>
                </Typography>
                <Button variant="outlined" color="error" startIcon={<LogoutIcon />} onClick={logout}>
                    Logout
                </Button>
            </Box>

            <Grid container spacing={3} sx={{ height: 'calc(100% - 70px)' }}>
                {/* Main Content Area: Tasks */}
                <Grid item xs={12} md={8} lg={9} sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

                    <PendingAlerts />

                    {/* Add Task Input */}
                    <Paper component="form" onSubmit={handleAddTask} elevation={2} sx={{ p: 2, mb: 3, display: 'flex', borderRadius: 3 }}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="What needs to be done?"
                            value={newTaskTitle}
                            onChange={(e) => setNewTaskTitle(e.target.value)}
                            sx={{ mr: 2 }}
                        />
                        <Button type="submit" variant="contained" color="primary" startIcon={<AddTaskIcon />} sx={{ px: 4 }}>
                            Add
                        </Button>
                    </Paper>

                    {/* Task Lists Grid */}
                    <Grid container spacing={3} sx={{ flexGrow: 1, overflow: 'hidden' }}>
                        <Grid item xs={12} md={6} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Box component="span" sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: 'warning.main', display: 'inline-block' }} />
                                Pending Tasks ({pendingTasks.length})
                            </Typography>
                            <Box sx={{ flexGrow: 1, overflowY: 'auto', pr: 1 }}>
                                {pendingTasks.map((task) => (
                                    <TaskCard key={task._id} task={task} updateTask={updateTask} deleteTask={deleteTask} />
                                ))}
                                {pendingTasks.length === 0 && (
                                    <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mt: 4 }}>No pending tasks!</Typography>
                                )}
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Box component="span" sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: 'success.main', display: 'inline-block' }} />
                                Completed Tasks ({completedTasks.length})
                            </Typography>
                            <Box sx={{ flexGrow: 1, overflowY: 'auto', pr: 1 }}>
                                {completedTasks.map((task) => (
                                    <TaskCard key={task._id} task={task} updateTask={updateTask} deleteTask={deleteTask} />
                                ))}
                                {completedTasks.length === 0 && (
                                    <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mt: 4 }}>No completed tasks yet.</Typography>
                                )}
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>

                {/* Sidebar: Calendar & Imp Dates */}
                <Grid item xs={12} md={4} lg={3} sx={{ height: '100%' }}>
                    <CalendarSidebar />
                </Grid>
            </Grid>
        </Container>
    );
};

export default Dashboard;
