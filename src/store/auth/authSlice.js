import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'not-authenticated',    // authenticated-ADMIN  -- authenticated -- not-authenticated -- checking
        user: {},
        errorMessage: null,
    },
    reducers: {
        onChecking: ( state ) => {
            state.status = 'checking';
            state.errorMessage = null;
        },
        onLogin: ( state, { payload } ) => {
            state.status = 'authenticated';
            state.user = payload;
            state.errorMessage = null;
        },
        onLogout: (state, { payload }) => {
          state.status = 'not-authenticated';
          state.user = null;
          state.errorMessage = payload || null;
        },
        clearErrorMessage: ( state ) => {
            state.errorMessage = null;
        }
    }
});


// Action creators are generated for each case reducer function
export const { onLogin, onLogout, onChecking, clearErrorMessage } = authSlice.actions;
