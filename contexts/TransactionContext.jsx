import React, { createContext, useState } from 'react';

export const TransactionContext = createContext();

const mockTransactions = [
    { id: 1, type: 'income', category: 'Salary', amount: 5000, description: 'Monthly salary', date: new Date().toISOString(), email: 'john.doe@example.com', name: 'John Doe'},
    { id: 2, type: 'expense', category: 'Rent', amount: 1500, description: 'Apartment rent', date: new Date().toISOString(), email: 'john.doe@example.com', name: 'John Doe' },
    { id: 3, type: 'expense', category: 'Food', amount: 300, description: 'Groceries', date: new Date().toISOString(), email: 'jane.doe@example.com', name: 'Jane Doe' },
];


// Fix: Added JSDoc type annotation to explicitly define the component as a React Functional Component that accepts children. This resolves a TypeScript error in App.tsx where the 'children' prop was not being correctly inferred for components imported from .jsx files.
/** @type {React.FC<React.PropsWithChildren<{}>>} */
export const TransactionProvider = ({ children }) => {
    const [transactions, setTransactions] = useState(mockTransactions);
    const [loading, setLoading] = useState(false);

    const getTransactions = () => {
        // In a real app, you would filter by the logged-in user.
        return transactions;
    };
    
    const addTransaction = (transaction) => {
        setLoading(true);
        setTimeout(() => {
            const newTransaction = { ...transaction, id: Date.now() };
            setTransactions(prev => [newTransaction, ...prev]);
            setLoading(false);
        }, 500);
    };
    
    const updateTransaction = (updatedTransaction) => {
        setLoading(true);
        setTimeout(() => {
            setTransactions(prev => prev.map(t => t.id === updatedTransaction.id ? updatedTransaction : t));
            setLoading(false);
        }, 500);
    };
    
    const deleteTransaction = (id) => {
        setLoading(true);
        setTimeout(() => {
            setTransactions(prev => prev.filter(t => t.id !== id));
            setLoading(false);
        }, 500);
    };

    const value = {
        transactions,
        loading,
        getTransactions,
        addTransaction,
        updateTransaction,
        deleteTransaction
    };

    return <TransactionContext.Provider value={value}>{children}</TransactionContext.Provider>;
};