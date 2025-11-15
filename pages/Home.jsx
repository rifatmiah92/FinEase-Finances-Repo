
import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useTransaction } from '../hooks/useTransaction';

const OverviewCard = ({ title, value, icon, colorClass, isCurrency = true, delay }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center transition-all duration-300 hover:shadow-2xl hover:scale-105 animate-fadeInUp" style={{ animationDelay: delay }}>
        <div className={`mx-auto mb-4 h-12 w-12 rounded-full flex items-center justify-center ${colorClass.bg}`}>
            {icon}
        </div>
        <h3 className="text-lg font-semibold text-gray-500 dark:text-gray-400">{title}</h3>
        <p className={`text-3xl font-bold mt-2 ${colorClass.text}`}>
            {isCurrency && value < 0 ? '-' : ''}
            {isCurrency ? '$' : ''}
            {isCurrency ? Math.abs(value).toFixed(2) : value}
        </p>
    </div>
);

const TipCard = ({ title, description, icon, delay }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 animate-fadeInUp" style={{ animationDelay: delay }}>
        <div className="flex items-center gap-4">
            <div className="flex-shrink-0 h-12 w-12 rounded-lg flex items-center justify-center bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900 dark:to-secondary-900">
                {icon}
            </div>
            <div>
                <h3 className="font-bold text-lg text-gray-800 dark:text-white">{title}</h3>
            </div>
        </div>
        <p className="mt-4 text-gray-600 dark:text-gray-300">{description}</p>
    </div>
);

const Home = () => {
    const { user } = useAuth();
    const { transactions } = useTransaction();

    const userTransactions = transactions.filter(t => user && t.email === user.email);

    const totalIncome = userTransactions
        .filter(t => t.type === 'income')
        .reduce((acc, t) => acc + t.amount, 0);
    const totalExpense = userTransactions
        .filter(t => t.type === 'expense')
        .reduce((acc, t) => acc + t.amount, 0);
    const totalBalance = totalIncome - totalExpense;
    
    const overviewCards = [
        { title: "Total Balance", value: totalBalance, colorClass: { text: totalBalance >= 0 ? 'text-green-500' : 'text-red-500', bg: totalBalance >= 0 ? 'bg-green-100 dark:bg-green-900/50' : 'bg-red-100 dark:bg-red-900/50' }, icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg> },
        { title: "Total Income", value: totalIncome, colorClass: { text: 'text-green-500', bg: 'bg-green-100 dark:bg-green-900/50' }, icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg> },
        { title: "Total Expense", value: totalExpense, colorClass: { text: 'text-red-500', bg: 'bg-red-100 dark:bg-red-900/50' }, icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg> }
    ];

    const tipCards = [
        { title: "The 50/30/20 Rule", description: "Allocate 50% of your income to needs, 30% to wants, and 20% to savings and debt repayment.", icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 15.536c-1.171 1.952-3.07 1.952-4.242 0-1.172-1.953-1.172-5.119 0-7.072 1.171-1.952 3.07-1.952 4.242 0 1.172 1.953 1.172 5.119 0 7.072z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" /></svg> },
        { title: "Track Every Penny", description: "Use FinEase to log all your expenses. Awareness is the first step to making better financial decisions.", icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg> },
        { title: "Set Financial Goals", description: "Define short-term and long-term goals, like saving for a vacation or retirement, to stay motivated.", icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg> }
    ];


    return (
        <div className="space-y-16">
            {/* Banner Section */}
            <section className="text-center bg-gradient-to-tr from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-800 dark:to-black p-12 rounded-2xl shadow-xl overflow-hidden">
                <div>
                    <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
                        Take Control of Your Finances
                    </h1>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                        Your journey to financial freedom starts here. FinEase helps you track, budget, and save with ease.
                    </p>
                </div>
            </section>

            {/* Overview Section */}
            {user && (
                <section>
                    <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white animate-fadeInUp" style={{ animationDelay: '0.3s' }}>Financial Overview</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {overviewCards.map((card, index) => (
                           <OverviewCard key={card.title} {...card} delay={`${0.4 + index * 0.1}s`} />
                        ))}
                    </div>
                </section>
            )}

            {/* Budgeting Tips */}
            <section>
                <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white animate-fadeInUp" style={{ animationDelay: '0.8s' }}>Budgeting Tips</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {tipCards.map((card, index) => (
                         <TipCard key={card.title} {...card} delay={`${0.9 + index * 0.1}s`} />
                    ))}
                </div>
            </section>

            {/* Why Financial Planning Matters */}
            <section className="animate-fadeInUp" style={{ animationDelay: '1.2s' }}>
                <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
                  <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">Why Financial Planning Matters</h2>
                  <div className="max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    <p className="mb-4">
                      Financial planning is the process of managing your financial resources to achieve your personal economic satisfaction. It involves setting financial goals, creating a budget, managing debt, and saving for retirement.
                    </p>
                    <p>
                      With a solid plan, you can reduce financial stress, build wealth over time, and protect yourself and your family from unexpected events. FinEase provides the tools you need to build and maintain that plan effectively.
                    </p>
                  </div>
                </div>
            </section>
        </div>
    );
};

export default Home;