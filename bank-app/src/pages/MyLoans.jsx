import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import Card from '../components/ui/Card';
import { BadgeIndianRupee, Calendar, Percent, Landmark, FileText } from 'lucide-react';

const MyLoans = () => {
    const [loans, setLoans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLoans = async () => {
            const userId = localStorage.getItem('userId');

            if (!userId) {
                setError('User not logged in');
                setLoading(false);
                return;
            }

            try {
                const data = await api.getLoans(userId);
                // Ensure data is array
                setLoans(Array.isArray(data) ? data : [data]);
            } catch (err) {
                console.error("Error fetching loans:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchLoans();
    }, []);

    if (loading) return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
            <div className="spinner"></div>
            <p className="text-muted">Loading your loans...</p>
        </div>
    );

    if (error) return (
        <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--destructive)' }}>
            <p>Error loading loans: {error}</p>
        </div>
    );

    return (
        <div style={{ maxWidth: '900px', margin: '0 auto', paddingBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ padding: '0.75rem', backgroundColor: 'rgba(37, 99, 235, 0.1)', borderRadius: '12px', color: 'var(--primary)' }}>
                    <Landmark size={32} />
                </div>
                <div>
                    <h1 className="text-2xl font-bold">My Loans</h1>
                    <p className="text-muted">Manage and track your active loans</p>
                </div>
            </div>

            {loans.length === 0 ? (
                <Card style={{ textAlign: 'center', padding: '3rem' }}>
                    <FileText size={48} className="text-muted" style={{ margin: '0 auto 1rem', display: 'block' }} />
                    <h3 className="text-xl font-bold">No Active Loans</h3>
                    <p className="text-muted">You don't have any active loans at the moment.</p>
                </Card>
            ) : (
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                    {loans.map((loan, index) => {
                        const status = loan.status || 'Active';
                        const isActive = status.toLowerCase() === 'active';
                        const statusColor = isActive ? '#16a34a' : '#dc2626';

                        return (
                            <Card key={index} style={{ padding: '0', overflow: 'hidden', border: '1px solid var(--border)' }}>
                                <div style={{
                                    background: 'linear-gradient(to right, var(--primary), #3b82f6)',
                                    padding: '1rem 1.5rem',
                                    color: 'white',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <span style={{ fontWeight: '600', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <FileText size={20} />
                                        {loan.type}
                                    </span>
                                    <span style={{
                                        backgroundColor: 'white',
                                        color: statusColor,
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: '1rem',
                                        fontSize: '0.875rem',
                                        fontWeight: '600',
                                        textTransform: 'capitalize'
                                    }}>{status}</span>
                                </div>

                                <div style={{ padding: '1.5rem' }}>
                                    <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
                                        <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '0.25rem' }}>Current Loan Amount</p>
                                        <h2 className="text-3xl font-bold" style={{ color: 'var(--primary)' }}>
                                            ₹{Number(loan.amount).toLocaleString()}
                                        </h2>
                                    </div>

                                    <div style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                                        gap: '1.5rem',
                                        paddingTop: '1.5rem',
                                        borderTop: '1px solid var(--border)'
                                    }}>

                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            <div style={{ padding: '0.5rem', backgroundColor: '#eff6ff', borderRadius: '8px', color: 'var(--primary)' }}>
                                                <BadgeIndianRupee size={20} />
                                            </div>
                                            <div>
                                                <p className="text-muted text-sm">Principal Amount</p>
                                                <p className="font-semibold">₹{Number(loan.principal_amount).toLocaleString()}</p>
                                            </div>
                                        </div>

                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            <div style={{ padding: '0.5rem', backgroundColor: '#f0fdf4', borderRadius: '8px', color: '#16a34a' }}>
                                                <Percent size={20} />
                                            </div>
                                            <div>
                                                <p className="text-muted text-sm">Interest Rate</p>
                                                <p className="font-semibold">{loan.intrestrate}% p.a.</p>
                                            </div>
                                        </div>

                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            <div style={{ padding: '0.5rem', backgroundColor: '#fff7ed', borderRadius: '8px', color: '#ea580c' }}>
                                                <Calendar size={20} />
                                            </div>
                                            <div>
                                                <p className="text-muted text-sm">Tenure</p>
                                                <p className="font-semibold">{loan.tenure} Months</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default MyLoans;
