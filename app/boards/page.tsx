/* Components */
import { Board } from "../components/Board/Board";
import React, { useEffect } from "react";
import { pageSlice, selectTheme, useDispatch, useSelector } from "@/lib/redux";
import './page.css'
import { useAuthContext } from "@/lib/context/AuthContext";
import { useRouter } from "next/navigation";

export default function IndexPage() {
    
    return <Board />
}

export const metadata = {
    title: 'Kabano | Boards',
}
