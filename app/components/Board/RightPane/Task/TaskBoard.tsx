import './TaskBoard.css'
import { memo, useEffect } from "react"
import { getBoardTasksAsync, selectTasks, useDispatch, useSelector } from "@/lib/redux"
import { IBoard } from "@/lib/interfaces"
import { TaskColumns } from './TaskColumns'
import { NewTask } from './NewTask'

export const TaskBoard = memo(({ board }: { board?: IBoard }) => {

    const tasks = useSelector(selectTasks);

    const dispatch = useDispatch();
    useEffect(() => {
        console.log(board)
        if (board) {
            dispatch(getBoardTasksAsync(board.id))
        }
    }, [board])

    return (
        <div className="task-board">
            {
                !board &&
                <div className="empty flex">
                    <div className="empty-board">
                        <div className="default-message alt-text">
                            The board is empty.
                            Create a new Board or select a Board to get started
                        </div>

                        <button className="btn pry-bg">+ Add new Board</button>
                    </div>
                </div>
            }
            {
                board &&
                <div className={`flex ${board ? '' : 'no-selected'} task-columns`}>
                    {
                        board.statuses &&
                        board.statuses!.map(status => {
                            return (
                                <TaskColumns key={status.status}
                                    board={board}
                                    tasks={tasks}
                                    status={status}
                                    statusArray={board.statuses!.filter(s => s.isArchived !== true)} />
                            )
                        })}

                    <NewTask board={board} statusArray={board.statuses!} />

                    <div style={{ width: "2em" }}></div>
                </div>
            }
        </div>
    )
})