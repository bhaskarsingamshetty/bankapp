import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/ui/Card';

const AdminDashboard = () => {
    return (
        <div style={{ padding: '1rem' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem', color: 'var(--primary)' }}>
                Admin Dashboard
            </h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                <Card style={{ padding: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>System Status</h3>
                    <p style={{ color: 'var(--text-muted)' }}>All systems operational</p>
                </Card>
                <Card style={{ padding: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>User Statistics</h3>
                    <p style={{ color: 'var(--text-muted)' }}>User data overview coming soon...</p>
                </Card>
                <Card
                    style={{ padding: '1.5rem', cursor: 'pointer', transition: 'transform 0.2s', ':hover': { transform: 'translateY(-2px)' } }}
                    onClick={() => window.location.href = '/admin/loans'} // Using window.location for simplicity, or Link if I import it
                >
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--primary)' }}>Loan Management</h3>
                    <p style={{ color: 'var(--text-muted)' }}>Review and manage loan applications</p>
                </Card>
            </div>
        </div>
    );
};

export default AdminDashboard;
