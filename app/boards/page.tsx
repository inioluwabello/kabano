'use client'

/* Components */
import { Board } from "../components/Board/Board";
import React, { useEffect } from "react";
import { setTheme, verifyLogin } from "../util";
import { pageSlice, selectTheme, useDispatch, useSelector } from "@/lib/redux";
import './page.css'

export default function IndexPage() {
    verifyLogin();
    const theme = useSelector(selectTheme)
    setTheme();

    return <Board theme={theme} />
}

export const metadata = {
    title: 'Kabano | Boards',
}
