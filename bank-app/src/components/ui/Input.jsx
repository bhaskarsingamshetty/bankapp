import React from 'react';

const Input = ({ label, id, error, className = '', ...props }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', marginBottom: '1rem' }}>
            {label && (
                <label
                    htmlFor={id}
                    style={{ fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-main)' }}
                >
                    {label}
                </label>
            )}
            <input
                id={id}
                style={{
                    padding: '0.5rem 0.75rem',
                    borderRadius: 'var(--radius)',
                    border: '1px solid var(--input)',
                    fontSize: '1rem',
                    outline: 'none',
                    width: '100%',
                }}
                className={className}
                {...props}
            />
            {error && <span style={{ color: '#dc2626', fontSize: '0.75rem' }}>{error}</span>}
        </div>
    );
};

export default Input;
