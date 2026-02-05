import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const LoanManagement = () => {
    const [loans, setLoans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        fetchLoans();
    }, []);

    const fetchLoans = async () => {
        try {
            setLoading(true);
            const data = await api.getAllLoans();
            setLoans(data);
        } catch (err) {
            setError('Failed to fetch loans');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (id, status) => {
        try {
            await api.updateLoanStatus(id, status);
            setLoans(loans.map(loan =>
                loan.id === id ? { ...loan, status: status } : loan
            ));
            alert(`Loan ${status} successfully`);
        } catch (err) {
            console.error('Failed to update status', err);
            alert('Failed to update loan status');
        }
    };

    const filteredLoans = loans.filter(loan => {
        if (filter === 'all') return true;
        return loan.status.toLowerCase() === filter.toLowerCase();
    });

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'accepted': return 'text-green-600 bg-green-100';
            case 'rejected': return 'text-red-600 bg-red-100';
            case 'pending': return 'text-yellow-600 bg-yellow-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    if (loading) return <div className="p-4">Loading...</div>;
    if (error) return <div className="p-4 text-red-500">{error}</div>;

    return (
        <div style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary)' }}>
                    Loan Management
                </h1>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {['all', 'pending', 'accepted', 'rejected'].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            style={{
                                padding: '0.5rem 1rem',
                                borderRadius: '0.375rem',
                                border: '1px solid var(--border)',
                                backgroundColor: filter === f ? 'var(--primary)' : 'var(--card)',
                                color: filter === f ? 'white' : 'var(--text)',
                                cursor: 'pointer'
                            }}
                        >
                            {f.charAt(0).toUpperCase() + f.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            <div style={{ display: 'grid', gap: '1rem' }}>
                {filteredLoans.length === 0 ? (
                    <Card style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                        No loans found
                    </Card>
                ) : (
                    filteredLoans.map((loan) => (
                        <Card key={loan.id} style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                                    <h3 style={{ fontSize: '1.25rem', fontWeight: '600' }}>
                                        {loan.type} Loan
                                    </h3>
                                    <span style={{
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: '9999px',
                                        fontSize: '0.875rem',
                                        fontWeight: '500',
                                        className: getStatusColor(loan.status)
                                    }}>
                                        {loan.status}
                                    </span>
                                </div>
                                <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem 2rem' }}>
                                    <p>Amount: ₹{loan.amount}</p> {/* Assuming using Rupee symbol based on context */}
                                    <p>Principal: ₹{loan.principalAmount}</p> {/* Assuming principalAmount based on snippet */}
                                    <p>Interest Rate: {loan.interestRate}%</p>
                                    <p>Tenure: {loan.tenure} months</p>
                                    <p>ID: {loan.id}</p>
                                </div>
                            </div>

                            {loan.status.toLowerCase() === 'pending' && (
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <Button
                                        onClick={() => handleStatusUpdate(loan.id, 'accepted')}
                                        style={{ backgroundColor: '#16a34a', color: 'white' }}
                                    >
                                        Accept
                                    </Button>
                                    <Button
                                        onClick={() => handleStatusUpdate(loan.id, 'rejected')}
                                        style={{ backgroundColor: '#dc2626', color: 'white' }}
                                    >
                                        Reject
                                    </Button>
                                </div>
                            )}
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
};

export default LoanManagement;
