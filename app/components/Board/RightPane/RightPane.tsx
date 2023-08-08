import { IBoard } from '@/lib/interfaces'
import './RightPane.css'
import { TopPane } from './TopPane'
import { TaskBoard } from './Task/TaskBoard'
import { RefObject } from 'react'

export const RightPane = ({ selectedBoard, topMenuActionsRef }: 
    { selectedBoard?: IBoard, topMenuActionsRef: RefObject<HTMLDivElement> }) => {

    return (
        <div className="right-pane">
            <TopPane board={selectedBoard} topMenuActionsRef={topMenuActionsRef} />

            <TaskBoard board={selectedBoard} />
        </div>
    )
}