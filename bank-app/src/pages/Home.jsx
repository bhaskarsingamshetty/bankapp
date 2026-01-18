import React, { useState, useEffect } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { IndianRupee, CreditCard, Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';

const Home = () => {
    const [totalBalance, setTotalBalance] = useState(0);
    const [userName, setUserName] = useState('');
    const [showBalance, setShowBalance] = useState(true);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const userId = localStorage.getItem('userId');
            if (!userId) return;

            try {
                // Fetch name
                const name = await api.getCustomerName(userId);
                setUserName(name || 'Customer');

                // Fetch accounts and calculate balance
                const data = await api.getAccounts(userId);
                const accounts = Array.isArray(data) ? data : (data ? [data] : []);
                const total = accounts.reduce((sum, acc) => sum + (Number(acc.balance) || 0), 0);
                setTotalBalance(total);

                // Fetch transactions
                const txns = await api.getTransactions(userId);
                setTransactions(Array.isArray(txns) ? txns : []);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 className="text-2xl font-bold">Dashboard</h1>
                    <p className="text-muted">Welcome back, {userName}</p>
                </div>
                <Link to="/transactions">
                    <Button>Send Money</Button>
                </Link>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                <Card>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <p className="text-sm text-muted">Total Balance</p>
                                <button
                                    onClick={() => setShowBalance(!showBalance)}
                                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0', color: 'var(--text-muted)' }}
                                >
                                    {showBalance ? <Eye size={16} /> : <EyeOff size={16} />}
                                </button>
                            </div>
                            <h3 className="text-2xl font-bold">
                                {showBalance ? `₹${totalBalance.toLocaleString()}` : '₹ -----'}
                            </h3>
                        </div>
                        <div style={{ padding: '0.5rem', backgroundColor: 'rgba(37, 99, 235, 0.1)', borderRadius: '50%', color: 'var(--primary)' }}>
                            <IndianRupee size={24} />
                        </div>
                    </div>
                </Card>
            </div>

            <h2 className="text-xl font-bold" style={{ marginBottom: '1rem' }}>Recent Transactions</h2>
            <Card style={{ padding: '0' }}>
                {transactions.length > 0 ? (
                    transactions.map((txn) => (
                        <div key={txn.id} style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '1rem 1.5rem',
                            borderBottom: '1px solid var(--border)'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ padding: '0.5rem', backgroundColor: '#f1f5f9', borderRadius: '50%' }}>
                                    <CreditCard size={20} className="text-muted" />
                                </div>
                                <div>
                                    <p className="font-bold">{txn.type}</p>
                                    <p className="text-sm text-muted">ID: {txn.id}</p>
                                </div>
                            </div>
                            <div className="font-bold" style={{ color: txn.amount < 0 ? '#ef4444' : '#10b981' }}>
                                {txn.amount < 0 ? '-' : '+'}₹{Math.abs(txn.amount).toFixed(2)}
                            </div>
                        </div>
                    ))
                ) : (
                    <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                        No recent transactions
                    </div>
                )}
            </Card>
        </div>
    );
};

export default Home;
