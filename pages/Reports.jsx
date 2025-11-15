
import React, { useMemo, useState, useEffect } from 'react';
import { useTransaction } from '../hooks/useTransaction';
import { useAuth } from '../hooks/useAuth';

const CategoryBar = ({ category, amount, percentage, color, delay }) => {
    const [width, setWidth] = useState(0);

    useEffect(() => {
        // Trigger the animation after component mounts
        const timer = setTimeout(() => setWidth(percentage), 100);
        return () => clearTimeout(timer);
    }, [percentage]);

    return (
        <div className="mb-4 animate-fadeInUp" style={{ animationDelay: delay }}>
            <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{category}</span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">${amount.toFixed(2)}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700">
                <div 
                    className={`${color} h-4 rounded-full transition-all duration-1000 ease-out`} 
                    style={{ width: `${width}%` }}
                ></div>
            </div>
        </div>
    );
};

const Reports = () => {
    const { transactions } = useTransaction();
    const { user } = useAuth();

    const userTransactions = useMemo(() => {
        if (!user) return [];
        return transactions.filter(t => t.email === user.email);
    }, [transactions, user]);

    const reportData = useMemo(() => {
        const income = userTransactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
        const expense = userTransactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
        const balance = income - expense;

        const expenseByCategory = userTransactions
            .filter(t => t.type === 'expense')
            .reduce((acc, t) => {
                acc[t.category] = (acc[t.category] || 0) + t.amount;
                return acc;
            }, {});

        return {
            totalIncome: income,
            totalExpense: expense,
            totalBalance: balance,
            expenseByCategory: Object.entries(expenseByCategory).sort((a, b) => b[1] - a[1]) // Sort by amount desc
        };
    }, [userTransactions]);
    
    const barColors = [
        'bg-primary-500', 'bg-secondary-500', 'bg-red-500', 'bg-orange-400', 
        'bg-yellow-400', 'bg-lime-500', 'bg-green-500', 'bg-cyan-500', 'bg-indigo-500',
        'bg-purple-500', 'bg-pink-500'
    ];


    return (
        <div className="space-y-8">
            <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white animate-fadeInUp">Financial Reports</h1>
            
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center transition-all duration-300 hover:shadow-2xl hover:scale-105 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
                    <h3 className="text-lg font-semibold text-gray-500 dark:text-gray-400">Total Income</h3>
                    <p className="text-3xl font-bold mt-2 text-green-500">
                        +${reportData.totalIncome.toFixed(2)}
                    </p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center transition-all duration-300 hover:shadow-2xl hover:scale-105 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                    <h3 className="text-lg font-semibold text-gray-500 dark:text-gray-400">Total Expense</h3>
                    <p className="text-3xl font-bold mt-2 text-red-500">
                        -${reportData.totalExpense.toFixed(2)}
                    </p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center transition-all duration-300 hover:shadow-2xl hover:scale-105 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
                    <h3 className="text-lg font-semibold text-gray-500 dark:text-gray-400">Net Balance</h3>
                    <p className={`text-3xl font-bold mt-2 ${reportData.totalBalance >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        ${reportData.totalBalance.toFixed(2)}
                    </p>
                </div>
            </div>

            {/* Expense Breakdown */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
                <h2 className="text-2xl font-bold mb-6">Expense Breakdown by Category</h2>
                {reportData.expenseByCategory.length > 0 && reportData.totalExpense > 0 ? (
                    <div>
                        {reportData.expenseByCategory.map(([category, amount], index) => (
                             <CategoryBar 
                                key={category}
                                category={category}
                                amount={amount}
                                percentage={(amount / reportData.totalExpense) * 100}
                                color={barColors[index % barColors.length]}
                                delay={`${0.5 + index * 0.05}s`}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 dark:text-gray-400 text-center py-8">No expense data available to generate a report.</p>
                )}
            </div>
        </div>
    );
};

export default Reports;