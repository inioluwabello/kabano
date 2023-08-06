'use client'

/* Components */
import { Board } from "../components/Board/Board";
import React, { useEffect } from "react";
import { pageSlice, selectTheme, useDispatch, useSelector } from "@/lib/redux";
import './page.css'
import { useAuthContext } from "@/lib/context/AuthContext";
import { useRouter } from "next/navigation";

export default function IndexPage() {
    const { user } = useAuthContext()
    const router = useRouter()

    React.useEffect(() => {
        if (user == null) router.push("/")
    }, [user, router])

    const theme = useSelector(selectTheme)

    const dispatch = useDispatch()

    useEffect(() => {
        // On page load, check if there's a saved theme in localStorage
        const savedTheme = localStorage.getItem('savedTheme');
        if (savedTheme) {
            dispatch(pageSlice.actions.setTheme(savedTheme));
        }
    }, [dispatch]);

    return <Board theme={theme} />
}

export const metadata = {
    title: 'Kabano | Boards',
}
