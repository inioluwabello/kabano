/* Core */
import { PageSliceState } from '@/lib/interfaces'
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'


const initialState: PageSliceState = {
    theme: 'light',
    isLeftPaneVisible: true,
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
        }
    },
})