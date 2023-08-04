import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BoardSliceState, DeleteBoardResult, IBoard, ITask, NewBoardResult } from '@/lib/interfaces';
import { archiveTaskInStatusAsync, createNewBoardAsync, createNewStatusAsync, createNewTaskAsync, deleteBoardAsync, deleteTaskAsync, deleteTaskInStatusAsync, getBoardsAsync, getBoardTasksAsync, updateTaskByStatusAsync, updateTaskStatusAsync } from './thunks';


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
      .addCase(createNewBoardAsync.fulfilled, (state, action: PayloadAction<IBoard>) => {
        state.status = 'idle';
        state.boards.push(action.payload);
        state.selectedBoard = action.payload
        state.tasks = [];
      })

      .addCase(getBoardsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getBoardsAsync.fulfilled, (state, action: PayloadAction<IBoard[]>) => {
        state.status = 'idle';
        state.boards = action.payload;
        state.selectedBoard = state.boards[0];
      })






      
      .addCase(getBoardTasksAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getBoardTasksAsync.fulfilled, (state, action: PayloadAction<ITask[]>) => {
        state.status = 'idle';
        state.tasks = action.payload;
      })

      .addCase(createNewTaskAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createNewTaskAsync.fulfilled, (state, action: PayloadAction<ITask>) => {
        state.status = 'idle';
        state.tasks.push(action.payload);
      })

      .addCase(deleteTaskInStatusAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteTaskInStatusAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const { board, tasks } = action.payload;
        state.selectedBoard = board;
        state.tasks = tasks;
      })

      .addCase(archiveTaskInStatusAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(archiveTaskInStatusAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const { board, tasks } = action.payload;
        state.selectedBoard = board;
        state.tasks = tasks;
      })

      .addCase(deleteBoardAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteBoardAsync.fulfilled, (state, action: PayloadAction<DeleteBoardResult>) => {
        state.status = 'idle';
        state.boards = action.payload.boards;

        // Check if the deleted board was the selected board
        if (state.selectedBoard && state.selectedBoard.id === action.payload.deletedBoardId) {
          state.selectedBoard = undefined;
          state.tasks = [];
        }
      })

      .addCase(updateTaskStatusAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateTaskStatusAsync.fulfilled, (state, action: PayloadAction<ITask>) => {
        state.status = 'idle';

        const taskIndex = state.tasks.findIndex((t) => t.id === action.payload.id);
        if (taskIndex !== -1) {
          state.tasks[taskIndex] = action.payload
        }
      })

      .addCase(updateTaskByStatusAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateTaskByStatusAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const { board, tasks } = action.payload;
        state.selectedBoard = board;
        state.tasks = tasks;
      })

      .addCase(deleteTaskAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteTaskAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const { deletedTaskId, message } = action.payload;
        state.tasks = state.tasks.filter((f) => f.id !== deletedTaskId)
      })

      .addCase(createNewStatusAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createNewStatusAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const { board } = action.payload;
        state.selectedBoard = board;
      })
  },
});
