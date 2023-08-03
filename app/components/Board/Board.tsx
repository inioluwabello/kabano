import { Loading } from "../LoadingBar/Loading"
import { LeftPane } from "./LeftPane/LeftPane"
import { RightPane } from "./RightPane/RightPane";
import { getSelectedBoard, selectBoards, selectTheme, useSelector } from "@/lib/redux";

export const Board = () => {

    const boards = useSelector(selectBoards);
    console.log(boards);

    const selectedBoard = useSelector(getSelectedBoard) 
    console.log(selectedBoard)

    const theme = useSelector(selectTheme)
    console.log(theme)

    return (
        <main className="board">
            <Loading />

            {/* <div className="space-between">
                <LeftPane boards={boards} />
                <RightPane selectedBoard={selectedBoard} />
            </div> */}

        </main>
    )
}