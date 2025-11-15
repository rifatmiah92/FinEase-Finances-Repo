import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';
import LoadingSpinner from '../components/LoadingSpinner';

const Profile = () => {
    const { user, updateUserProfile, loading: authLoading } = useAuth();
    const { showToast } = useToast();
    const [isEditing, setIsEditing] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false); // Local loading state for form submission
    const [formData, setFormData] = useState({ name: '', photoURL: '' });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                photoURL: user.photoURL || '',
            });
        }
    }, [user]);

    if (authLoading && !user) {
        return <div className="flex justify-center mt-10"><LoadingSpinner /></div>;
    }

    if (!user) {
        return <div className="text-center mt-10"><p>User not found.</p></div>
    }
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsUpdating(true);
        try {
            await updateUserProfile(formData);
            showToast('Profile updated successfully!', 'success');
            setIsEditing(false);
        } catch(error) {
            console.error(error);
            showToast(error.message || 'Failed to update profile.', 'error');
        } finally {
            setIsUpdating(false);
        }
    };

    const inputClasses = "mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white";

    return (
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden mt-10 animate-fadeInUp">
            <div className="p-8">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white">My Profile</h1>
                    <button 
                        onClick={() => setIsEditing(!isEditing)} 
                        className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-primary-600 to-secondary-500 hover:from-primary-700 hover:to-secondary-600 rounded-md transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                    >
                        {isEditing ? 'Cancel' : 'Update Profile'}
                    </button>
                </div>
                
                <div className="md:flex md:items-start md:space-x-8">
                    <div className="flex-shrink-0 mx-auto md:mx-0 relative">
                        <img className="w-32 h-32 rounded-full object-cover shadow-lg" src={formData.photoURL || `https://i.pravatar.cc/150?u=${user.email}`} alt={formData.name} />
                    </div>
                    <div className="mt-6 md:mt-0 flex-grow">
                        <div key={isEditing ? 'editing' : 'viewing'} className="animate-fadeIn">
                            {!isEditing ? (
                                <div className="space-y-6">
                                    <div>
                                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Name</label>
                                        <p className="text-2xl font-semibold text-gray-800 dark:text-white">{user.name}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</label>
                                        <p className="text-lg text-gray-600 dark:text-gray-300">{user.email}</p>
                                    </div>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className={inputClasses}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="photoURL" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Photo URL</label>
                                        <input
                                            type="url"
                                            id="photoURL"
                                            name="photoURL"
                                            value={formData.photoURL}
                                            onChange={handleChange}
                                            className={inputClasses}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                                        <p className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm bg-gray-100 dark:bg-gray-600 dark:text-gray-300">{user.email}</p>
                                    </div>
                                    <button type="submit" disabled={isUpdating} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-green-400 transition-colors">
                                        {isUpdating ? <LoadingSpinner /> : 'Save Changes'}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;