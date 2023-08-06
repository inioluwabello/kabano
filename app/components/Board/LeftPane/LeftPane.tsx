import { Logo } from "./Logo";
import { BoardList } from "./BoardList";
import { LeftPaneFooter } from "./LeftPaneFooter";
import { pageSlice, selectLeftPaneVisibility, useDispatch, useSelector } from "@/lib/redux";
import { IBoard } from "@/lib/interfaces";
import './LeftPane.css'
import { memo } from "react";

export const LeftPane = memo(({ boards }: { boards: IBoard[] }) => {

    const dispatch = useDispatch();
    const isLeftPaneVisible = useSelector(selectLeftPaneVisibility)

    const toggleSidebar = (isVisible: boolean) => {
        dispatch(pageSlice.actions.setLeftPaneVisibility(isVisible));
    };

    return (
        <div className="left-page-content leftPane">
            <div className={`pane ${isLeftPaneVisible ? '' : 'border-bottom'} border-right logo-wrapper`}>
                <Logo />
            </div>

            <div className="pane border-right">
                {
                    isLeftPaneVisible &&
                    <div className={`mid-left-pane ${isLeftPaneVisible ? 'visible' : ''}`}>
                        <BoardList boards={boards} />
                        <LeftPaneFooter toggleSidebar={toggleSidebar} />
                    </div>
                }
                {
                    !isLeftPaneVisible &&
                    <div className="left-pane-toggle">
                        <div className="leftPaneFooter">
                            <button
                                onClick={() => toggleSidebar(true)}
                                className="hide-sidebar-btn-sm pry-bg pointer plain alt-text"
                                >
                                    <img src="/assets/icon-show-sidebar.svg" alt="Logo" />
                            </button>
                        </div>
                    </div>
                }
            </div>
            
        </div>
    )
})