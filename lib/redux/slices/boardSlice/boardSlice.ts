/* Core */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

/* Instruments */
import { incrementAsync } from './thunks'
import { BoardSliceState, IBoard } from '@/lib/interface'

const initialState: BoardSliceState = {
    boards: [],
    tasks: [],
    status: 'idle',
};

export const boardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        setBoards: (state, action: PayloadAction<IBoard[]>) => {
            state.boards = action.payload;
        },
        selectBoard: (state, action: PayloadAction<IBoard | undefined>) => {
            state.selectedBoard = action.payload;
        },
        resetBoard: (state) => {
            state.selectedBoard = undefined;
            state.tasks = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(incrementAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(incrementAsync.fulfilled, (state, action) => {
                state.status = 'idle'
            })
    },
})
