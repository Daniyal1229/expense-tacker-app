import React, { createContext, useReducer, useEffect } from 'react';
import { register, login } from '../utils/api';

const AuthContext = createContext();

const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('name', action.payload.user.name);
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
            };
        case 'LOGOUT':
            localStorage.removeItem('token');
            return {
                ...state,
                user: null,
                token: null,
            };
        default:
            return state;
    }
};

const initialState = {
    user: null,
    token: localStorage.getItem('token'),
};

const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // decode token to get user data
            const user = JSON.parse(atob(token.split('.')[1]));
            dispatch({ type: 'LOGIN', payload: { token, user } });
        }
    }, []);

    const handleRegister = async (formData) => {
        try {
            const { data } = await register(formData);
            dispatch({ type: 'LOGIN', payload: data });
        } catch (error) {
            console.error(error);
        }
    };

    const handleLogin = async (formData) => {
        try {
            const { data } = await login(formData);
            dispatch({ type: 'LOGIN', payload: data });
        } catch (error) {
            console.error(error);
        }
    };

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' });
    };

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                token: state.token,
                handleRegister,
                handleLogin,
                handleLogout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
