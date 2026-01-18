import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Layout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--background)' }}>
            <Sidebar isOpen={isSidebarOpen} />
            <main style={{
                marginLeft: isSidebarOpen ? '250px' : '0',
                width: isSidebarOpen ? 'calc(100% - 250px)' : '100%',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease-in-out'
            }}>
                <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
                <div className="container" style={{ padding: '2rem', flex: 1 }}>
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Layout;
