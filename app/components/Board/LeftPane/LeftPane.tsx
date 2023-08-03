import { IBoard } from "@/lib/interface";
import { Logo } from "./Logo";
import { BoardList } from "./BoardList";
import { LeftPaneFooter } from "./LeftPaneFooter";
import { selectLeftPaneVisibility, useSelector } from "@/lib/redux";

export const LeftPane = ({ boards }: { boards: IBoard[] }) => {

    const isLeftPaneVisible = useSelector(selectLeftPaneVisibility)
    return (
        <>
            <Logo />

            {
                isLeftPaneVisible &&
                <div className="mid-left-pane">
                    <BoardList boards={boards} />
                    <LeftPaneFooter />
                </div>
            }
        </>
    )
}