'use client'

/* Components */
import { Board } from "../components/Board/Board";
import React from "react";
import { verifyLogin } from "../util";

export default function IndexPage() {
    verifyLogin();

    return <Board />
}

export const metadata = {
    title: 'Kabano | Boards',
}
