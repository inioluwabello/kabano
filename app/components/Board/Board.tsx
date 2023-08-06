'use client'

import { useEffect } from "react";
import { Loading } from "../LoadingBar/Loading"
import { LeftPane } from "./LeftPane/LeftPane"
import { RightPane } from "./RightPane/RightPane";
import { getBoardsAsync, getSelectedBoard, pageSlice, selectBoards, selectTheme, useDispatch, useSelector } from "@/lib/redux";
import { useAuthContext } from "@/lib/context/AuthContext";
import { useRouter } from "next/navigation";

export const Board = () => {

    const boards = useSelector(selectBoards);
    const selectedBoard = useSelector(getSelectedBoard)
    const theme = useSelector(selectTheme)


    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getBoardsAsync())
    }, [])

    const { user } = useAuthContext()
    const router = useRouter()

    useEffect(() => {
        if (user == null) router.push("/")
    }, [user, router])


    useEffect(() => {
        // On page load, check if there's a saved theme in localStorage
        const savedTheme = localStorage.getItem('savedTheme');
        if (savedTheme) {
            dispatch(pageSlice.actions.setTheme(savedTheme));
        }
    }, [dispatch]);

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