import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';
import LoadingSpinner from '../components/LoadingSpinner';

const GoogleIcon = () => (
    <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
        <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
        <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"/>
        <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.223 0-9.641-3.657-11.303-8.653l-6.571 4.819C9.656 39.663 16.318 44 24 44z"/>
        <path fill="#1976D2" d="M43.611 20.083H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C43.021 36.697 44 34.059 44 31c0-5.732-3.886-10.594-9.257-11.956c-.252-.063-.51-.115-.774-.161z"/>
    </svg>
);

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [photoURL, setPhotoURL] = useState('');
    const [password, setPassword] = useState('');
    const { register, loginWithGoogle, loading } = useAuth();
    const { showToast } = useToast();
    const navigate = useNavigate();

    const validatePassword = (password) => {
        const errors = [];
        if (password.length < 6) errors.push("Password must be at least 6 characters long.");
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const passwordErrors = validatePassword(password);
        if (passwordErrors.length > 0) {
            showToast(passwordErrors.join(' '), 'error');
            return;
        }
        if (!name || !email) {
             showToast('Name and Email are required.', 'error');
            return;
        }
        
        try {
            await register(name, email, photoURL, password);
            showToast('Registration successful!', 'success');
            navigate('/');
        } catch(error) {
            console.error(error);
            showToast(error.message || 'Failed to register.', 'error');
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await loginWithGoogle();
            showToast('Signed up with Google successfully!', 'success');
            navigate('/');
        } catch (error) {
            console.error(error);
            showToast(error.message || 'Failed to sign up with Google.', 'error');
        }
    };

    return (
         <div className="flex items-center justify-center py-12">
            <div className="mx-auto w-full max-w-md bg-white dark:bg-gray-800 p-8 shadow-xl rounded-2xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 animate-fadeInUp">
                <h2 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
                    Create your account
                </h2>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md -space-y-px">
                         <div className="animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                            <label htmlFor="name" className="sr-only">Name</label>
                            <input
                                id="name" name="name" type="text" required value={name} onChange={(e) => setName(e.target.value)}
                                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                placeholder="Full Name"
                            />
                        </div>
                        <div className="animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input
                                id="email-address" name="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                placeholder="Email address"
                            />
                        </div>
                        <div className="animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
                            <label htmlFor="photo-url" className="sr-only">Photo URL</label>
                            <input
                                id="photo-url" name="photoURL" type="url" value={photoURL} onChange={(e) => setPhotoURL(e.target.value)}
                                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                placeholder="Photo URL (optional)"
                            />
                        </div>
                        <div className="animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                id="password" name="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                placeholder="Password"
                            />
                        </div>
                    </div>
                    
                    <div className="animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
                        <button
                            type="submit" disabled={loading}
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-primary-600 to-secondary-500 hover:from-primary-700 hover:to-secondary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-75 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-primary-500/50"
                        >
                            {loading ? <LoadingSpinner /> : 'Sign up'}
                        </button>
                    </div>
                </form>

                 <div className="mt-6 animate-fadeInUp" style={{ animationDelay: '0.7s' }}>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                                Or continue with
                            </span>
                        </div>
                    </div>

                    <div className="mt-6">
                         <button
                            onClick={handleGoogleLogin}
                            disabled={loading}
                            className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 transition-colors"
                        >
                            <GoogleIcon />
                            <span>Sign up with Google</span>
                        </button>
                    </div>
                </div>

                <div className="mt-6 text-center animate-fadeInUp" style={{ animationDelay: '0.8s' }}>
                     <p className="text-sm text-gray-600 dark:text-gray-400">
                        Already have an account?{' '}
                        <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500 hover:underline">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;