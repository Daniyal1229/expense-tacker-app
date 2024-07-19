import React, { useState, useContext } from 'react';
import { ExpenseContext } from '../context/ExpenseContext';

const ExpenseForm = ({ expense, setEditing }) => {
    const { handleAddExpense, handleUpdateExpense } = useContext(ExpenseContext);
    const [formData, setFormData] = useState(
        expense || { date: '', amount: '', category: '', description: '' }
    );

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (expense) {
            handleUpdateExpense(expense._id, formData);
            setEditing(false);
        } else {
            handleAddExpense(formData);
            window.location.assign("/dashboard")
        }
        setFormData({ date: '', amount: '', category: '', description: '' });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
            />
            <input
                type="number"
                name="amount"
                placeholder="Amount"
                value={formData.amount}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="category"
                placeholder="Category"
                value={formData.category}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
            />
            <button type="submit">{expense ? 'Update' : 'Add'} Expense</button>
        </form>
    );
};

export default ExpenseForm;
