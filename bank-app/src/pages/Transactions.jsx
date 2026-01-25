import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useToast } from '../context/ToastContext';

const Transactions = () => {
    const { showToast } = useToast();
    const [formData, setFormData] = useState({
        senderaccountnumber: '',
        receiveraccountnumber: '',
        amount: ''
    });
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(false);

    // Transaction History State
    const [transactions, setTransactions] = useState([]);
    const [historyLoading, setHistoryLoading] = useState(true);
    const [filters, setFilters] = useState({
        search: '',
        type: 'all',
        minAmount: '',
        maxAmount: ''
    });

    useEffect(() => {
        fetchAccounts();
        fetchTransactions();
    }, []);

    const fetchAccounts = async () => {
        const userId = localStorage.getItem('userId');
        if (!userId) return;

        try {
            const data = await api.getAccounts(userId);
            const accountList = Array.isArray(data) ? data : (data ? [data] : []);
            setAccounts(accountList);
            if (accountList.length > 0) {
                setFormData(prev => ({ ...prev, senderaccountnumber: accountList[0].accountnumber }));
            }
        } catch (error) {
            console.error('Error fetching accounts:', error);
            showToast('Failed to load accounts', 'error');
        }
    };

    const fetchTransactions = async () => {
        const userId = localStorage.getItem('userId');
        if (!userId) return;

        try {
            setHistoryLoading(true);
            const data = await api.getTransactions(userId);
            setTransactions(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching transactions:', error);
            showToast('Failed to load transaction history', 'error');
        } finally {
            setHistoryLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.senderaccountnumber || !formData.receiveraccountnumber || !formData.amount) {
            showToast('Please fill in all fields', 'error');
            return;
        }

        setLoading(true);
        try {
            await api.performTransaction({
                senderaccountnumber: formData.senderaccountnumber,
                receiveraccountnumber: formData.receiveraccountnumber,
                amount: parseFloat(formData.amount)
            });

            showToast(`Successfully sent ₹${formData.amount}`, 'success');
            setFormData(prev => ({
                ...prev,
                receiveraccountnumber: '',
                amount: ''
            }));
            fetchAccounts();
            fetchTransactions(); // Refresh history
        } catch (error) {
            console.error('Transaction error:', error);
            showToast(error.message || 'Transaction failed', 'error');
        } finally {
            setLoading(false);
        }
    };

    const filteredTransactions = transactions.filter(txn => {
        const matchesSearch = String(txn.id || '').toLowerCase().includes(filters.search.toLowerCase());

        let matchesType = true;
        if (filters.type !== 'all') {
            const isDebit = txn.amount < 0;
            if (filters.type === 'debit') matchesType = isDebit;
            if (filters.type === 'credit') matchesType = !isDebit;
        }

        const amount = Math.abs(txn.amount);
        const matchesMinString = filters.minAmount === '' || amount >= parseFloat(filters.minAmount);
        const matchesMaxString = filters.maxAmount === '' || amount <= parseFloat(filters.maxAmount);

        return matchesSearch && matchesType && matchesMinString && matchesMaxString;
    });

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gap: '2rem', gridTemplateColumns: '1fr' }}>
            <section style={{ maxWidth: '600px', margin: '0 auto', width: '100%' }}>
                <h1 className="text-2xl font-bold" style={{ marginBottom: '1.5rem' }}>Make a Transaction</h1>
                <Card>
                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                            <label style={{ fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-main)' }}>From Account</label>
                            <select
                                value={formData.senderaccountnumber}
                                onChange={(e) => setFormData({ ...formData, senderaccountnumber: e.target.value })}
                                style={{
                                    padding: '0.5rem 0.75rem',
                                    borderRadius: 'var(--radius)',
                                    border: '1px solid var(--input)',
                                    width: '100%',
                                    fontSize: '1rem',
                                    color: 'var(--foreground)',
                                    background: 'var(--background)'
                                }}
                                required
                            >
                                <option value="">Select Account</option>
                                {accounts.map(acc => (
                                    <option key={acc.id} value={acc.accountnumber}>
                                        {acc.type} - {acc.accountnumber} (₹{acc.balance})
                                    </option>
                                ))}
                            </select>
                        </div>

                        <Input
                            label="Recipient Account Number"
                            id="recipient"
                            placeholder="Enter account number"
                            value={formData.receiveraccountnumber}
                            onChange={(e) => setFormData({ ...formData, receiveraccountnumber: e.target.value })}
                            required
                        />
                        <Input
                            label="Amount (₹)"
                            id="amount"
                            type="number"
                            placeholder="0.00"
                            value={formData.amount}
                            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                            required
                            min="1"
                        />

                        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? 'Sending...' : 'Send Money'}
                            </Button>
                            <Button
                                type="button"
                                variant="secondary"
                                className="w-full"
                                onClick={() => setFormData(prev => ({ ...prev, receiveraccountnumber: '', amount: '' }))}
                                disabled={loading}
                            >
                                Clear
                            </Button>
                        </div>
                    </form>
                </Card>
            </section>

            <section>
                <h2 className="text-xl font-bold" style={{ marginBottom: '1rem' }}>Transaction History</h2>
                <Card>
                    {/* Filters */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                        <Input
                            placeholder="Search by ID..."
                            value={filters.search}
                            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                        />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <select
                                value={filters.type}
                                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                                style={{
                                    padding: '0.5rem',
                                    borderRadius: 'var(--radius)',
                                    border: '1px solid var(--input)',
                                    background: 'var(--background)',
                                    color: 'var(--foreground)',
                                    height: '42px'
                                }}
                            >
                                <option value="all">All Types</option>
                                <option value="debit">Debit</option>
                                <option value="credit">Credit</option>
                            </select>
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <Input
                                type="number"
                                placeholder="Min Amount"
                                value={filters.minAmount}
                                onChange={(e) => setFilters({ ...filters, minAmount: e.target.value })}
                            />
                            <Input
                                type="number"
                                placeholder="Max Amount"
                                value={filters.maxAmount}
                                onChange={(e) => setFilters({ ...filters, maxAmount: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Table */}
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid var(--border)' }}>
                                    <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>ID</th>
                                    <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Type</th>
                                    <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Amount</th>
                                    <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {historyLoading ? (
                                    <tr>
                                        <td colSpan="4" style={{ padding: '2rem', textAlign: 'center' }}>Loading transactions...</td>
                                    </tr>
                                ) : filteredTransactions.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>No transactions found</td>
                                    </tr>
                                ) : (
                                    filteredTransactions.map(txn => (
                                        <tr key={txn.id} style={{ borderBottom: '1px solid var(--border)' }}>
                                            <td style={{ padding: '1rem', fontFamily: 'monospace' }}>{txn.id}</td>
                                            <td style={{ padding: '1rem', textTransform: 'capitalize' }}>
                                                {txn.amount < 0 ? 'Debit' : 'Credit'}
                                            </td>
                                            <td style={{ padding: '1rem', fontWeight: 'bold', color: txn.amount < 0 ? '#ef4444' : '#10b981' }}>
                                                {txn.amount < 0 ? '-' : '+'}₹{Math.abs(txn.amount).toFixed(2)}
                                            </td>
                                            <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>
                                                {new Date().toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </section>
        </div>
    );
};

export default Transactions;
