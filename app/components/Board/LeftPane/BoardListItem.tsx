import { IBoard } from "@/lib/interface";
import { useDispatch } from "@/lib/redux";

export const BoardListItem = ({ board }: { board?: IBoard }) => {

    const dispatch = useDispatch();
    const selectBoardHandler = () => {
        // TODO: dispatch action to set selectedBoard
    }

    const createBoardHandler = () => {

    }

    const renderBoardListItem = (board: IBoard) => {
        return <div className="board-list-item flex" onClick={selectBoardHandler}>
            <img src="/assets/icon-board.svg" alt="Board" />
            <span className="board-list-title">{board.title}</span>
        </div>
    }

    const renderNewBoardListItem = () => {
        return <div className="board-list-item flex" onClick={createBoardHandler}>
            <img src="/assets/icon-board.svg" alt="Board" />
            <span className="board-list-title">+ Create New Board</span>
        </div>
    }

    return (
        <>
            {renderBoardListItem(board!)}
            {renderNewBoardListItem()}
        </>
    )
}