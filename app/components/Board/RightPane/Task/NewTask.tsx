import { generateColor } from "@/app/utils/util";
import { IBoard, IStatus, ITask } from "@/lib/interfaces";
import { createNewStatusAsync, createNewTaskAsync, updateTaskStatusByIdAsync, useDispatch } from "@/lib/redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";

interface NewTaskProp {
    board?: IBoard,
    statusArray: IStatus[]
}

export const NewTask = ({ board, statusArray }: NewTaskProp) => {

    const dispatch = useDispatch();
    const statusRef = useRef<HTMLInputElement>(null);

    const [newClEditorVisible, setNewClEditorVisible] = useState(false)
    useEffect(() => {
        // Focus the input element when newClEditorVisible is set to true
        if (newClEditorVisible && statusRef.current) {
            statusRef.current.focus();
        }
    }, [newClEditorVisible]);

    const handleNewColumnCLick = () => {
        setNewClEditorVisible(true);
    }

    const [newStatusName, setNewStatusName] = useState('');
    const handleStatusInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setNewStatusName(e.target.value)
    }

    const [entryError, setEntryError] = useState(false);
    const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === 'Escape') {
            setNewClEditorVisible(false);
            setNewStatusName('');
            return;
        }
        
        if (e.key === 'Enter' && newStatusName !== '') {
            statusArray = statusArray ? statusArray : []
            const statusIndex = statusArray.findIndex(s => s.status === newStatusName.toLocaleUpperCase())
            if (statusIndex === -1) {
                const payload = {
                    title: newStatusName.toLocaleUpperCase(),
                    color: generateColor(),
                    boardId: board!.id
                }
                dispatch(createNewStatusAsync(payload))
                setNewClEditorVisible(false);
                setNewStatusName('')
            } else
                setEntryError(true);
        }

    }

    const [newTaskTitle, setNewTask] = useState('');
    const handleNewTaskInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setNewTask(e.target.value)
    }

    const handleNewTaskEnterPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            // Dispatch the new task addition
            if (newTaskTitle !== '') {
                try {
                    const payload = {
                        task: {
                            title: newTaskTitle,
                            status: newStatusName.toLocaleUpperCase(),
                            description: '',
                            subTasks: [],
                            isArchived: false,
                            boardId: board!.id
                        }
                        
                    };

                    await dispatch(createNewTaskAsync(payload));
                    setNewTask('');
                    setNewStatusName('')
                    setNewClEditorVisible(false);
                    setEntryError(false)
                } catch (error) {
                    console.error('Error creating a new task:', error);
                    // Handle error state if needed
                }
            }
        }
    };

    const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    }

    const onDrop = (e: React.DragEvent<HTMLDivElement>, status: string) => {
        const task: ITask = JSON.parse(e.dataTransfer.getData('task'));
        if (task.status !== status) {
            dispatch(updateTaskStatusByIdAsync({ taskId: task.id!, status }))
        }
    }

    return (
        <>
            {board && <div 
                onDragOver={(e) => onDragOver(e)}
                onDrop={(e) => onDrop(e, 'NEW STATUS')}
                className="column new-column">
                <h2
                    onClick={handleNewColumnCLick}
                    className={`
                        ${newClEditorVisible === false ? '' : 'd-none'}
                        ${newStatusName === '' ? `alt-pry-text` : 'alt-text'} pointer
                        `}
                >{newStatusName === '' ? `+ New Column` : newStatusName.toLocaleUpperCase()}</h2>

                <input type="text"
                    onChange={handleStatusInput}
                    onKeyDown={handleEnterPress}
                    value={newStatusName}
                    placeholder="Press enter to save"
                    className={`
                            ${newClEditorVisible === true ? '' : 'd-none'} 
                            ${entryError === true ? 'error' : ''}
                            alt-text inline-editor`}
                    ref={statusRef} />

                
                {newStatusName !== '' && newClEditorVisible === false &&
                    <div className="add-task">
                        <input type="text"
                            className="new-task"
                            onChange={handleNewTaskInput}
                            onKeyDown={handleNewTaskEnterPress}
                            value={newTaskTitle}
                            placeholder='Add new task' />

                    </div>
                }
            </div>}

            {!board && 
                <div className="default-board-message text-center">
                    Create or select a board

                    <div className="default-icon">
                        <img src="/assets/icon-board.svg" alt="Board" />
                    </div>

                </div>}
        </>
    )
}