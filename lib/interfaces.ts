
export interface BoardSliceState {
    boards: IBoard[];
    selectedBoard?: IBoard;
    tasks: ITask[];
    status: 'idle' | 'loading' | 'failed';
}

export interface ModalSliceState {
    isOpen: boolean
}

export interface PageSliceState {
    theme: string;
    isLeftPaneVisible: boolean;
}

export interface IBoard {
    _id: string;
    title: string;
    statuses: IStatus[];
}

export interface IStatus {
    _id: string;
    status: string;
    color: string;
    isArchived: boolean;
    userId: string
}

export interface ITask {
    _id?: string;
    title: string;
    description: string;
    dueDate?: Date;
    priority?: string;
    status: string;
    assignees?: string[];
    comments?: string[];
    subTasks: ISubTask[];
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

export interface DeleteBoardResult{
    boards: IBoard[]
    deletedBoardId: string
    message: string
}