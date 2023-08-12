'use client'

import { useEffect, useRef } from "react";
import { Loading } from "../LoadingBar/Loading"
import { LeftPane } from "./LeftPane/LeftPane"
import { RightPane } from "./RightPane/RightPane";
import { getBoardsAsync, getSelectedBoard, pageSlice, selectBoards, selectModalState, selectTheme, useDispatch, useSelector } from "@/lib/redux";
import { useAuthContext } from "@/lib/context/AuthContext";
import { useRouter } from "next/navigation";
import { NewTaskModal } from "./RightPane/Task/Modal/NewTaskModal";

export const Board = () => {

    const boards = useSelector(selectBoards);
    const selectedBoard = useSelector(getSelectedBoard)
    const theme = useSelector(selectTheme)
    const modalIsOpen = useSelector(selectModalState)


    const { user } = useAuthContext()

    const dispatch = useDispatch();
    const router = useRouter()
    useEffect(() => {
        if (user == null) {
            router.push("/")
        } else {
            dispatch(getBoardsAsync(user.userId!))
        }
    }, [user, router])

    useEffect(() => {
        // On page load, check if there's a saved theme in localStorage
        const savedTheme = localStorage.getItem('savedTheme');
        if (savedTheme) {
            dispatch(pageSlice.actions.setTheme(savedTheme));
        }
    }, [dispatch]);


    const topMenuActionsRef = useRef<HTMLDivElement>(null);

    return (
        <main className={`board ${theme}`}>
            
            <Loading pageLoading={false} />

            <div className="flex" ref={topMenuActionsRef}>
                <LeftPane boards={boards} />
                <RightPane selectedBoard={selectedBoard} topMenuActionsRef={topMenuActionsRef} />
            </div>

            {
                modalIsOpen &&
                selectedBoard &&
                <NewTaskModal statusOptions={selectedBoard!.statuses} boardId={selectedBoard!.id} />
            }
        </main>
    )
}