import { IBoard } from "@/lib/interfaces"
import { getSelectedBoard, modalSlice, useDispatch, useSelector } from "@/lib/redux";
import { useState } from "react";

export const TopPane = ({ board }: { board?: IBoard }) => {

    const [showTopBarOptions, setShowTopBarOptions] = useState(false)

    const dispatch = useDispatch();

    return (
        <div className={`pane topPane space-between border-bottom`}>
            <h3 className={`paneTitle`}>{board ? board.title : `No Board Selected`}</h3>
            <div className="top-bar-actions">
                <div className="flex ac">
                    <button className="btn btn-rnd pry-bg mr-1"
                        disabled={!board ? true : false}
                        onClick={() => dispatch(modalSlice.actions.setState(true))}
                    >+ Add New Task</button>
                    <button className="btn btn-icon plain"
                        onClick={() => setShowTopBarOptions(!showTopBarOptions)}>
                        <img style={{marginRight: "0px"}} src="/assets/icon-vertical-ellipsis.svg" alt="Logo" />
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