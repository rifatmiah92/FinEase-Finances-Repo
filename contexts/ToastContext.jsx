import React, { createContext, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';

export const ToastContext = createContext();

let id = 1;

const Toast = ({ message, type, onClose }) => {
    const baseClasses = "flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 transition-all duration-300 animate-fade-in-right";
    const typeClasses = {
        success: "text-green-500 bg-green-100 dark:bg-gray-700 dark:text-green-400",
        error: "text-red-500 bg-red-100 dark:bg-gray-700 dark:text-red-400",
        info: "text-blue-500 bg-blue-100 dark:bg-gray-700 dark:text-blue-400"
    };
    const Icon = ({ type }) => {
        if (type === 'success') {
            return (
                <div className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 ${typeClasses.success} rounded-lg`}>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                </div>
            );
        }
        if (type === 'error') {
            return (
                <div className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 ${typeClasses.error} rounded-lg`}>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </div>
            );
        }
        return null;
    };
    
    React.useEffect(() => {
        const timer = setTimeout(onClose, 5000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className={baseClasses} role="alert">
            <Icon type={type} />
            <div className="ml-3 text-sm font-normal">{message}</div>
            <button type="button" onClick={onClose} className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700">
                <span className="sr-only">Close</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </button>
        </div>
    );
};


// Fix: Added JSDoc type annotation to explicitly define the component as a React Functional Component that accepts children. This resolves a TypeScript error in App.tsx where the 'children' prop was not being correctly inferred for components imported from .jsx files.
/** @type {React.FC<React.PropsWithChildren<{}>>} */
export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const showToast = useCallback((message, type = 'info') => {
        setToasts((prevToasts) => [...prevToasts, { id: id++, message, type }]);
    }, []);
    
    const removeToast = useCallback((id) => {
        setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {createPortal(
                <div className="fixed top-5 right-5 z-[100]">
                    {toasts.map((toast) => (
                        <Toast
                            key={toast.id}
                            message={toast.message}
                            type={toast.type}
                            onClose={() => removeToast(toast.id)}
                        />
                    ))}
                </div>,
                document.body
            )}
        </ToastContext.Provider>
    );
};