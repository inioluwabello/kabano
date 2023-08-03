import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BoardSliceState, IBoard, NewBoardResult } from '@/lib/interface';
import { createNewBoardAsync } from './thunks'

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
      .addCase(createNewBoardAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createNewBoardAsync.fulfilled, (state, action: PayloadAction<NewBoardResult>) => {
        state.status = 'idle';
        state.boards = action.payload.boards;
        state.selectedBoard = action.payload.newBoard
        state.tasks = [];
      })
    },
});