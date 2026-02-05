import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Home, IndianRupee, Shield, Briefcase, LogOut, User } from 'lucide-react';

const Sidebar = ({ isOpen }) => {
    const navigate = useNavigate();
    const navItems = [
        { icon: Home, label: 'Dashboard', path: '/' },
        { icon: User, label: 'Accounts', path: '/account' },
        { icon: IndianRupee, label: 'Transactions', path: '/transactions' },
        { icon: Briefcase, label: 'Apply Loan', path: '/loans' },
        { icon: Briefcase, label: 'My Loans', path: '/my-loans' },
        { icon: Shield, label: 'Insurance', path: '/insurance' },
    ];

    return (
        <aside style={{
            width: '250px',
            height: '100vh',
            backgroundColor: 'var(--card)',
            borderRight: '1px solid var(--border)',
            display: 'flex',
            flexDirection: 'column',
            position: 'fixed',
            left: isOpen ? 0 : '-250px',
            top: 0,
            transition: 'left 0.3s ease-in-out',
            zIndex: 50
        }}>
            <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)' }}>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>
                    Menu
                </h1>
            </div>

            <nav style={{ padding: '1rem', flex: 1 }}>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', listStyle: 'none' }}>
                    {navItems.map((item) => (
                        <li key={item.path}>
                            <NavLink
                                to={item.path}
                                style={({ isActive }) => ({
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.75rem',
                                    padding: '0.75rem 1rem',
                                    borderRadius: 'var(--radius)',
                                    color: isActive ? 'var(--primary)' : 'var(--text-muted)',
                                    backgroundColor: isActive ? 'rgba(37, 99, 235, 0.1)' : 'transparent',
                                    fontWeight: isActive ? '600' : '500',
                                    transition: 'all 0.2s',
                                    textDecoration: 'none'
                                })}
                            >
                                <item.icon size={20} />
                                {item.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            <div style={{ padding: '1rem', borderTop: '1px solid var(--border)' }}>
                <button
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        width: '100%',
                        padding: '0.75rem 1rem',
                        background: 'none',
                        border: 'none',
                        color: '#dc2626',
                        cursor: 'pointer',
                        fontSize: '1rem'
                    }}
                    onClick={() => {
                        localStorage.removeItem('authToken');
                        localStorage.removeItem('userId');
                        localStorage.removeItem('role');
                        navigate('/login');
                    }}
                >
                    <LogOut size={20} />
                    Logout
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
