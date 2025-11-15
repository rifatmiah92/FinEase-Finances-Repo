
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 text-center px-4">
            <h1 className="text-9xl font-extrabold text-primary-600 dark:text-primary-400 animate-bounce">404</h1>
            <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mt-4">Page Not Found</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
                Sorry, the page you are looking for does not exist.
            </p>
            <Link
                to="/"
                className="mt-8 px-6 py-3 text-lg font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-md transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
                Go back to Home
            </Link>
        </div>
    );
};

export default NotFound;
