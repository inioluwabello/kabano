import { IBoard, ITask } from "@/lib/interfaces";

const API_URL = "http://localhost:3001";

export const fetchBoardTasks = async (id: string): Promise<ITask[]> => {
  try {
    const response = await fetch(`${API_URL}/api/boards/${id}/tasks`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      // Handle internal server error or other non-successful responses here
      console.error(`Error fetching board tasks. Status: ${response.status}`);
      return [];
    }

    return await response.json();
  } catch (error) {
    // Handle network or other errors here
    console.error("Error fetching board tasks:", error);
    return [];
  }
};

export const fetchBoards = async (): Promise<IBoard[]> => {
  try {
    const response = await fetch(`${API_URL}/api/boards`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      // Handle internal server error or other non-successful responses here
      console.error(`Error fetching boards. Status: ${response.status}`);
      return [];
    }

    return await response.json();
  } catch (error) {
    // Handle network or other errors here
    console.error("Error fetching boards:", error);
    return [];
  }
};

export const putNewTask = async (payload: {task: ITask, boardId: string}) => {
  try {
    // Assuming you have a function to create a new task in your backend
    const response = await fetch(`${API_URL}/api/boards/${payload.boardId}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...payload.task
      }),
    });

    if (!response.ok) {
      throw new Error('Error creating a new task');
    }

    const newTask = await response.json();
    return newTask;
  } catch (error) {
    console.error('Error creating a new task:', error);
    throw error;
  }
};

export const deleteTaskByStatus = async (payload: { boardId: string; status: string }) => {
  try {
    // Assuming you have a function to delete tasks by status in your backend
    const response = await fetch(`${API_URL}/api/boards/${payload.boardId}/tasks/status/${payload.status}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error('Error deleting tasks by status');
    }

    const remainingTasks = await response.json();
    return remainingTasks;
  } catch (error) {
    console.error('Error deleting tasks by status:', error);
    throw error;
  }
};

export const archiveTaskByStatus = async (payload: { boardId: string; status: string }) => {
  try {
    // Assuming you have a function to delete tasks by status in your backend
    const response = await fetch(`${API_URL}/api/boards/${payload.boardId}/tasks/archive/${payload.status}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error('Error deleting tasks by status');
    }

    const remainingTasks = await response.json();
    return remainingTasks;
  } catch (error) {
    console.error('Error deleting tasks by status:', error);
    throw error;
  }
};

export const putNewBoard = async (payload: { title: string; }) => {
  try {
    // Assuming you have a function to create a new task in your backend
    const response = await fetch(`${API_URL}/api/boards`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: payload.title,
      }),
    });

    if (!response.ok) {
      throw new Error('Error creating a new board');
    }

    const { boards, newBoard } = await response.json();
    return { boards, newBoard };
  } catch (error) {
    console.error('Error creating a new task:', error);
    throw error;
  }
};

export const deleteBoard = async (payload: { boardId: string }) => {
  try {
    // Assuming you have a function to delete tasks by status in your backend
    const response = await fetch(`${API_URL}/api/boards/${payload.boardId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error('Error deleting tasks by status');
    }

    const { message, boards } = await response.json();
    return { message, boards, deletedBoardId: payload.boardId };
  } catch (error) {
    console.error('Error deleting tasks by status:', error);
    throw error;
  }
};

export const updateTaskStatus = async (payload: { taskId: string; status: string }) => {
  try {
    const response = await fetch(`${API_URL}/api/tasks/${payload.taskId}/status/${payload.status}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error('Error updating task status');
    }

    const task = await response.json();
    return task;
  } catch (error) {
    console.error('Error updating task status:', error);
    throw error;
  }
};

export const updateTaskByStatus = async (
  payload: { 
    boardId: string, oldStatus: string, newStatus: string, color?: string
  }) => {
  try {
    const response = 
      await fetch(`${API_URL}/api/boards/${payload.boardId}/status/${payload.oldStatus}/${payload.newStatus}/${payload.color}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error('Error updating task status');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating task status:', error);
    throw error;
  }
};

export const deleteTask = async (payload: { taskId: string }) => {
  try {
    // Assuming you have a function to delete tasks by status in your backend
    const response = await fetch(`${API_URL}/api/tasks/${payload.taskId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error('Error deleting task');
    }

    const { message } = await response.json();
    return { message, deletedTaskId: payload.taskId };
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};

export const putNewStatus = async (payload: { status: string; color: string; boardId: string }) => {
  try {
    // Assuming you have a function to create a new task in your backend
    const response = await fetch(`${API_URL}/api/boards/${payload.boardId}/statuses`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status: payload.status,
        color: payload.color,
      }),
    });

    if (!response.ok) {
      throw new Error('Error creating a new status');
    }

    const { board } = await response.json();
    return { board };
  } catch (error) {
    console.error('Error creating a new task:', error);
    throw error;
  }
};