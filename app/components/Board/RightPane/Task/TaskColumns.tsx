import { IBoard, IStatus, ITask } from "@/lib/interfaces";
import { TaskCard } from "./TaskCard";
import { useState, useEffect, useRef } from 'react';
import { StatusActions } from "./StatusActions";
import { updateTaskStatusByIdAsync, updateTaskStatusByStatusAsync, useDispatch } from "@/lib/redux";
import { NewInlineTask } from "./NewInlineTask";

export const TaskColumns = ({ 
        status, tasks, board, statusArray 
    }: {
        status: IStatus, tasks: ITask[], board?: IBoard, statusArray: IStatus[] 
    }) => {
    const [showingStatusActions, setShowingStatusActions] = useState(false);
    const statusActionsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            // Check if the click occurred inside or outside the dropdown
            if (statusActionsRef.current && !statusActionsRef.current.contains(event.target as Node)) {
                setShowingStatusActions(false);
            }
        };

        document.addEventListener("click", handleClick);
        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, [showingStatusActions]);

    const countTasksByStatus = (status: string) => {
        return (tasks.filter((task) => task.status === status)).length;
    };

    const handleOptionsClick = () => {
        setShowingStatusActions(!showingStatusActions);
    };

    const onCloseDropdown = () => {
        setShowingStatusActions(false);
    }

    const renderTasksByStatus = (status: string) => {
        return tasks
            .filter((task) => task.status === status)
            .map((task) => (
                <TaskCard key={task.id} task={task} />
            ));
    };

    const onDragOver = (e: React.DragEvent<HTMLDivElement>, status: string) => {
        e.preventDefault();
    }

    const dispatch = useDispatch();
    const onDrop = (e: React.DragEvent<HTMLDivElement>, status: string) => {   
        const task: ITask = JSON.parse(e.dataTransfer.getData('task'));
        if (task.status !== status) {
            dispatch(updateTaskStatusByIdAsync({ taskId: task.id!, status }))
        }
    }

    const [showOptionButton, setShowOptionButton] = useState(false)
    const [statusEditorVisible, setStatusEditorVisible] = useState(false)
    const statusRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        // Focus the input element when newClEditorVisible is set to true
        if (statusEditorVisible && statusRef.current) {
            statusRef.current.focus();
        }
    }, [statusEditorVisible]);

    const handleEditColumnClick = () => {
        setStatusEditorVisible(true);
        setNewStatusName(status.status === 'NEW STATUS' ? '' : status.status);
    }
    const [newStatusName, setNewStatusName] = useState('');
    const handleStatusInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setNewStatusName(e.target.value)
    }
    const [entryError, setEntryError] = useState(false);
    const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === 'Escape') {
            setStatusEditorVisible(false);
        }
        if (e.key === 'Enter' && newStatusName !== '') {
            const statusIndex = statusArray.findIndex(s => s.status === newStatusName.toLocaleUpperCase())

            if (statusIndex === -1){
                const payload = { 
                    boardId: board!.id, 
                    oldStatus: status.status, 
                    newStatus: newStatusName.toLocaleUpperCase(),
                }
                dispatch(updateTaskStatusByStatusAsync(payload))
                setStatusEditorVisible(false);
                setEntryError(false)
            }
            else
                setEntryError(true);
        }

    }
    
    return (
        <div className="column" 
            onDragOver={(e) => onDragOver(e, status.status)}
            onDrop={(e) => onDrop(e, status.status)}
            onMouseEnter={() => setShowOptionButton(true)}
            onMouseLeave={() => setShowOptionButton(false)}>
            <div className="task-column space-between">
                {statusEditorVisible === false && 
                    <h2 className='alt-text' onClick={handleEditColumnClick}>
                    <span className="status-icon" style={{ background: status.color }}></span> 
                    {status.status} ({countTasksByStatus(status.status)})</h2>}

                {
                    statusEditorVisible === false &&
                    showOptionButton === true  && 

                    <button
                        onClick={handleOptionsClick}
                        className="btn btn-icon">
                        <img src="/assets/icon-vertical-ellipsis.svg"
                            alt="Options" />
                    </button>
                }


                {/* Input Editor */}
                {statusEditorVisible && <input type="text"
                    onChange={handleStatusInput}
                    onKeyDown={handleEnterPress}
                    value={newStatusName}
                    placeholder="Press enter to save"
                    className={`
                            ${statusEditorVisible === true ? '' : 'd-none'} 
                            ${entryError === true ? 'error' : ''}
                            alt-text inline-editor`}
                    ref={statusRef} />}
            </div>

            {showingStatusActions &&
                <div ref={statusActionsRef}>
                    <StatusActions boardId={board!.id} status={status.status} onCloseDropdown={onCloseDropdown} />
                </div>
            }

            {renderTasksByStatus(status.status)}

            <NewInlineTask 
                isVisible={showOptionButton} 
                status={status.status}
                selectedBoard={board} />
        </div>
    )
}
