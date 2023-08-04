import { IBoard } from '@/lib/interfaces'
import './RightPane.css'
import { TopPane } from './TopPane'
import { TaskBoard } from './Task/TaskBoard'

export const RightPane = ({ selectedBoard }: { selectedBoard?: IBoard }) => {
    return (
        <section className="right-pane">
            <TopPane board={selectedBoard} />

            <TaskBoard board={selectedBoard} />
        </section>
    )
}