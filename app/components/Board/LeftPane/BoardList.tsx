import { IBoard } from "@/lib/interfaces"
import { BoardListItem } from "./BoardListItem"
import { createNewBoardAsync, getSelectedBoard, useDispatch, useSelector } from "@/lib/redux";
import { useEffect, useRef, useState } from "react";
import { useAuthContext } from "@/lib/context/AuthContext";

export const BoardList = ({ boards }: { boards: IBoard[] }) => {
    const selectedBoard = useSelector(getSelectedBoard)
    const dispatch = useDispatch();

    const newBoardRef = useRef<HTMLInputElement>(null)
    const [newBoardEditorVisible, setNewEditorVisibility] = useState(false);

    const { user } = useAuthContext();

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
        if (e.key === 'Escape') {
            setNewBoardName('')
            setNewEditorVisibility(false)
            return;
        }

        if (newBoardName.trim() !== '' && e.key === 'Enter') {
            const payload = {
                title: newBoardName,
                userId: user!.userId as string,
                isArchived: false
            }
            dispatch(createNewBoardAsync(payload))
            setNewBoardName('')
            setNewEditorVisibility(false)
        }
    }

    return (
        <div className="board-list alt-text">
            <div className="list-title">ALL BOARDS ({boards.length})</div>

            {
                boards.map(board => <BoardListItem key={board.id} board={board} selected={selectedBoard?.id === board.id} />)
            }

            <div className="new-board pointer"
                        onClick={() => {
                            setNewEditorVisibility(true);
                            newBoardRef.current?.focus();
                        }}>
                {!newBoardEditorVisible &&
                    <button
                        className="alt-pry-text plain new-board-btn">
                        <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" fill="currentColor" />
                        </svg>
                        + Create New Board
                    </button>}
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