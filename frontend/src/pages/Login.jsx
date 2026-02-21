import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Container, Box, Typography, TextField, Button, Paper, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
        } catch (err) {
            alert('Login Failed');
        }
    };

    return (
        <Container component="main" maxWidth="xs" className="fade-in" sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Paper elevation={6} sx={{ p: 4, width: '100%', borderRadius: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'rgba(30, 30, 30, 0.9)', backdropFilter: 'blur(10px)' }}>
                <Typography component="h1" variant="h4" fontWeight="bold" sx={{ mb: 1, color: 'primary.main' }}>
                    Welcome Back
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Log in to manage your tasks.
                </Typography>
                <Box component="form" onSubmit={onSubmit} sx={{ mt: 1, width: '100%' }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Email Address"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, py: 1.5 }}>
                        Sign In
                    </Button>
                    <Box textAlign="center">
                        <Link component="button" variant="body2" onClick={() => navigate('/register')} sx={{ color: 'secondary.main' }}>
                            Don't have an account? Sign Up
                        </Link>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default Login;
