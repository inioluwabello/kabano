/* Core */
import { PageSliceState } from '@/lib/interfaces'
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { logoutAsync, signUpAsync } from './thunks'


const initialState: PageSliceState = {
    theme: 'light',
    isLeftPaneVisible: true,
    status: 'idle'
}

export const pageSlice = createSlice({
    name: 'page',
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<string>) => {
            state.theme = action.payload
        },
        setLeftPaneVisibility: (state, action: PayloadAction<boolean>) => {
            state.isLeftPaneVisible = action.payload
        },
        resetLoginError: (state) => {
            state.loginError = undefined;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(logoutAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(logoutAsync.fulfilled, (state) => {
                state.status = 'idle';
            })

            .addCase(signUpAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(signUpAsync.fulfilled, (state, action: PayloadAction<string>) => {
                state.status = 'idle';
                state.signUpError = action.payload;
            })
        }
})