
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTransaction } from '../hooks/useTransaction';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';
import { TRANSACTION_CATEGORIES } from '../constants';
import LoadingSpinner from '../components/LoadingSpinner';

const UpdateTransaction = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { transactions, updateTransaction, loading } = useTransaction();
    const { user } = useAuth();
    const { showToast } = useToast();

    const [formData, setFormData] = useState(null);

    useEffect(() => {
        const transactionToUpdate = transactions.find(t => t.id.toString() === id);
        if (transactionToUpdate) {
            setFormData({
                ...transactionToUpdate,
                date: new Date(transactionToUpdate.date).toISOString().split('T')[0] // Format for input[type=date]
            });
        } else {
            showToast("Transaction not found.", "error");
            navigate('/my-transactions');
        }
    }, [id, transactions, navigate, showToast]);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleTypeChange = (e) => {
        const newType = e.target.value;
        setFormData(prev => ({
            ...prev,
            type: newType,
            category: TRANSACTION_CATEGORIES[newType][0] // Reset category
        }));
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const { type, category, amount, description, date } = formData;
        if (!type || !category || !amount || !description || !date) {
            showToast('Please fill in all fields.', 'error');
            return;
        }
         if (parseFloat(amount) <= 0) {
            showToast('Amount must be positive.', 'error');
            return;
        }

        const updatedData = { ...formData, amount: parseFloat(amount) };
        updateTransaction(updatedData);
        showToast('Transaction updated successfully!', 'success');
        navigate(`/transaction/${id}`);
    };
    
    const inputClasses = "mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white";
    const selectClasses = "mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white";


    if (!formData) {
        return <div className="flex justify-center mt-10"><LoadingSpinner /></div>;
    }

    return (
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">Update Transaction</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Type</label>
                        <select id="type" name="type" value={formData.type} onChange={handleTypeChange} className={selectClasses}>
                            <option value="income">Income</option>
                            <option value="expense">Expense</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
                        <select id="category" name="category" value={formData.category} onChange={handleChange} className={selectClasses}>
                            {TRANSACTION_CATEGORIES[formData.type].map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Amount</label>
                    <input type="number" id="amount" name="amount" value={formData.amount} onChange={handleChange} min="0.01" step="0.01" className={inputClasses} required />
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                    <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows="3" className={inputClasses} required></textarea>
                </div>
                <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date</label>
                    <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} className={inputClasses} required />
                </div>
                
                <div className="flex items-center justify-end gap-4 pt-4 border-t dark:border-gray-700">
                    <Link to="/my-transactions" className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500 dark:border-gray-500 transition-colors">
                        Cancel
                    </Link>
                    <button type="submit" disabled={loading} className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-primary-400 transition-all duration-300 transform hover:scale-105">
                        {loading ? <LoadingSpinner /> : 'Update Transaction'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateTransaction;
