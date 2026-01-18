import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { User, Plus } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const Account = () => {
    const { showToast } = useToast();
    const navigate = useNavigate();
    // Mock data for existing accounts
    const [accounts, setAccounts] = useState([
        { id: 1, type: 'Savings Account', accountNumber: '1234567890', balance: 12450.00 },
        { id: 2, type: 'Checking Account', accountNumber: '0987654321', balance: 500.00 }
    ]);

    const [showCreateForm, setShowCreateForm] = useState(false);
    const [newAccount, setNewAccount] = useState({ type: 'Savings', initialDeposit: '' });

    useEffect(() => {
        fetchAccounts();
    }, []);

    const fetchAccounts = async () => {
        const userId = localStorage.getItem('userId');
        if (!userId) return;

        try {
            const data = await api.getAccounts(userId);
            if (Array.isArray(data)) {
                setAccounts(data);
            } else {
                setAccounts(Array.isArray(data) ? data : [data]);
            }
        } catch (error) {
            console.error('Error fetching accounts:', error);
        }
    };

    const handleCreateAccount = async (e) => {
        e.preventDefault();
        const userId = localStorage.getItem('userId');

        if (!userId) {
            showToast('Session expired. Please login again.', 'error');
            navigate('/login');
            return;
        }

        try {
            const data = await api.createAccount(userId, {
                type: newAccount.type,
                balance: parseFloat(newAccount.initialDeposit) || 0
            });

            const newAccountNumber = Object.values(data)[0];
            await fetchAccounts();
            setShowCreateForm(false);
            setNewAccount({ type: 'Savings', initialDeposit: '' });
            showToast(`Account created successfully! Your new Account Number is: ${newAccountNumber}`, 'success');
        } catch (error) {
            console.error('Error creating account:', error);
            showToast(error.message || 'Error connecting to server.', 'error');
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 className="text-2xl font-bold">Account Management</h1>
                    <p className="text-muted">View and manage your bank accounts</p>
                </div>
                <Button onClick={() => setShowCreateForm(!showCreateForm)}>
                    <Plus size={20} style={{ marginRight: '0.5rem' }} />
                    {showCreateForm ? 'Cancel' : 'Open New Account'}
                </Button>
            </div>

            {showCreateForm && (
                <Card className="mb-6" style={{ marginBottom: '2rem' }}>
                    <h3 className="text-xl font-bold mb-4" style={{ marginBottom: '1rem' }}>Open New Account</h3>
                    <form onSubmit={handleCreateAccount}>
                        <div style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                            <label style={{ fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-main)' }}>Account Type</label>
                            <select
                                value={newAccount.type}
                                onChange={(e) => setNewAccount({ ...newAccount, type: e.target.value })}
                                style={{ padding: '0.5rem 0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--input)', width: '100%', fontSize: '1rem' }}
                            >
                                <option value="Savings">Savings Account</option>
                                <option value="Checking">Checking Account</option>
                                <option value="Business">Business Account</option>
                            </select>
                        </div>
                        <Input
                            label="Initial Deposit (₹)"
                            type="number"
                            value={newAccount.initialDeposit}
                            onChange={(e) => setNewAccount({ ...newAccount, initialDeposit: e.target.value })}
                            placeholder="1000"
                        />
                        <Button type="submit">Create Account</Button>
                    </form>
                </Card>
            )}

            <div style={{ display: 'grid', gap: '1.5rem' }}>
                {accounts.map(account => (
                    <Card key={account.id}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ padding: '0.75rem', backgroundColor: 'rgba(37, 99, 235, 0.1)', borderRadius: '50%', color: 'var(--primary)' }}>
                                    <User size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">{account.type}</h3>
                                    <p className="text-muted text-sm">Account : {account.accountnumber}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-muted">Available Balance</p>
                                <h3 className="text-xl font-bold" style={{ color: 'var(--primary)' }}>₹{account.balance.toLocaleString()}</h3>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Account;
