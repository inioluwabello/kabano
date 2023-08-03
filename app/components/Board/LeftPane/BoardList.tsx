import { IBoard } from "@/lib/interface"
import { BoardListItem } from "./BoardListItem"

export const BoardList = ({ boards }: { boards: IBoard[] }) => {
    return (
        <div className="board-list">
            <div className="list-title">ALL BOARDS ({boards.length})</div>

            {
                boards.map(board => <BoardListItem key={board.title} board={board} />)
            }
        </div>
    )
}