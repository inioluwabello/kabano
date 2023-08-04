import { IBoard } from "@/lib/interfaces"
import { getSelectedBoard, modalSlice, useDispatch, useSelector } from "@/lib/redux";
import { useState } from "react";

export const TopPane = ({ board }: { board?: IBoard }) => {

    const selectedBoard = useSelector(getSelectedBoard)
    const [showTopBarOptions, setShowTopBarOptions] = useState(false)

    const dispatch = useDispatch();

    return (
        <div className={`pane topPane space-between`}>
            <h3 className={`paneTitle`}>{board ? board.title : `No Board Selected`}</h3>
            <div className="top-bar-actions">
                <div className="flex ac">
                    <button className="btn btn-rnd pry-bg mr-1"
                        onClick={() => dispatch(modalSlice.actions.setState(true))}
                    >+ Add New Task</button>
                    <button className="btn btn-icon"
                        onClick={() => setShowTopBarOptions(!showTopBarOptions)}>
                        <img src="/assets/icon-vertical-ellipsis.svg" alt="Logo" />
                    </button>
                </div>

                {showTopBarOptions === true && <div className="relative">
                    <div className={`topBarActions`}>
                        <ul>
                            <li className="pointer">Archived Items</li>
                        </ul>
                    </div>
                </div>
                }
            </div>
        </div>
    )
}