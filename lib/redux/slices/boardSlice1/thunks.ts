import { createAppAsyncThunk } from '@/lib/redux/createAppAsyncThunk'
import { putNewBoard } from "./asyncTasks";

export const createNewBoardAsync = createAppAsyncThunk(
    'board/createNewBoardAsync',
    async (payload: { title: string }) => {
        return putNewBoard(payload);
    }
);
