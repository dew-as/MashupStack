import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        isAuthenticated: false,
        error: null,
    },
    reducers: {
        registerUser: (state, action) => {
            // Simulated registration logic
            state.error = null;
            window.localStorage.setItem('user', JSON.stringify(action.payload));
        },
        loginUser: (state, action) => {
            const { email, password } = action.payload;
            // Simulated login logic
            const storedUser = JSON.parse(window.localStorage.getItem('user'));
            if (storedUser && storedUser.email === email && storedUser.password === password) {
                state.user = storedUser;
                state.isAuthenticated = true;
            } else {
                state.error = 'Invalid credentials';
            }
        },
        removeUser: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            window.localStorage.removeItem('user');
        },
        setUserFromLocalStorage: (state) => {
            const user = window.localStorage.getItem('user');
            if (user) {
                state.user = JSON.parse(user);
                state.isAuthenticated = true;
            } else {
                state.user = null;
                state.isAuthenticated = false;
            }
        },
        clearError: (state) => {
            state.error = null;
        }
    },
});

export const { setUser, removeUser, setUserFromLocalStorage, registerUser, loginUser, clearError } = authSlice.actions;

export default authSlice.reducer;