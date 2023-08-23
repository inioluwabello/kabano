import addData from "@/lib/firebase/firestore/addData";
import { deleteDocumentById, deleteFromArray, deleteWhereMultiple } from "@/lib/firebase/firestore/deleteData";
import { getCollectionWhere } from "@/lib/firebase/firestore/getData";
import { archiveBoardStatus, updateToArrayInDocument, updateWhere } from "@/lib/firebase/firestore/updateData";
import { IBoard, IStatus, ITask, IAsyncResult, WhereClause } from "@/lib/interfaces";
import { nanoid } from "@reduxjs/toolkit";

const BOARD_COLLECTION = 'boards'
const TASK_COLLECTION = 'tasks'

// BOARDS
export const putNewBoard = async (payload: { title: string; userId:string; isArchived: boolean }) => {
  try {
    // TODO: Add boards with userId
    const { id, data } = await addData(BOARD_COLLECTION, generateBoardId(payload.title), payload);
    const board: IBoard = { ...data, id }
    return board;
  } catch (error) {
    console.error('Error creating a new task:', error);
    throw error;
  }
};

export const createNewStatus = async (payload: { title: string; color: string, boardId: string }) => {
  try {
    // TODO: Add boards with userId
    const status: IStatus = {
      color: payload.color,
      id: nanoid(),
      isArchived: false,
      status: payload.title,
    }
    const result = (await updateToArrayInDocument(
      BOARD_COLLECTION,
      payload.boardId,
      'statuses',
      status));

    return { success: result.success, status, error: result.error };
  } catch (error) {
    console.error('Error creating a new task:', error);
    return { success: false, error };
  }
};

export const fetchBoards = async (userId: string): Promise<IAsyncResult> => {
  try {

    const userClause: WhereClause = {
      field: 'userId',
      comparison: '==',
      value: userId
    }
    const archivedClause: WhereClause = {
      field: 'isArchived',
      comparison: '==',
      value: false
    }
    const { success, data, error } = (await getCollectionWhere(BOARD_COLLECTION, [userClause, archivedClause]))
    if (data) {
      let result: IBoard[] = data!.map(r => ({
        id: r.id, ...r.data
      }))

      return { data: result, success, error };
    } else {
      return { success, error };
    }
  } catch (error) {
    return { success: false, error };
  }
}

export const deleteBoard = async (boardId: string): Promise<IAsyncResult> => {
  try {

    const boardComparison: WhereClause = {
      field: 'boardId',
      comparison: '==',
      value: boardId
    };

    // delete from tasks
    let result1 = (await deleteWhereMultiple(TASK_COLLECTION, [boardComparison]))

    // delete status from board.statuses array
    let result2 = (await deleteDocumentById(BOARD_COLLECTION, boardId));

    return {
      success: (result1.success ? result1.success : false) && (result2.success ? result2.success : false),
      data: boardId,
      error: { error1: result1.error, error2: result2.error }
    };
  } catch (error) {
    // Handle network or other errors here
    console.error("Error deleting tasks:", error);
    return { success: false, error };
  }
}


// TASKS
export const putNewTask = async (payload: {
  task: ITask
}) => {
  try {
    const { id, data } = await addData(TASK_COLLECTION, nanoid(), payload.task);
    const task: ITask = { ...data, id }
    return task;
  } catch (error) {
    console.error('Error creating a new task:', error);
    throw error;
  }
};

export const fetchBoardTasks = async (boardId: string): Promise<IAsyncResult> => {
  try {

    const whereClause: WhereClause[] = [{
      field: 'boardId',
      comparison: '==',
      value: boardId
    },
    {
      field: 'isArchived',
      comparison: '==',
      value: false
    }]
    const { success, data, error } = (await getCollectionWhere(TASK_COLLECTION, whereClause));
    if (data) {
      let result: ITask[] = data!.map(r => ({
        id: r.id, ...r.data
      }))

      return { data: result, success, error };
    } else {
      return { success, error };
    }
  } catch (error) {
    return { success: false, error };
  }
};

export const deleteSingleTask = async (taskId: string): Promise<any> => {
  try {
    const { data, success, error } = (await deleteDocumentById(TASK_COLLECTION, taskId))
    return { data, success, error };
  } catch (error) {
    console.error("Error deleting task:", error);
    return { success: false, error };
  }
};

export const deleteMultipleTasksByStatus = async (boardId: string, status: string): Promise<any> => {
  try {

    const boardComparison: WhereClause = {
      field: 'boardId',
      comparison: '==',
      value: boardId
    };

    // delete from tasks
    let result1: boolean = (await deleteWhereMultiple(TASK_COLLECTION, [boardComparison,
      {
        field: 'status',
        comparison: '==',
        value: status
      }])).success!

    // delete status from board.statuses array
    let result2: boolean = (await deleteFromArray(BOARD_COLLECTION, [boardComparison], status)).success!;

    return { success: result1 && result2, boardId, status };
  } catch (error) {
    // Handle network or other errors here
    console.error("Error deleting tasks:", error);
    return { success: false, error };
  }
};

export const updateTaskStatusByStatus = async (boardId: string, oldStatus: string, newStatus: string): Promise<any> => {
  try {
    let result: boolean = (await updateWhere(TASK_COLLECTION, [{
      field: 'boardId',
      comparison: '==',
      value: boardId
    },
    {
      field: 'status',
      comparison: '==',
      value: oldStatus
    }], 'status', newStatus)).success!
    return { success: result, oldStatus, newStatus };
  } catch (error) {
    // Handle network or other errors here
    console.error("Error updating tasks by status:", error);
    return { success: false, error };
  }
};

export const updateTaskStatusById = async (taskId: string, status: string): Promise<any> => {
  try {
    let result: boolean = (await updateWhere(TASK_COLLECTION, [
      {
        field: 'id',
        comparison: '==',
        value: taskId
      }], 'status', status)).success!
    return { success: result, taskId, status };
  } catch (error) {
    // Handle network or other errors here
    console.error("Error updating tasks by status:", error);
    return { success: false, error };
  }
};

export const archiveMultipleTasksByStatus = async (boardId: string, status: IStatus): Promise<any> => {
  try {

    const boardComparison: WhereClause = {
      field: 'boardId',
      comparison: '==',
      value: boardId
    };

    let result1: boolean = (await updateWhere(TASK_COLLECTION, [boardComparison, {
      field: 'status',
      comparison: '==',
      value: status
    }], 'isArchived', true)).success!

    let result2: boolean = (await archiveBoardStatus(BOARD_COLLECTION, boardComparison, status.id)).success!;

    console.log(`result1: ${result1}`)
    console.log(`result2: ${result2}`)

    return { success: result1 && result2, boardId, status };
  } catch (error) {
    // Handle network or other errors here
    console.error("Error archiving tasks:", error);
    return { success: false, error };
  }
};



// UTILS
const generateBoardId = (title: string) => {
  return title.trim().toLocaleLowerCase().replace(/ /g, '_')
}









// export const putNewTask = async (payload: {task: ITask, boardId: string}) => {
//   try {
//     // Assuming you have a function to create a new task in your backend
//     const response = await fetch(`${API_URL}/api/boards/${payload.boardId}/tasks`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         ...payload.task
//       }),
//     });

//     if (!response.ok) {
//       throw new Error('Error creating a new task');
//     }

//     const newTask = await response.json();
//     return newTask;
//   } catch (error) {
//     console.error('Error creating a new task:', error);
//     throw error;
//   }
// };

// export const deleteTaskByStatus = async (payload: { boardId: string; status: string }) => {
//   try {
//     // Assuming you have a function to delete tasks by status in your backend
//     const response = await fetch(`${API_URL}/api/boards/${payload.boardId}/tasks/status/${payload.status}`, {
//       method: 'DELETE',
//       headers: { 'Content-Type': 'application/json' },
//     });

//     if (!response.ok) {
//       throw new Error('Error deleting tasks by status');
//     }

//     const remainingTasks = await response.json();
//     return remainingTasks;
//   } catch (error) {
//     console.error('Error deleting tasks by status:', error);
//     throw error;
//   }
// };

// export const archiveTaskByStatus = async (payload: { boardId: string; status: string }) => {
//   try {
//     // Assuming you have a function to delete tasks by status in your backend
//     const response = await fetch(`${API_URL}/api/boards/${payload.boardId}/tasks/archive/${payload.status}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//     });

//     if (!response.ok) {
//       throw new Error('Error deleting tasks by status');
//     }

//     const remainingTasks = await response.json();
//     return remainingTasks;
//   } catch (error) {
//     console.error('Error deleting tasks by status:', error);
//     throw error;
//   }
// };

// export const deleteBoard = async (payload: { boardId: string }) => {
//   try {
//     // Assuming you have a function to delete tasks by status in your backend
//     const response = await fetch(`${API_URL}/api/boards/${payload.boardId}`, {
//       method: 'DELETE',
//       headers: { 'Content-Type': 'application/json' },
//     });

//     if (!response.ok) {
//       throw new Error('Error deleting tasks by status');
//     }

//     const { message, boards } = await response.json();
//     return { message, boards, deletedBoardId: payload.boardId };
//   } catch (error) {
//     console.error('Error deleting tasks by status:', error);
//     throw error;
//   }
// };

// export const updateTaskStatus = async (payload: { taskId: string; status: string }) => {
//   try {
//     const response = await fetch(`${API_URL}/api/tasks/${payload.taskId}/status/${payload.status}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//     });

//     if (!response.ok) {
//       throw new Error('Error updating task status');
//     }

//     const task = await response.json();
//     return task;
//   } catch (error) {
//     console.error('Error updating task status:', error);
//     throw error;
//   }
// };

// export const updateTaskByStatus = async (
//   payload: {
//     boardId: string, oldStatus: string, newStatus: string, color?: string
//   }) => {
//   try {
//     const response =
//       await fetch(`${API_URL}/api/boards/${payload.boardId}/status/${payload.oldStatus}/${payload.newStatus}/${payload.color}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//     });

//     if (!response.ok) {
//       throw new Error('Error updating task status');
//     }

//     return await response.json();
//   } catch (error) {
//     console.error('Error updating task status:', error);
//     throw error;
//   }
// };

// export const deleteTask = async (payload: { taskId: string }) => {
//   try {
//     // Assuming you have a function to delete tasks by status in your backend
//     const response = await fetch(`${API_URL}/api/tasks/${payload.taskId}`, {
//       method: 'DELETE',
//       headers: { 'Content-Type': 'application/json' },
//     });

//     if (!response.ok) {
//       throw new Error('Error deleting task');
//     }

//     const { message } = await response.json();
//     return { message, deletedTaskId: payload.taskId };
//   } catch (error) {
//     console.error('Error deleting task:', error);
//     throw error;
//   }
// };

// export const putNewStatus = async (payload: { status: string; color: string; boardId: string }) => {
//   try {
//     // Assuming you have a function to create a new task in your backend
//     const response = await fetch(`${API_URL}/api/boards/${payload.boardId}/statuses`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         status: payload.status,
//         color: payload.color,
//       }),
//     });

//     if (!response.ok) {
//       throw new Error('Error creating a new status');
//     }

//     const { board } = await response.json();
//     return { board };
//   } catch (error) {
//     console.error('Error creating a new task:', error);
//     throw error;
//   }
// };