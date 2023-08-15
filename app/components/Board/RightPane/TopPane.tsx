import { IBoard } from "@/lib/interfaces"
import { boardSlice, deleteBoardAsync, logoutAsync, modalSlice, useDispatch } from "@/lib/redux";
import { RefObject, useEffect, useState } from "react";

export const TopPane = ({ board, topMenuActionsRef }: 
    { board?: IBoard, topMenuActionsRef: RefObject<HTMLDivElement> }) => {

    const [showTopBarOptions, setShowTopBarOptions] = useState(false)

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            if (topMenuActionsRef.current) {
                setShowTopBarOptions(false);
            }
        };

        document.addEventListener("click", handleClick);
        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, [showTopBarOptions]);

    const dispatch = useDispatch();

    const handleDeleteClick = () => {
        if (board) {
            dispatch(deleteBoardAsync(board.id))
        }
    }


    return (
        <div className={`pane topPane space-between border-bottom`}>
            <h3 className={`paneTitle`}>{board ? board.title : `No Board Selected`}</h3>
            <div className="top-bar-actions">
                <div className="flex ac">
                    {board && <button className="btn btn-rnd pry-bg mr-1"
                        disabled={!board || !board.statuses || (board.statuses.length === 0) ? true : false}
                        onClick={() => dispatch(modalSlice.actions.setState(true))}
                    >+ Add New Task</button>}
                    <button className="btn btn-icon plain btn-icon-plain"
                        onClick={() => setShowTopBarOptions(!showTopBarOptions)}>
                        <img style={{marginRight: "0px"}} src="/assets/icon-vertical-ellipsis.svg" alt="Logo" />
                    </button>
                </div>

                {showTopBarOptions === true && <div className="relative">
                    <div className={`topBarActions`}>
                        <ul>
                            <li className="pointer hoverable">Archived Items</li>
                            {/* <li className="pointer hoverable border-top">Edit Board</li> */}
                            <li className={`pointer hoverable red-color ${board ? '' : 'disabled'}`}
                                onClick={() => handleDeleteClick()}>Delete Board</li>
                            <li 
                                onClick={() =>  dispatch(logoutAsync()) }
                                className="pointer hoverable border-top red-color">Sign out</li>
                        </ul>
                    </div>
                </div>
                }
            </div>
        </div>
    )
}