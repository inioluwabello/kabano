import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BoardSliceState, IBoard, ITask, IAsyncResult } from '@/lib/interfaces';
import { archiveMultipleTasksByStatusAsync, createNewBoardAsync, createNewStatusAsync, createNewTaskAsync, deleteBoardAsync, deleteMultipleTasksByStatusAsync, deleteSingleTaskAsync, getBoardsAsync, getBoardTasksAsync, updateTaskStatusByIdAsync, updateTaskStatusByStatusAsync } from './thunks';

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
  },
  extraReducers: (builder) => {
    builder
      // BOARDS
      .addCase(createNewBoardAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createNewBoardAsync.fulfilled, (state, action: PayloadAction<IBoard>) => {
        state.status = 'idle';
        state.boards.push(action.payload);
        state.selectedBoard = action.payload
        state.tasks = [];
      })
      .addCase(createNewStatusAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createNewStatusAsync.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = 'idle';
        console.log(action.payload)
        if (action.payload.success === true) {
          // update selectedBoard
          if (!state.selectedBoard?.statuses) {
            state.selectedBoard!.statuses = [];
          }
          state.selectedBoard?.statuses.push(action.payload.status)

          // update boards
          const boardIndex = state.boards.findIndex(b => b.id === state.selectedBoard?.id);
          state.boards[boardIndex] = state.selectedBoard!;
        }
      })
      .addCase(getBoardsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getBoardsAsync.fulfilled, (state, action: PayloadAction<IAsyncResult>) => {

        const { success, error, data } = action.payload;
        if (success === true) {
          state.boards = data as IBoard[];
          state.selectedBoard = state.boards.length > 0 ? state.boards[0] : undefined;
          return;
        }

        if (error) {
          console.log(error)
        }

        state.status = 'idle';
      })
      .addCase(deleteBoardAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteBoardAsync.fulfilled, (state, action: PayloadAction<IAsyncResult>) => {

        state.status = 'idle';

        const { success, error, data } = action.payload;
        if (success === true) {
          const deletedBoardId = data as string;

          // select a new board either one above or below deleted board, else set selected board to empty
          const boardIndex = state.boards.findIndex(board => board.id === deletedBoardId);
          if (boardIndex === -1) {}
          else if (boardIndex === 0 && state.boards.length > 1) { state.selectedBoard = state.boards[1] }
          else if (boardIndex === 0 && state.boards.length === 1) { state.selectedBoard = undefined }
          else if (boardIndex > 0) { state.selectedBoard = state.boards[boardIndex - 1] }

          state.boards = state.boards.filter(board => board.id !== deletedBoardId);
          return;
        }

        if (error) {
          console.log(error)
        }
      })


      // TASKS
      .addCase(getBoardTasksAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getBoardTasksAsync.fulfilled, (state, action: PayloadAction<IAsyncResult>) => {

        state.status = 'idle';
        const { success, error, data } = action.payload;
        if (success === true) {
          state.tasks = data as ITask[];
          return;
        }

        if (error) {
          console.log(error)
        }
      })

      .addCase(createNewTaskAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createNewTaskAsync.fulfilled, (state, action: PayloadAction<ITask>) => {
        state.status = 'idle';
        state.tasks.push(action.payload);
      })

      .addCase(deleteSingleTaskAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteSingleTaskAsync.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = 'idle';
        if (action.payload.success === true) {
          state.tasks = state.tasks.filter(t => t.id !== action.payload.taskId)
        }
      })

      .addCase(updateTaskStatusByStatusAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateTaskStatusByStatusAsync.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = 'idle';
        if (action.payload.success === true) {
          const statusIndex = state.selectedBoard?.statuses.findIndex(t => t.status === action.payload.oldStatus)
          if (statusIndex !== -1) {
            state.selectedBoard!.statuses[statusIndex!].status = action.payload.newStatus;
          }
        }
      })

      .addCase(updateTaskStatusByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateTaskStatusByIdAsync.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = 'idle';
        if (action.payload.success === true) {
          const taskIndex = state.tasks.findIndex(t => t.id === action.payload.taskId)
          if (taskIndex !== -1) {
            state.tasks[taskIndex!].status = action.payload.status;
          }
        }
      })

      .addCase(deleteMultipleTasksByStatusAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteMultipleTasksByStatusAsync.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = 'idle';
        if (action.payload.success === true) {
          state.tasks = state.tasks.filter(t => t.status !== action.payload.status)
        }
      })

      .addCase(archiveMultipleTasksByStatusAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(archiveMultipleTasksByStatusAsync.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = 'idle';
        if (action.payload.success === true) {
          state.tasks = state.tasks.filter(t => t.status !== action.payload.status)
        }
      })


    // .addCase(archiveTaskInStatusAsync.pending, (state) => {
    //   state.status = 'loading';
    // })
    // .addCase(archiveTaskInStatusAsync.fulfilled, (state, action) => {
    //   state.status = 'idle';
    //   const { board, tasks } = action.payload;
    //   state.selectedBoard = board;
    //   state.tasks = tasks;
    // })

    // .addCase(deleteBoardAsync.pending, (state) => {
    //   state.status = 'loading';
    // })
    // .addCase(deleteBoardAsync.fulfilled, (state, action: PayloadAction<DeleteBoardResult>) => {
    //   state.status = 'idle';
    //   state.boards = action.payload.boards;

    //   // Check if the deleted board was the selected board
    //   if (state.selectedBoard && state.selectedBoard.id === action.payload.deletedBoardId) {
    //     state.selectedBoard = undefined;
    //     state.tasks = [];
    //   }
    // })

    // .addCase(updateTaskStatusAsync.pending, (state) => {
    //   state.status = 'loading';
    // })
    // .addCase(updateTaskStatusAsync.fulfilled, (state, action: PayloadAction<ITask>) => {
    //   state.status = 'idle';

    //   const taskIndex = state.tasks.findIndex((t) => t.id === action.payload.id);
    //   if (taskIndex !== -1) {
    //     state.tasks[taskIndex] = action.payload
    //   }
    // })

    // .addCase(updateTaskByStatusAsync.pending, (state) => {
    //   state.status = 'loading';
    // })
    // .addCase(updateTaskByStatusAsync.fulfilled, (state, action) => {
    //   state.status = 'idle';
    //   const { board, tasks } = action.payload;
    //   state.selectedBoard = board;
    //   state.tasks = tasks;
    // })

    // .addCase(deleteTaskAsync.pending, (state) => {
    //   state.status = 'loading';
    // })
    // .addCase(deleteTaskAsync.fulfilled, (state, action) => {
    //   state.status = 'idle';
    //   const { deletedTaskId, message } = action.payload;
    //   state.tasks = state.tasks.filter((f) => f.id !== deletedTaskId)
    // })
  },
});
