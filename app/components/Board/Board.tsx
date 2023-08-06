'use client'

import { useEffect } from "react";
import { Loading } from "../LoadingBar/Loading"
import { LeftPane } from "./LeftPane/LeftPane"
import { RightPane } from "./RightPane/RightPane";
import { getBoardsAsync, getSelectedBoard, selectBoards, useDispatch, useSelector } from "@/lib/redux";

export const Board = ({ theme }: { theme: string }) => {

    const boards = useSelector(selectBoards);
    const selectedBoard = useSelector(getSelectedBoard)

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getBoardsAsync())
    }, [])

    return (
        <main className={`board ${theme}`}>
            
            <Loading />

            <div className="flex">
                <LeftPane boards={boards} />
                <RightPane selectedBoard={selectedBoard} />
            </div>

        </main>
    )
}