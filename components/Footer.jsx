
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const socialLinks = [
        { name: 'Facebook', href: '#', icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg> },
        { name: 'Twitter', href: '#', icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg> },
        { name: 'Instagram', href: '#', icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.012-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218 1.791.465 2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.08 2.525c.636-.247 1.363-.416 2.427-.465C9.53 2.013 9.884 2 12.315 2zm-1.002 6.37c-1.545 0-2.791 1.246-2.791 2.79s1.246 2.791 2.791 2.791 2.79-1.246 2.79-2.791-1.245-2.79-2.79-2.79zm7.168-3.446c-.54 0-.979.439-.979.98s.439.979.979.979.979-.439.979-.979-.439-.98-.979-.98zm-2.846 1.482A5.572 5.572 0 0012.315 6.5a5.572 5.572 0 00-5.572 5.572 5.572 5.572 0 005.572 5.572 5.572 5.572 0 005.572-5.572c0-1.875-.91-3.54-2.29-4.595z" clipRule="evenodd" /></svg> },
        { name: 'LinkedIn', href: '#', icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg> }
    ];
    return (
        <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="md:flex md:items-center md:justify-between">
                    <div className="flex justify-center md:order-2">
                         <Link to="/" className="flex items-center gap-2">
                            <div className="h-9 w-9 flex items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 shadow-md">
                                <span className="font-bold text-xl text-white tracking-tighter">FE</span>
                            </div>
                            <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent">FinEase</span>
                        </Link>
                    </div>
                    <div className="mt-8 md:mt-0 md:order-1">
                        <p className="text-center text-base text-gray-500 dark:text-gray-400">
                            &copy; {new Date().getFullYear()} FinEase. All rights reserved.
                        </p>
                    </div>
                </div>
                <div className="mt-8 md:flex md:items-center md:justify-between">
                    <div className="flex justify-center space-x-6 md:order-3">
                        {socialLinks.map((item) => (
                            <a key={item.name} href={item.href} className="text-gray-400 hover:text-secondary-500 dark:hover:text-secondary-400 transition-colors duration-300">
                                <span className="sr-only">{item.name}</span>
                                {item.icon}
                            </a>
                        ))}
                    </div>
                    <div className="mt-8 md:mt-0 md:order-2 flex justify-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                       <Link to="#" className="hover:underline hover:text-primary-500 transition-colors">Terms & Conditions</Link>
                       <Link to="#" className="hover:underline hover:text-primary-500 transition-colors">Contact</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
