import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) {
        req.headers.Authorization = token;
    }
    return req;
});

export const register = (formData) => API.post('/users/register', formData);
export const login = (formData) => API.post('/users/login', formData);

export const addExpense = (expenseData) => API.post('/expenses', expenseData);
export const getExpenses = () => API.get('/expenses');
export const updateExpense = (id, updatedData) => API.put(`/expenses/${id}`, updatedData);
export const deleteExpense = (id) => API.delete(`/expenses/${id}`);



