import { createAsyncThunk } from '@reduxjs/toolkit';
import { archiveMultipleTasksByStatus, createNewStatus, deleteMultipleTasksByStatus, deleteSingleTask, fetchBoardTasks, fetchBoards, putNewBoard, putNewTask, 
  updateTaskStatusById, 
  updateTaskStatusByStatus } from './asyncTasks';
import { ITask } from '@/lib/interfaces';

// BOARDS
export const createNewBoardAsync = createAsyncThunk(
  "board/createNewBoardAsync",
  async (payload: { title: string }) => {
    return putNewBoard(payload);
  }
);

export const getBoardsAsync = createAsyncThunk(
  "board/fetchBoardsAsync",
  async () => {
    const response = await fetchBoards();
    return response;
  }
);

export const createNewStatusAsync = createAsyncThunk(
  "board/createNewStatusAsync",
  async (payload: { title: string; color: string, boardId: string }) => {
    const response = await createNewStatus(payload);
    return response;
  }
);


// TASKS
export const createNewTaskAsync = createAsyncThunk(
  "board/createNewTaskAsync",
  async (payload: {
    task: ITask
  }) => {
    return putNewTask(payload);
  }
);

export const getBoardTasksAsync = createAsyncThunk(
  "board/getBoardTasksAsync",
  async (boardId: string) => {
    const response = await fetchBoardTasks(boardId);
    return response;
  }
);

export const deleteSingleTaskAsync = createAsyncThunk(
  "board/deleteSingleTaskAsync",
  async (taskId: string) => {
    const response = await deleteSingleTask(taskId);
    return response;
  }
);

export const deleteMultipleTasksByStatusAsync = createAsyncThunk(
  "board/deleteMultipleTasksByStatusAsync",
  async (payload: { boardId: string, status: string }) => {
    const response = await deleteMultipleTasksByStatus(payload.boardId, payload.status);
    return response;
  }
);

export const updateTaskStatusByStatusAsync = createAsyncThunk(
  "board/updateTaskStatusByStatusAsync",
  async (payload: { boardId: string, oldStatus: string, newStatus: string }) => {
    const response = await updateTaskStatusByStatus(payload.boardId, payload.oldStatus, payload.newStatus);
    return response;
  }
);

export const updateTaskStatusByIdAsync = createAsyncThunk(
  "board/updateTaskByIdAsync",
  async (payload: { taskId: string, status: string }) => {
    const response = await updateTaskStatusById(payload.taskId, payload.status);
    return response;
  }
);

export const archiveMultipleTasksByStatusAsync = createAsyncThunk(
  "board/archiveMultipleTasksByStatusAsync",
  async (payload: { boardId: string, status: string }) => {
    const response = await archiveMultipleTasksByStatus(payload.boardId, payload.status);
    return response;
  }
);


// export const deleteBoardAsync = createAsyncThunk(
//   "board/deleteBoardAsync",
//   async (boardId: string) => {
//     const payload = {
//       boardId: boardId,
//     };
//     return deleteBoard(payload);
//   }
// );

// export const createNewStatusAsync = createAsyncThunk(
//   "board/createNewStatusAsync",
//   async (payload: { status: string, color: string, boardId: string }) => {
//     return putNewStatus(payload);
//   }
// );
