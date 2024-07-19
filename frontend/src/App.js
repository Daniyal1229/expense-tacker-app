import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NavBar from './components/NavBar';
import { AuthProvider } from './context/AuthContext';
import { ExpenseProvider } from './context/ExpenseContext';
import ExpensePage from './pages/ExpensePage';
import HomePage from './components/HomePage';
import { Home } from './pages/Home';

const App = () => {
    return (
        <AuthProvider>
            <ExpenseProvider>
                <NavBar />
                <div className="container">
                    <Routes>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/expense" element={<ExpensePage />} />
                        <Route path="/" element={<HomePage />} />
                    </Routes>
                </div>
            {/* <HomePage/> */}
            </ExpenseProvider>
        </AuthProvider>
    );
};

export default App;
