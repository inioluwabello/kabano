import { IBoard } from "@/lib/interfaces"
import { BoardListItem } from "./BoardListItem"
import { createNewBoardAsync, getSelectedBoard, selectBoards, useDispatch, useSelector } from "@/lib/redux";
import { useEffect, useRef, useState } from "react";

export const BoardList = ({ boards }: { boards: IBoard[] }) => {
    const boardList = useSelector(selectBoards);
    const selectedBoard = useSelector(getSelectedBoard)
    const dispatch = useDispatch();


    // useEffect(() => {
    //     if (!selectedBoard)
    //         return;

    //     dispatch(getBoardTasksAsync(selectedBoard!._id))
    // }, [selectedBoard])

    const newBoardRef = useRef<HTMLInputElement>(null)
    const [newBoardEditorVisible, setNewEditorVisibility] = useState(false);

    useEffect(() => {
        // Focus the input element when newBoardEditorVisible is set to true
        if (newBoardEditorVisible && newBoardRef.current) {
            newBoardRef.current.focus();
        }
    }, [newBoardEditorVisible]);

    const [newBoardName, setNewBoardName] = useState('')
    const handleBoardNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewBoardName(e.target.value)
    }

    const handleBoardEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (newBoardName.trim() !== '' && e.key === 'Enter') {
            const payload = {
                title: newBoardName
            }
            dispatch(createNewBoardAsync(payload))
            setNewBoardName('')
            setNewEditorVisibility(false)
        }
    }

    return (
        <div className="board-list">
            <div className="list-title">ALL BOARDS ({boards.length})</div>

            {
                boards.map(board => <BoardListItem key={board.title} board={board} />)
            }

            <div className="new-board">
                {!newBoardEditorVisible &&
                    <button
                        onClick={() => {
                            setNewEditorVisibility(!newBoardEditorVisible);
                            newBoardRef.current?.focus();
                        }}
                        className="alt-pry-text pointer">+ Create New Board</button>}
                {newBoardEditorVisible &&
                    <input
                        ref={newBoardRef}
                        value={newBoardName}
                        onChange={handleBoardNameInput}
                        onKeyDown={handleBoardEnterPress}
                        placeholder="Press Enter to save"
                        className="inline-editor alt-text" type="text" />}
            </div>
        </div>
    )
}