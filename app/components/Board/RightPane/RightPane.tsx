import { IBoard } from '@/lib/interfaces'
import './RightPane.css'
import { TopPane } from './TopPane'

export const RightPane = ({ selectedBoard }: { selectedBoard?: IBoard }) => {
    return (
        <section className="right-pane">
            <TopPane board={selectedBoard} />
        </section>
    )
}