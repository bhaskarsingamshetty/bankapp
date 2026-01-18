import React, { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

const Toast = ({ id, message, type = 'info', onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose(id);
        }, 5000); // Auto dismiss after 5 seconds

        return () => clearTimeout(timer);
    }, [id, onClose]);

    const getIcon = () => {
        switch (type) {
            case 'success': return <CheckCircle size={20} />;
            case 'error': return <AlertCircle size={20} />;
            case 'info':
            default: return <Info size={20} />;
        }
    };

    const getStyles = () => {
        const baseStyles = {
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '1rem',
            borderRadius: 'var(--radius)',
            color: '#fff',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            minWidth: '300px',
            maxWidth: '400px',
            animation: 'slideIn 0.3s ease-out forwards',
            marginBottom: '0.5rem',
            position: 'relative',
        };

        switch (type) {
            case 'success':
                return { ...baseStyles, backgroundColor: '#10b981' }; // Green
            case 'error':
                return { ...baseStyles, backgroundColor: '#ef4444' }; // Red
            case 'info':
            default:
                return { ...baseStyles, backgroundColor: '#3b82f6' }; // Blue
        }
    };

    return (
        <div style={getStyles()}>
            {getIcon()}
            <p style={{ margin: 0, flex: 1, fontSize: '0.875rem' }}>{message}</p>
            <button
                onClick={() => onClose(id)}
                style={{
                    background: 'none',
                    border: 'none',
                    color: 'rgba(255, 255, 255, 0.8)',
                    cursor: 'pointer',
                    padding: 0,
                    display: 'flex',
                    alignItems: 'center'
                }}
            >
                <X size={18} />
            </button>
        </div>
    );
};

export default Toast;
