import React, { createContext, useReducer, useEffect } from 'react';
import { addExpense, getExpenses, updateExpense, deleteExpense } from '../utils/api';

const ExpenseContext = createContext();

const expenseReducer = (state, action) => {
    switch (action.type) {
        case 'SET_EXPENSES':
            return action.payload;
        case 'ADD_EXPENSE':
            return [action.payload, ...state];
        case 'UPDATE_EXPENSE':
            return state.map((expense) =>
                expense._id === action.payload._id ? action.payload : expense
            );
        case 'DELETE_EXPENSE':
            return state.filter((expense) => expense._id !== action.payload);
        default:
            return state;
    }
};

const ExpenseProvider = ({ children }) => {
    const [expenses, dispatch] = useReducer(expenseReducer, []);

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const { data } = await getExpenses();
                dispatch({ type: 'SET_EXPENSES', payload: data });
            } catch (error) {
                console.error(error);
            }
        };
        fetchExpenses();
    }, []);

    const handleAddExpense = async (expenseData) => {
        try {
            const { data } = await addExpense(expenseData);
            dispatch({ type: 'ADD_EXPENSE', payload: data });
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpdateExpense = async (id, updatedData) => {
        try {
            const { data } = await updateExpense(id, updatedData);
            dispatch({ type: 'UPDATE_EXPENSE', payload: data });
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteExpense = async (id) => {
        try {
            await deleteExpense(id);
            dispatch({ type: 'DELETE_EXPENSE', payload: id });
        } catch (error) {
            console.error(error);
        }
    };
    

    return (
        <ExpenseContext.Provider
            value={{
                expenses,
                handleAddExpense,
                handleUpdateExpense,
                handleDeleteExpense,
            }}
        >
            {children}
        </ExpenseContext.Provider>
    );
};

export { ExpenseContext, ExpenseProvider };
