import { IBoard, ITask } from '@/lib/interfaces';
import { createNewTaskAsync, useDispatch } from '@/lib/redux';
import { useState, useEffect } from 'react'
export const NewInlineTask = ({ 
    isVisible,
    selectedBoard,
    status
 }: { 
        isVisible: boolean
        selectedBoard?: IBoard,
        status: string
}) => {

    const [newTaskTitle, setNewTask] = useState('');
    const [editing, setEditing] = useState(false);
    const handleNewTaskInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setNewTask(e.target.value)
        setEditing(true)
    }

    const dispatch = useDispatch();

    const handleNewTaskEnterPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Escape') {
            setNewTask('');
            setEditing(false);
            return;
        }
        if (e.key === 'Enter') {
            // Dispatch the new task addition
            if (newTaskTitle !== '') {
                try {
                    const task: ITask = {
                        title: newTaskTitle,
                        status: status,
                        description: '',
                        subTasks: [],
                        isArchived: false,
                        boardId: selectedBoard!.id
                    };
                    const payload = {
                        task: task
                    };

                    await dispatch(createNewTaskAsync(payload));
                    setNewTask('');
                    setEditing(false);
                } catch (error) {
                    console.error('Error creating a new task:', error);
                }
            }
        }
    };

    // To handle case where user has type, deletes text and moves mouse from column
    useEffect(() => {
        if (editing && !isVisible && newTaskTitle === '')
            setEditing(false)
    }, [isVisible])

    
    return (
        (isVisible || editing) && 
        <div className="add-task task-card">
            <input type="text"
                className="new-task new-task-inline"
                onChange={handleNewTaskInput}
                onKeyDown={handleNewTaskEnterPress}
                value={newTaskTitle}
                placeholder='Add a new task' />

        </div>
    )
}