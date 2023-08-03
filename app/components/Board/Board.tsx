import { IBoard } from "@/lib/interfaces";
import { Loading } from "../LoadingBar/Loading"
import { LeftPane } from "./LeftPane/LeftPane"
import { RightPane } from "./RightPane/RightPane";

export const Board = () => {

    const boards: IBoard[] = [];
    const selectedBoard: IBoard = {
        _id: "1",
        statuses: [],
        title: 'New Board'
    };

    return (
        <main className="board">
            <Loading />

            <div className="space-between">
                <LeftPane boards={boards} />
                <RightPane selectedBoard={selectedBoard} />
            </div>

        </main>
    )
}