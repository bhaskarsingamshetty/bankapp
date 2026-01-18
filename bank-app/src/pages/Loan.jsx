import React, { useState } from 'react';
import { api } from '../services/api';
import { useToast } from '../context/ToastContext';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const Loan = () => {
    const { showToast } = useToast();
    const [formData, setFormData] = useState({
        amount: '',
        tenure: '',
        type: 'personal',
        principalAmount: '',
        interestRate: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userId = localStorage.getItem('userId');

        if (!userId) {
            showToast('Please login to apply for a loan', 'error');
            return;
        }

        if (!formData.amount || !formData.tenure || !formData.principalAmount || !formData.interestRate) {
            showToast('Please fill in required fields', 'error');
            return;
        }

        try {
            await api.applyLoan(userId, {
                type: formData.type,
                amount: Number(formData.amount),
                tenure: Number(formData.tenure),
                principalAmount: Number(formData.principalAmount),
                interestRate: Number(formData.interestRate)
            });

            showToast(`Loan application for ₹${formData.amount} submitted successfully! We will review it shortly.`, 'success');
            setFormData({
                amount: '',
                tenure: '',
                type: 'personal',
                principalAmount: '',
                interestRate: ''
            });
        } catch (error) {
            console.error('Error submitting loan application:', error);
            showToast(error.message || 'An error occurred. Please try again later.', 'error');
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h1 className="text-2xl font-bold" style={{ marginBottom: '1.5rem' }}>Apply for a Loan</h1>

            <Card>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                        <label style={{ fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-main)' }}>Loan Type</label>
                        <select
                            value={formData.type}
                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                            style={{ padding: '0.5rem 0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--input)', width: '100%', fontSize: '1rem' }}
                        >
                            <option value="personal">Personal Loan</option>
                            <option value="home">Home Loan</option>
                            <option value="car">Car Loan</option>
                            <option value="education">Education Loan</option>
                        </select>
                    </div>

                    <Input
                        label="Loan Amount (₹)"
                        id="amount"
                        type="number"
                        placeholder="5000"
                        value={formData.amount}
                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    />

                    <Input
                        label="Tenure (Months)"
                        id="tenure"
                        type="number"
                        placeholder="12"
                        value={formData.tenure}
                        onChange={(e) => setFormData({ ...formData, tenure: e.target.value })}
                    />

                    <Input
                        label="Principal Amount (₹)"
                        id="principalAmount"
                        type="number"
                        placeholder="5000"
                        value={formData.principalAmount}
                        onChange={(e) => setFormData({ ...formData, principalAmount: e.target.value })}
                    />

                    <Input
                        label="Interest Rate (%)"
                        id="interestRate"
                        type="number"
                        step="0.01"
                        placeholder="5.5"
                        value={formData.interestRate}
                        onChange={(e) => setFormData({ ...formData, interestRate: e.target.value })}
                    />

                    <Button type="submit" className="w-full" style={{ marginTop: '1rem' }}>Submit Application</Button>
                </form>
            </Card>
        </div>
    );
};

export default Loan;
