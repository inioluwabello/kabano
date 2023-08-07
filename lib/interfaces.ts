import { WhereFilterOp } from "firebase/firestore";

export interface BoardSliceState {
    boards: IBoard[];
    selectedBoard?: IBoard;
    tasks: ITask[];
    status: 'idle' | 'loading' | 'failed';
}

export interface TaskSliceState {
    tasks: ITask[];
    status: 'idle' | 'loading' | 'failed';
}

export interface ModalSliceState {
    isOpen: boolean
}

export interface PageSliceState {
    theme: string;
    isLeftPaneVisible: boolean;
    status: string;
    loginError?: any;
    signUpError?: any;
}

export interface IBoard {
    id: string;
    title: string;
    statuses: IStatus[];
    isArchived: boolean;
    userId: string
}

export interface IStatus {
    id: string;
    status: string;
    color: string;
    isArchived: boolean;
}

export interface ITask {
    id?: string;
    title: string;
    description: string;
    dueDate?: Date;
    priority?: string;
    status: string;
    assignees?: string[];
    comments?: string[];
    subTasks: ISubTask[];
    isArchived: boolean;
}

export interface ISubTask {
    title: string,
    dueDate?: Date,
    isCompleted: boolean
}

export interface NewBoardResult {
    boards: IBoard[],
    newBoard: IBoard 
}

export interface DeleteBoardResult {
    boards: IBoard[]
    deletedBoardId: string
    message: string
}

export interface WhereClause { 
    field: string, 
    comparison: WhereFilterOp, 
    value:any 
}