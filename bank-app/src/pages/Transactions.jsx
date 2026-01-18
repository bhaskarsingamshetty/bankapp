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

    useEffect(() => {
        fetchAccounts();
    }, []);

    const fetchAccounts = async () => {
        const userId = localStorage.getItem('userId');
        if (!userId) return;

        try {
            const data = await api.getAccounts(userId);
            const accountList = Array.isArray(data) ? data : [data];
            setAccounts(accountList);
            // Auto-select first account if available
            if (accountList.length > 0) {
                setFormData(prev => ({ ...prev, senderaccountnumber: accountList[0].accountnumber }));
            }
        } catch (error) {
            console.error('Error fetching accounts:', error);
            showToast('Failed to load accounts', 'error');
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

            showToast(`Successfully sent $${formData.amount}`, 'success');
            setFormData(prev => ({
                ...prev,
                receiveraccountnumber: '',
                amount: ''
            }));
            // Refresh accounts to show updated balance if we were showing it
            fetchAccounts();
        } catch (error) {
            console.error('Transaction error:', error);
            showToast(error.message || 'Transaction failed', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
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
        </div>
    );
};

export default Transactions;
