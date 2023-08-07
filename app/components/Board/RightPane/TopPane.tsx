import { logout } from "@/lib/firebase/auth/logout";
import { IBoard } from "@/lib/interfaces"
import { logoutAsync, modalSlice, useDispatch } from "@/lib/redux";
import { useState } from "react";

export const TopPane = ({ board }: { board?: IBoard }) => {

    const [showTopBarOptions, setShowTopBarOptions] = useState(false)

    const dispatch = useDispatch();

    return (
        <div className={`pane topPane space-between border-bottom`}>
            <h3 className={`paneTitle`}>{board ? board.title : `No Board Selected`}</h3>
            <div className="top-bar-actions">
                <div className="flex ac">
                    {board && <button className="btn btn-rnd pry-bg mr-1"
                        disabled={!board || !board.statuses || (board.statuses.length === 0) ? true : false}
                        onClick={() => dispatch(modalSlice.actions.setState(true))}
                    >+ Add New Task</button>}
                    <button className="btn btn-icon plain"
                        onClick={() => setShowTopBarOptions(!showTopBarOptions)}>
                        <img style={{marginRight: "0px"}} src="/assets/icon-vertical-ellipsis.svg" alt="Logo" />
                    </button>
                </div>

                {showTopBarOptions === true && <div className="relative">
                    <div className={`topBarActions`}>
                        <ul>
                            <li className="pointer hoverable">Archived Items</li>
                            <li className="pointer hoverable border-top">Edit Board</li>
                            <li className="pointer hoverable red-color">Delete Board</li>
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