
import React from 'react';
import { HashRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';
import { TransactionProvider } from './contexts/TransactionContext';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AddTransaction from './pages/AddTransaction';
import MyTransactions from './pages/MyTransactions';
import UpdateTransaction from './pages/UpdateTransaction';
import TransactionDetails from './pages/TransactionDetails';
import Reports from './pages/Reports';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';

const AppLayout = () => {
  const location = useLocation();
  const isNotFoundPage = location.pathname === '/404';

  if (isNotFoundPage) {
    return <Outlet />;
  }
  
  return (
    <div className="flex flex-col min-h-screen text-gray-800 dark:text-gray-200">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <TransactionProvider>
            <HashRouter>
              <Routes>
                <Route element={<AppLayout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  {/* Fix: Refactored protected routes to use a single layout route with ProtectedRoute component. */}
                  <Route element={<ProtectedRoute />}>
                    <Route path="/add-transaction" element={<AddTransaction />} />
                    <Route path="/my-transactions" element={<MyTransactions />} />
                    <Route path="/transaction/update/:id" element={<UpdateTransaction />} />
                    <Route path="/transaction/:id" element={<TransactionDetails />} />
                    <Route path="/reports" element={<Reports />} />
                    <Route path="/profile" element={<Profile />} />
                  </Route>
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </HashRouter>
          </TransactionProvider>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;