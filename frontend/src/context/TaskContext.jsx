import React, { createContext, useState, useContext, useEffect } from 'react';
import { AuthContext } from './AuthContext';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [events, setEvents] = useState([]);
    const { http, authConfig, user } = useContext(AuthContext);

    const fetchTasks = async () => {
        if (!user) return;
        try {
            const res = await http.get('/tasks', authConfig());
            setTasks(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchEvents = async () => {
        if (!user) return;
        try {
            const res = await http.get('/events', authConfig());
            setEvents(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchTasks();
        fetchEvents();
    }, [user]);

    const addTask = async (title, status) => {
        const res = await http.post('/tasks', { title, status }, authConfig());
        setTasks([...tasks, res.data]);
    };

    const updateTask = async (id, updatedData) => {
        const res = await http.put(`/tasks/${id}`, updatedData, authConfig());
        setTasks(tasks.map((task) => (task._id === id ? res.data : task)));
    };

    const deleteTask = async (id) => {
        await http.delete(`/tasks/${id}`, authConfig());
        setTasks(tasks.filter((task) => task._id !== id));
    };

    const addEvent = async (title, date) => {
        const res = await http.post('/events', { title, date }, authConfig());
        setEvents([...events, res.data]);
    };

    const deleteEvent = async (id) => {
        await http.delete(`/events/${id}`, authConfig());
        setEvents(events.filter((event) => event._id !== id));
    };

    return (
        <TaskContext.Provider
            value={{
                tasks,
                events,
                addTask,
                updateTask,
                deleteTask,
                addEvent,
                deleteEvent,
                fetchTasks,
                fetchEvents
            }}
        >
            {children}
        </TaskContext.Provider>
    );
};
