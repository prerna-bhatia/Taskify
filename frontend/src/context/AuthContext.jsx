import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Default Axios base URL
    const http = axios.create({
        baseURL: 'http://localhost:5000/api',
    });

    useEffect(() => {
        const loggedInUser = localStorage.getItem('user');
        if (loggedInUser) {
            setUser(JSON.parse(loggedInUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        const res = await http.post('/auth/login', { email, password });
        if (res.data) {
            localStorage.setItem('user', JSON.stringify(res.data));
            setUser(res.data);
        }
        return res.data;
    };

    const register = async (name, email, password) => {
        const res = await http.post('/auth/register', { name, email, password });
        if (res.data) {
            localStorage.setItem('user', JSON.stringify(res.data));
            setUser(res.data);
        }
        return res.data;
    };

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
    };

    // Helper for requests
    const authConfig = () => ({
        headers: {
            Authorization: `Bearer ${user?.token}`,
        },
    });

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading, http, authConfig }}>
            {children}
        </AuthContext.Provider>
    );
};
