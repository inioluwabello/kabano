import { ITask } from "@/lib/interfaces";
import { deleteSingleTaskAsync, useDispatch } from "@/lib/redux";
import { useState } from 'react'

interface TakListProps {
    task: ITask
}

export const TaskCard = ({ task }: TakListProps) => {

    const dispatch = useDispatch();
    const onDragStart = (e: React.DragEvent<HTMLDivElement>, task: ITask) => {
        e.dataTransfer.setData('task', JSON.stringify(task))
    }

    const [taskIconVisible, setTaskIconVisible] = useState(false)

    return (
        <div key={task.id} 
            draggable
            onDragStart={(e) => onDragStart(e, task)}
            onMouseEnter={() => setTaskIconVisible(true)}
            onMouseLeave={() => setTaskIconVisible(false)}
            className="task-card pointer">
            <div className="space-between">
                <h3>{task.title}</h3>
                {
                    taskIconVisible && (
                        <img src="/assets/icon-cross.svg" alt="Cross"
                            style={{width: '11px', height: '11px'}}
                            onClick={() => dispatch(deleteSingleTaskAsync(task.id!))} />
                    )
                }
            </div>
            <p className="alt-text">{task.description}</p>
        </div>
    );
};