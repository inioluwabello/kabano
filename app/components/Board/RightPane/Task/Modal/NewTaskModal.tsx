import { IStatus, ITask } from "@/lib/interfaces";
import { createNewTaskAsync, modalSlice, selectTheme, useDispatch, useSelector } from "@/lib/redux";
import { useState } from "react"

export const NewTaskModal = ({ statusOptions, boardId }: { statusOptions: IStatus[], boardId: string }) => {

    const tsk: ITask = {
        title: 'Testing',
        description: 'Testing Description',
        subTasks: [{
            title: 'Sub Task 1',
            isCompleted: false
        },
        {
            title: 'Sub Task 2',
            isCompleted: false
        }],
        status: statusOptions[0].status,
        boardId: boardId,
        isArchived: false
    }
    const [task, setTask] = useState(tsk);

    const handleFormInput = (e: React.ChangeEvent<HTMLInputElement>, formField: string, index?: number) => {
        switch (formField) {
            case "title":
                setTask({ ...task, title: e.target.value });
                break;
            case "subtasks":
                const subTasks = task.subTasks;
                subTasks[index!] = {
                    title: e.target.value,
                    isCompleted: false
                }
                setTask({ ...task, subTasks: subTasks });
                break;
            default:
                return;

        }
    }

    const handleDescriptionInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTask({ ...task, description: e.target.value });
    }

    const handleFormChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTask({ ...task, status: e.target.value })
    }

    const removeSubTask = (index: number) => {
        const subTasks = [...task.subTasks];
        subTasks.splice(index, 1);
        setTask({ ...task, subTasks: subTasks })
    }

    const addSubTask = () => {
        const subTasks = [...task.subTasks];
        subTasks.push({ title: '', isCompleted: false })
        setTask({ ...task, subTasks: subTasks })
    }

    const createTaskHandler = () => {
        dispatch(createNewTaskAsync({ task }));
        dispatch(modalSlice.actions.setState(false))
    }

    const dispatch = useDispatch();
    const theme = useSelector(selectTheme);

    return (
        <div className="overlay flex">
            <div className="modal">
                <div className="space-between">
                    <div className="modal-title">Add New Task</div>
                    <img className="pointer close-btn" 
                        width={16} height={16} 
                        onClick={() => dispatch(modalSlice.actions.setState(false))} 
                        src={`/assets/icon-cross${theme === 'light' ? '-alt' : ''}.svg`} alt="" />
                </div>
                <div className="modal-body">
                    {/* Title */}
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title"
                        className="alt-text"
                        value={task.title}
                        placeholder="e.g Take Coffee break"
                        onChange={(e) => handleFormInput(e, 'title')} />

                    {/* Description */}
                    <label htmlFor="description">Description</label>
                    <textarea id="description"
                        className="alt-text no-resize"
                        rows={5}
                        value={task.description}
                        placeholder="e.g It's always good to take a break. This 15 minutes break will recharge the bateries a little."
                        onChange={(e) => handleDescriptionInput(e)} />

                    {/* Subtasks */}
                    <label htmlFor="subtasks">Subtasks</label>
                    {task.subTasks.map((subTask, index) => {
                        return <div key={index}>
                            <div className="flex v-align">
                                <input type="text" id="subtasks"
                                    className="alt-text"
                                    value={subTask.title}
                                    onChange={(e) => handleFormInput(e, 'subtasks', index)}
                                    placeholder={index === 0 ? 'e.g Make Coffee' : (index === 1 ? 'e.g Drink coffee & smile' : 'You know what to do')}
                                />

                                <img className="pointer close-btn"
                                    style={{ marginLeft: "1em" }}
                                    width={12} height={12} onClick={() => removeSubTask(index)} src="/assets/icon-cross.svg" alt="" />
                            </div>
                        </div>
                    })}

                    <button
                        onClick={addSubTask}
                        className="btn add-subtask-btn btn-rnd">
                        + Add New Subtask
                    </button>

                    {/* Status */}
                    <label htmlFor="status">Status</label>
                    <select name="status" id="status"
                        className="alt-text"
                        value={task.status}
                        onChange={(e) => handleFormChange(e)}>
                        {statusOptions.map((statusOption, i) => {
                            return <option key={i} value={statusOption.status}>{statusOption.status}</option>
                        })}
                    </select>

                </div>
                <div className="modal-footer">
                    <button className="btn btn-rnd pry-bg mr-1"
                        onClick={createTaskHandler}
                    >Create Task</button>
                </div>
            </div>
        </div>
    )
}