
import React, { useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTransaction } from '../hooks/useTransaction';

const DetailItem = ({ label, value, valueClass = '', isFirst = false, isLast = false }) => (
    <div className={`px-6 py-4 sm:grid sm:grid-cols-3 sm:gap-4 ${!isFirst && 'border-t border-gray-200 dark:border-gray-700'}`}>
        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</dt>
        <dd className={`mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2 ${valueClass}`}>{value}</dd>
    </div>
);

const TransactionDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { transactions } = useTransaction();

    const transaction = useMemo(() => {
        return transactions.find(t => t.id.toString() === id);
    }, [id, transactions]);

    const categoryTotal = useMemo(() => {
        if (!transaction) return 0;
        return transactions
            .filter(t => t.category === transaction.category && t.type === transaction.type && t.email === transaction.email)
            .reduce((sum, t) => sum + t.amount, 0);
    }, [transaction, transactions]);

    if (!transaction) {
        return (
            <div className="text-center py-10">
                <h2 className="text-2xl font-semibold">Transaction not found.</h2>
                <Link to="/my-transactions" className="mt-4 inline-block text-primary-600 hover:underline">
                    Back to My Transactions
                </Link>
            </div>
        );
    }
    
    const { type, category, amount, description, date, name, email } = transaction;

    return (
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-xl rounded-2xl overflow-hidden">
            <div className="px-6 py-5 bg-gradient-to-r from-primary-500 to-secondary-500 text-white">
                <h1 className="text-2xl font-bold leading-6">Transaction Details</h1>
                <p className="mt-1 max-w-2xl text-sm text-primary-100">Detailed information about the transaction.</p>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-600">
                <dl>
                    <DetailItem label="Transaction ID" value={id} />
                    <DetailItem label="Type" value={type.charAt(0).toUpperCase() + type.slice(1)} valueClass={`font-semibold px-2 py-0.5 inline-block rounded-full ${type === 'income' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'}`} />
                    <DetailItem label="Category" value={category} />
                    <DetailItem label="Amount" value={`$${amount.toFixed(2)}`} valueClass={`font-bold text-xl ${type === 'income' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`} />
                    <DetailItem label="Description" value={description} />
                    <DetailItem label="Date" value={new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} />
                    <div className="px-6 py-4 sm:grid sm:grid-cols-3 sm:gap-4 border-t border-gray-200 dark:border-gray-700">
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Total for {category} ({type})</dt>
                        <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2 font-semibold">
                            ${categoryTotal.toFixed(2)}
                        </dd>
                    </div>
                    <DetailItem label="User Name" value={name} />
                    <DetailItem label="User Email" value={email} />
                </dl>
            </div>
             <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 flex justify-end gap-3">
                <button onClick={() => navigate(-1)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white dark:bg-gray-600 dark:text-gray-200 border border-gray-300 dark:border-gray-500 rounded-md hover:bg-gray-50 dark:hover:bg-gray-500 transition-colors">
                    Go Back
                </button>
                <Link to={`/transaction/update/${id}`} className="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-md shadow-sm hover:shadow-lg transition-all transform hover:scale-105">
                    Update Transaction
                </Link>
            </div>
        </div>
    );
};

export default TransactionDetails;
