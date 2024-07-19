import React from 'react';
import Login from '../components/Login';
import ExpenseForm from '../components/ExpenseForm';

const ExpensePage = () => {
    return (
        <div className='page'>
            <h1>Expense</h1>
            <ExpenseForm />
        </div>
    );
};

export default ExpensePage;
