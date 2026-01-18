import React from 'react';

const Card = ({ children, className = '', title, ...props }) => {
    return (
        <div
            style={{
                backgroundColor: 'var(--card)',
                borderRadius: 'var(--radius)',
                border: '1px solid var(--border)',
                boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
                padding: '1.5rem',
                color: 'var(--card-foreground)',
            }}
            className={className}
            {...props}
        >
            {title && (
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>
                    {title}
                </h3>
            )}
            {children}
        </div>
    );
};

export default Card;
