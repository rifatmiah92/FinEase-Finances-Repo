
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTransaction } from '../hooks/useTransaction';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';
import LoadingSpinner from '../components/LoadingSpinner';

const TransactionCard = ({ transaction, onDelete, delay }) => {
    const { id, type, category, amount, description, date } = transaction;
    const formattedDate = new Date(date).toLocaleDateString();
    const amountColor = type === 'income' ? 'text-green-500' : 'text-red-500';
    const amountSign = type === 'income' ? '+' : '-';

    return (
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-lg flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:scale-105 animate-fadeInUp" style={{ animationDelay: delay }}>
            <div>
                <div className="flex justify-between items-start mb-2">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${type === 'income' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'}`}>
                        {category}
                    </span>
                    <p className={`text-2xl font-bold ${amountColor}`}>{`${amountSign}$${amount.toFixed(2)}`}</p>
                </div>
                <p className="text-gray-700 dark:text-gray-200 font-semibold truncate">{description}</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{formattedDate}</p>
            </div>
            <div className="flex justify-end items-center gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Link to={`/transaction/${id}`} className="px-3 py-1 text-sm font-medium text-primary-600 bg-primary-100 hover:bg-primary-200 dark:text-gray-800 dark:bg-primary-300 dark:hover:bg-primary-400 rounded-md transition-colors">Details</Link>
                <Link to={`/transaction/update/${id}`} className="px-3 py-1 text-sm font-medium text-yellow-600 bg-yellow-100 hover:bg-yellow-200 dark:text-gray-800 dark:bg-yellow-300 dark:hover:bg-yellow-400 rounded-md transition-colors">Update</Link>
                <button onClick={() => onDelete(id)} className="px-3 py-1 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-md transition-colors">Delete</button>
            </div>
        </div>
    );
};

const MyTransactions = () => {
    const { transactions, loading, deleteTransaction } = useTransaction();
    const { user } = useAuth();
    const { showToast } = useToast();
    const [sortBy, setSortBy] = useState('date-desc');

    const userTransactions = useMemo(() => {
        if (!user) return [];
        return transactions.filter(t => t.email === user.email);
    }, [transactions, user]);

    const sortedTransactions = useMemo(() => {
        const sorted = [...userTransactions];
        const [key, order] = sortBy.split('-');
        
        sorted.sort((a, b) => {
            if (key === 'date') {
                return order === 'asc' 
                    ? new Date(a.date) - new Date(b.date) 
                    : new Date(b.date) - new Date(a.date);
            }
            if (key === 'amount') {
                return order === 'asc' ? a.amount - b.amount : b.amount - a.amount;
            }
            return 0;
        });
        return sorted;
    }, [userTransactions, sortBy]);

    const handleDelete = (id) => {
        // Using a more professional confirmation dialog could be an improvement (e.g., custom modal)
        if (window.confirm('Are you sure you want to delete this transaction?')) {
            deleteTransaction(id);
            showToast('Transaction deleted successfully!', 'success');
        }
    };

    if (loading && transactions.length === 0) {
        return <div className="flex justify-center mt-10"><LoadingSpinner /></div>;
    }

    return (
        <div>
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4 animate-fadeInUp">
                <h1 className="text-4xl font-bold text-gray-800 dark:text-white">My Transactions</h1>
                <div className="flex items-center gap-2">
                    <label htmlFor="sort" className="text-sm font-medium">Sort by:</label>
                    <select id="sort" value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="pl-3 pr-8 py-2 text-sm border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600">
                        <option value="date-desc">Date (Newest)</option>
                        <option value="date-asc">Date (Oldest)</option>
                        <option value="amount-desc">Amount (High to Low)</option>
                        <option value="amount-asc">Amount (Low to High)</option>
                    </select>
                </div>
            </div>

            {sortedTransactions.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {sortedTransactions.map((transaction, index) => (
                        <TransactionCard 
                            key={transaction.id} 
                            transaction={transaction} 
                            onDelete={handleDelete}
                            delay={`${index * 0.05}s`} 
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow-lg animate-fadeInUp">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">No transactions found.</h2>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">Get started by adding a new transaction!</p>
                    <Link to="/add-transaction" className="mt-6 inline-block px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-primary-600 to-secondary-500 hover:from-primary-700 hover:to-secondary-600 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg">
                        Add Transaction
                    </Link>
                </div>
            )}
        </div>
    );
};

export default MyTransactions;