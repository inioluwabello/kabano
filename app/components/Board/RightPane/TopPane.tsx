import { IBoard } from "@/lib/interface"

export const TopPane = ({ board }: { board?: IBoard }) => {
    return (
        <div className="top-pane">
            <h3 className="board-title">{board ? board.title : 'Create Board'}</h3>
        </div>
    )
}