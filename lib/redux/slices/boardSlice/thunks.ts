import { ITask } from '@/lib/interfaces';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { archiveTaskByStatus, deleteBoard, deleteTask, deleteTaskByStatus, fetchBoardTasks, fetchBoards, 
  putNewBoard, putNewStatus, putNewTask, updateTaskByStatus, updateTaskStatus } from './asyncTasks';

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























export const getBoardTasksAsync = createAsyncThunk(
  "board/fetchBoardTasksAsync",
  async (id: string) => {
    const response = await fetchBoardTasks(id);
    return response;
  }
);

export const createNewTaskAsync = createAsyncThunk(
  "board/createNewTaskAsync",
  async (payload: { task: ITask, boardId: string }) => {
    return putNewTask(payload);
  }
);

export const deleteTaskInStatusAsync = createAsyncThunk(
  "board/deleteTaskInStatusAsync",
  async (payload: { boardId: string, status: string }) => {
    return deleteTaskByStatus(payload);
  }
);

export const archiveTaskInStatusAsync = createAsyncThunk(
  "board/archiveTaskInStatusAsync",
  async (payload: { boardId: string, status: string }) => {
    return archiveTaskByStatus(payload);
  }
);

export const deleteBoardAsync = createAsyncThunk(
  "board/deleteBoardAsync",
  async (boardId: string) => {
    const payload = {
      boardId: boardId,
    };
    return deleteBoard(payload);
  }
);

export const updateTaskStatusAsync = createAsyncThunk(
  "board/updateTaskStatusAsync",
  async (payload: { taskId: string, status: string }) => {
    return updateTaskStatus(payload);
  }
);

export const updateTaskByStatusAsync = createAsyncThunk(
  "board/updateTaskByStatusAsync",
  async (payload: {
    boardId: string,
    oldStatus: string,
    newStatus: string,
    color?: string,
  }) => {
    return updateTaskByStatus(payload);
  }
);

export const deleteTaskAsync = createAsyncThunk(
  "board/deleteTaskAsync",
  async (payload: { taskId: string }) => {
    return deleteTask(payload);
  }
);

export const createNewStatusAsync = createAsyncThunk(
  "board/createNewStatusAsync",
  async (payload: { status: string, color: string, boardId: string }) => {
    return putNewStatus(payload);
  }
);
