import { IBoard } from "@/lib/interfaces"
import './TaskBoard.css'
import { useEffect } from "react"
import { getBoardTasksAsync, selectTasks, useDispatch, useSelector } from "@/lib/redux"
import { TaskColumns } from "./TaskColumns"

export const TaskBoard = ({ board }: { board?: IBoard }) => {

    const tasks = useSelector(selectTasks);

    const dispatch = useDispatch();
    useEffect(() => {
        if (board) {
            dispatch(getBoardTasksAsync(board.id))
        }
    }, [tasks])

    return (
        <div className="task-boards flex">
            {
                !board && 
                <div className="empty-board">
                    <div className="default-message alt-text">
                        The board is empty. 
                        Create a new Board or select a Board to get started
                    </div>

                    <button className="btn pry-bg">+ Add new Board</button>
                </div>
            }

            {
                board && 
                tasks &&
                <div className="empty-board">
                    <div className="default-message alt-text">
                        The board is empty.
                        Create a column to get started
                    </div>

                    <button className="btn pry-bg">+ Add new Column</button>
                </div>
            }

            {
                board &&
                tasks &&
                <div className="task-columns flex">
                    <TaskColumns />
                </div>
            }
        </div>
    )
}