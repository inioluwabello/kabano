import { ITask } from "@/lib/interfaces";
import { deleteSingleTaskAsync, selectTheme, useDispatch, useSelector } from "@/lib/redux";
import { useState } from 'react'

interface TakListProps {
    task: ITask
}

export const TaskCard = ({ task }: TakListProps) => {

    const theme = useSelector(selectTheme);

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
                <h3>{task.title.length < 21 ? task.title : `${task.title.slice(0, 17) }...`}</h3>
                {
                    taskIconVisible && 
                    (
                        <img src={`/assets/icon-cross${theme === 'light' ? '-alt' : ''}.svg`} alt="Cross"
                            style={{
                                width: '11px', height: '11px', position: "relative",  top: "4px"
                            }}
                            onClick={() => dispatch(deleteSingleTaskAsync(task.id!))} />
                    )
                }
            </div>
            <p className="alt-text task-description">{task.description}</p>
        </div>
    );
};