import { Loading } from "../LoadingBar/Loading"
import { LeftPane } from "./LeftPane/LeftPane"
import { RightPane } from "./RightPane/RightPane";
import { getSelectedBoard, selectBoardStatus, selectBoards, useSelector } from "@/lib/redux";

export const Board = ({ theme }: { theme: string }) => {

    const boards = useSelector(selectBoards);
    const selectedBoard = useSelector(getSelectedBoard)
    const boardState = useSelector(selectBoardStatus)

    return (
        <main className={`board ${theme}`}>
            {boardState === 'loading' && <Loading />}

            <div className="flex">
                <LeftPane boards={boards} />
                <RightPane selectedBoard={selectedBoard} />
            </div>

        </main>
    )
}