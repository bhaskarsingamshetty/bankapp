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

    const handleStatusUpdate = async (id, status,cid) => {
        try {
            await api.updateLoanStatus(id, status,cid);
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
        <div style={{ padding: '1.5rem', minHeight: '100vh', backgroundColor: '#f1f5f9' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary)' }}>
                    Loan Management
                </h1>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {['all', 'pending', 'approved', 'rejected'].map(f => (
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
                        <Card key={loan.id} style={{
                            padding: '1.5rem',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            gap: '1rem',
                            backgroundColor: '#ffffff',
                            transition: 'all 0.2s',
                            cursor: 'pointer',
                            hover: { transform: 'translateY(-2px)', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }
                        }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 10px 15px -3px rgb(0 0 0 / 0.1)';
                                e.currentTarget.style.backgroundColor = '#f1f5f9'; // Slate-100 on hover
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'none';
                                e.currentTarget.style.boxShadow = '0 1px 3px 0 rgb(0 0 0 / 0.1)';
                                e.currentTarget.style.backgroundColor = '#ffffff';
                            }}
                        >
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                                    <h3 style={{ fontSize: '1.25rem', fontWeight: '600' }}>
                                        {loan.type} Loan
                                    </h3>
                                    <span
                                        className={getStatusColor(loan.status)}
                                        style={{
                                            padding: '0.25rem 0.75rem',
                                            borderRadius: '9999px',
                                            fontSize: '0.875rem',
                                            fontWeight: '500',
                                        }}
                                    >
                                        {loan.status}
                                    </span>
                                </div>
                                <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem 2rem' }}>
                                    <p>Customer ID: {loan.cid}</p>
                                    <p>Amount: ₹{loan.amount}</p>
                                    <p>Principal: ₹{loan.principalAmount}</p>
                                    <p>Interest Rate: {loan.interestRate}%</p>
                                    <p>Tenure: {loan.tenure} months</p>
                                    <p>Loan ID: {loan.id}</p>
                                </div>
                            </div>

                            {loan.status.toLowerCase() === 'pending' && (
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <Button
                                        onClick={() => handleStatusUpdate(loan.id, 'approved',loan.cid)}
                                        style={{ backgroundColor: '#16a34a', color: 'white' }}
                                    >
                                        Approve
                                    </Button>
                                    <Button
                                        onClick={() => handleStatusUpdate(loan.id, 'rejected',loan.cid)}
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
