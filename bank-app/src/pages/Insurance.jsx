import React, { useState } from 'react';
import { api } from '../services/api';
import { useToast } from '../context/ToastContext';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const Insurance = () => {
    const { showToast } = useToast();
    const [formData, setFormData] = useState({
        productId: '1',
        premiumAmount: ''
    });

    const products = [
        { id: '1', name: 'Family Health Cover' },
        { id: '2', name: 'Term Life Insurance' },
        { id: '3', name: 'Car Insurance' }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userId = localStorage.getItem('userId');

        if (!userId) {
            showToast('Please login to apply for insurance', 'error');
            return;
        }

        if (!formData.premiumAmount) {
            showToast('Please enter premium amount', 'error');
            return;
        }

        try {
            await api.applyInsurance(userId, {
                productid: Number(formData.productId),
                premiumAmount: Number(formData.premiumAmount)
            });

            const productName = products.find(p => p.id === formData.productId)?.name;
            showToast(`Insurance application for ${productName} submitted successfully!`, 'success');
            setFormData({ productId: '1', premiumAmount: '' });
        } catch (error) {
            console.error('Error applying for insurance:', error);
            showToast(error.message || 'Failed to submit application. Please try again.', 'error');
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h1 className="text-2xl font-bold" style={{ marginBottom: '1.5rem' }}>Get Insurance</h1>

            <Card>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                        <label style={{ fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-main)' }}>Insurance Product</label>
                        <select
                            value={formData.productId}
                            onChange={(e) => setFormData({ ...formData, productId: e.target.value })}
                            style={{ padding: '0.5rem 0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--input)', width: '100%', fontSize: '1rem' }}
                        >
                            {products.map(product => (
                                <option key={product.id} value={product.id}>{product.name}</option>
                            ))}
                        </select>
                    </div>

                    <Input
                        label="Premium Amount (₹)"
                        id="premiumAmount"
                        type="number"
                        placeholder="5000"
                        value={formData.premiumAmount}
                        onChange={(e) => setFormData({ ...formData, premiumAmount: e.target.value })}
                    />

                    <Button type="submit" className="w-full" style={{ marginTop: '1rem' }}>Apply Now</Button>
                </form>
            </Card>
        </div>
    );
};

export default Insurance;
