import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!formData.email || !formData.password) {
            setError('Please fill in all fields');
            return;
        }

        try {
            const data = await api.login(formData.email, formData.password);
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('userId', data.id);
            const normalizedRole = data.role ? data.role.toUpperCase() : '';
            localStorage.setItem('role', normalizedRole);

            if (normalizedRole === "ADMIN") {
                console.log(data.role);
                navigate('/admin/dashboard');
            } else {
                console.log(data.role + "user");
                navigate('/');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError(err.message || 'Login failed. Please check your credentials.');
        }
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundColor: 'var(--background)'
        }}>
            <Card style={{ width: '400px', maxWidth: '100%', padding: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem', textAlign: 'center' }}>
                    Welcome Back
                </h2>
                <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginBottom: '2rem' }}>
                    Login to your account
                </p>

                <form onSubmit={handleSubmit}>
                    <Input
                        label="Email"
                        id="email"
                        type="email"
                        placeholder="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    <Input
                        label="Password"
                        id="password"
                        type="password"
                        placeholder="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                    {error && (
                        <div style={{ color: '#dc2626', fontSize: '0.875rem', marginBottom: '1rem' }}>
                            {error}
                        </div>
                    )}
                    <Button type="submit" className="w-full" style={{ width: '100%' }}>
                        Login
                    </Button>
                </form>

                <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.875rem' }}>
                    Don't have an account?{' '}
                    <Link to="/signup" style={{ color: 'var(--primary)', fontWeight: '600' }}>
                        Sign up
                    </Link>
                </div>
            </Card>
        </div>
    );
};

export default Login;
