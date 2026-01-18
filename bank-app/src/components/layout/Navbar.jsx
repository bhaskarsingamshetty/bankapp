import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';

// For now, Sidebar handles main navigation. 
// Navbar could be used for Top User Profile or Mobile Menu toggle.
const Navbar = ({ toggleSidebar }) => {
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const fetchName = async () => {
            const userId = localStorage.getItem('userId');
            if (userId) {
                try {
                    const name = await api.getCustomerName(userId);
                    setUserName(name || '');
                } catch (error) {
                    console.error('Failed to fetch user name in navbar:', error);
                }
            }
        };
        fetchName();
    }, []);

    const getInitials = (name) => {
        if (!name) return 'U';
        return name.charAt(0).toUpperCase();
    };

    return (
        <header style={{
            height: '64px',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 2rem',
            backgroundColor: 'var(--card)'
        }}>
            <button onClick={toggleSidebar} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-main)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            </button>
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)', position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
                TrustOne Bank
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontWeight: '600' }}>{userName || 'User'}</span>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.875rem' }}>
                    {getInitials(userName)}
                </div>
            </div>
        </header>
    );
};

export default Navbar;
