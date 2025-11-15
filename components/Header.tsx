
import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../hooks/useAuth';

const SunIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M12 18a6 6 0 100-12 6 6 0 000 12z" />
    </svg>
);

const MoonIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
);

const Header = () => {
    const { theme, toggleTheme } = useTheme();
    const { user, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const profileRef = useRef(null);
    const mobileMenuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const navLinkClasses = ({ isActive }) =>
        `px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
            isActive
                ? 'bg-primary-500 text-white shadow-md'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
        }`;

    const mobileNavLinkClasses = ({ isActive }) =>
        `block px-3 py-2 rounded-md text-base font-medium transition-colors ${
            isActive
                ? 'bg-primary-500 text-white'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
        }`;

    const mainNavLinks = (
        <>
            <NavLink to="/" className={navLinkClasses} end>Home</NavLink>
            {user && (
                <>
                    <NavLink to="/add-transaction" className={navLinkClasses}>Add Transaction</NavLink>
                    <NavLink to="/my-transactions" className={navLinkClasses}>My Transactions</NavLink>
                    <NavLink to="/reports" className={navLinkClasses}>Reports</NavLink>
                </>
            )}
        </>
    );

    const mobileNavLinks = (
        <>
            <NavLink to="/" className={mobileNavLinkClasses} onClick={() => setIsMenuOpen(false)} end>Home</NavLink>
            {user && (
                <>
                    <NavLink to="/add-transaction" className={mobileNavLinkClasses} onClick={() => setIsMenuOpen(false)}>Add Transaction</NavLink>
                    <NavLink to="/my-transactions" className={mobileNavLinkClasses} onClick={() => setIsMenuOpen(false)}>My Transactions</NavLink>
                    <NavLink to="/reports" className={mobileNavLinkClasses} onClick={() => setIsMenuOpen(false)}>Reports</NavLink>
                </>
            )}
        </>
    );

    return (
        <header className="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center gap-2">
                             <div className="h-9 w-9 flex items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 shadow-md">
                                <span className="font-bold text-xl text-white tracking-tighter">FE</span>
                            </div>
                            <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent">FinEase</span>
                        </Link>
                        <nav className="hidden md:block ml-10">
                            <div className="flex items-baseline space-x-4">{mainNavLinks}</div>
                        </nav>
                    </div>

                    <div className="hidden md:block">
                        <div className="ml-4 flex items-center md:ml-6 gap-4">
                            <button onClick={toggleTheme} className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white transition-colors">
                                {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
                            </button>

                            {user ? (
                                <div className="relative" ref={profileRef}>
                                    <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                        <img className="h-8 w-8 rounded-full object-cover" src={user.photoURL || `https://i.pravatar.cc/150?u=${user.email}`} alt={user.name} />
                                    </button>
                                    <div 
                                        className={`origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none transition ease-out duration-100 ${isProfileOpen ? 'transform opacity-100 scale-100' : 'transform opacity-0 scale-95 pointer-events-none'}`}
                                    >
                                        <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-600">
                                            <p className="text-sm text-gray-700 dark:text-gray-200 font-semibold truncate">{user.name}</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                                        </div>
                                        <Link to="/profile" onClick={() => setIsProfileOpen(false)} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 w-full text-left">My Profile</Link>
                                        <button onClick={() => { logout(); setIsProfileOpen(false); }} className="block px-4 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-600 w-full text-left">Log out</button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-2">
                                    <Link to="/login" className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-primary-600 to-secondary-500 hover:from-primary-700 hover:to-secondary-600 rounded-md transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg">Login</Link>
                                    <Link to="/register" className="px-4 py-2 text-sm font-medium text-primary-600 bg-primary-100 hover:bg-primary-200 dark:text-gray-800 dark:bg-primary-300 dark:hover:bg-primary-400 rounded-md transition-colors">Sign up</Link>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} type="button" className="bg-gray-100 dark:bg-gray-700 inline-flex items-center justify-center p-2 rounded-md text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            <span className="sr-only">Open main menu</span>
                            {isMenuOpen ? (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {isMenuOpen && (
                <div className="md:hidden animate-fadeIn" ref={mobileMenuRef}>
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {mobileNavLinks}
                    </div>
                    <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
                        {user ? (
                            <div className="px-5">
                                <div className="flex items-center">
                                    <img className="h-10 w-10 rounded-full object-cover" src={user.photoURL || `https://i.pravatar.cc/150?u=${user.email}`} alt={user.name} />
                                    <div className="ml-3">
                                        <p className="text-base font-medium leading-none text-gray-800 dark:text-white">{user.name}</p>
                                        <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">{user.email}</p>
                                    </div>
                                </div>
                                <div className="mt-3 px-2 space-y-1">
                                     <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">My Profile</Link>
                                    <button onClick={() => { logout(); setIsMenuOpen(false); }} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-500 hover:bg-gray-200 dark:hover:bg-gray-700">
                                        Log out
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="px-2 space-y-2">
                                <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium bg-gradient-to-r from-primary-600 to-secondary-500 text-white hover:opacity-90">Login</Link>
                                <Link to="/register" onClick={() => setIsMenuOpen(false)} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium bg-primary-100 text-primary-800 hover:bg-primary-200 dark:text-gray-800 dark:bg-primary-300 dark:hover:bg-primary-400">Sign up</Link>
                            </div>
                        )}
                         <div className="mt-3 px-5">
                            <button onClick={toggleTheme} className="w-full flex items-center justify-center p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                                {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
                                <span className="ml-2">Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;