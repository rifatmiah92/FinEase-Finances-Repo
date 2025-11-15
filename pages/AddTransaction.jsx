import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTransaction } from '../hooks/useTransaction';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';
import { TRANSACTION_CATEGORIES } from '../constants';
import LoadingSpinner from '../components/LoadingSpinner';

// Icons for a richer UI
const IncomeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    </svg>
);

const ExpenseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
    </svg>
);


const AddTransaction = () => {
    const [type, setType] = useState('expense');
    const [category, setCategory] = useState(TRANSACTION_CATEGORIES.expense[0]);
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

    const { addTransaction, loading } = useTransaction();
    const { user } = useAuth();
    const { showToast } = useToast();
    const navigate = useNavigate();

    useEffect(() => {
        // Reset category when type changes
        setCategory(TRANSACTION_CATEGORIES[type][0]);
    }, [type]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!type || !category || !amount || !description || !date) {
            showToast('Please fill in all fields.', 'error');
            return;
        }
        if (parseFloat(amount) <= 0) {
            showToast('Amount must be positive.', 'error');
            return;
        }

        const newTransaction = {
            type,
            category,
            amount: parseFloat(amount),
            description,
            date,
            email: user.email,
            name: user.name,
        };
        
        addTransaction(newTransaction);
        showToast('Transaction added successfully!', 'success');
        navigate('/my-transactions');
    };

    const baseInputClasses = "block w-full rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 dark:focus:ring-offset-gray-900 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white";
    const withIconInputClasses = `${baseInputClasses} pl-10 pr-4 py-3 border border-gray-300 focus:ring-primary-500 focus:border-primary-500`;
    const selectClasses = `${baseInputClasses} pl-3 pr-10 py-3 border border-gray-300 focus:ring-primary-500 focus:border-primary-500`;

    return (
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl transition-all duration-500 animate-fadeInUp">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-extrabold bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent">
                    Log a New Transaction
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mt-2">Keep your finances up to date.</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Type Selector */}
                <div className="animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Transaction Type</label>
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            type="button"
                            onClick={() => setType('income')}
                            className={`flex items-center justify-center p-4 rounded-lg text-lg font-bold border-2 transition-all duration-300 transform hover:scale-105 ${
                                type === 'income' 
                                ? 'bg-green-500 border-green-600 text-white shadow-lg' 
                                : 'bg-gray-100 border-gray-200 text-gray-700 hover:bg-green-100 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-green-900/50'
                            }`}
                        >
                            <IncomeIcon /> Income
                        </button>
                        <button
                            type="button"
                            onClick={() => setType('expense')}
                            className={`flex items-center justify-center p-4 rounded-lg text-lg font-bold border-2 transition-all duration-300 transform hover:scale-105 ${
                                type === 'expense' 
                                ? 'bg-red-500 border-red-600 text-white shadow-lg' 
                                : 'bg-gray-100 border-gray-200 text-gray-700 hover:bg-red-100 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-red-900/50'
                            }`}
                        >
                            <ExpenseIcon /> Expense
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Category */}
                    <div className="animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                        <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} className={selectClasses}>
                            {TRANSACTION_CATEGORIES[type].map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    {/* Amount */}
                    <div className="relative animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
                        <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Amount</label>
                         <div className="absolute inset-y-0 left-0 top-6 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">$</span>
                        </div>
                        <input type="number" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} min="0.01" step="0.01" className={withIconInputClasses} placeholder="0.00" required />
                    </div>
                </div>

                {/* Description */}
                <div className="animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                    <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows="3" className={`${baseInputClasses} px-4 py-3 border border-gray-300 focus:ring-primary-500 focus:border-primary-500`} placeholder="e.g., Monthly groceries" required></textarea>
                </div>

                {/* Date */}
                <div className="relative animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date</label>
                     <div className="absolute inset-y-0 left-0 top-6 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                           <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} className={withIconInputClasses} required />
                </div>

                 {/* User Info Display */}
                <div className="pt-4 border-t dark:border-gray-700 animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
                     <div className="flex items-center space-x-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <img className="h-10 w-10 rounded-full object-cover" src={user.photoURL || `https://i.pravatar.cc/150?u=${user.email}`} alt={user.name} />
                        <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="animate-fadeInUp" style={{ animationDelay: '0.7s' }}>
                    <button type="submit" disabled={loading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-lg font-semibold text-white bg-gradient-to-r from-primary-600 to-secondary-500 hover:from-primary-700 hover:to-secondary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-75 dark:focus:ring-offset-gray-800 transition-all duration-300 transform hover:scale-105 hover:shadow-primary-500/50">
                        {loading ? <LoadingSpinner /> : 'Add Transaction'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddTransaction;