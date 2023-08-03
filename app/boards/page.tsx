'use client'

/* Components */
import { Board } from "../components/Board/Board";
import React from "react";
import { verifyLogin } from "../util";
import { selectTheme, useSelector } from "@/lib/redux";

export default function IndexPage() {
    verifyLogin();
    const theme = useSelector(selectTheme)

    return <Board theme={theme} />
}

export const metadata = {
    title: 'Kabano | Boards',
}
