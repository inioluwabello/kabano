import { IBoard } from '@/lib/interfaces'
import './RightPane.css'
import { TopPane } from './TopPane'
import { TaskBoard } from './Task/TaskBoard'

export const RightPane = ({ board }: { board?: IBoard }) => {
    return (
        <section className="right-pane">
            <TopPane board={board} />

            <TaskBoard board={board} />
        </section>
    )
}