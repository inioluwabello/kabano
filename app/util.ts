import React, { useEffect } from "react"
import { useAuthContext } from "@/lib/context/AuthContext"
import { useRouter } from "next/navigation";
import { pageSlice, selectTheme, useDispatch, useSelector } from "@/lib/redux";

export const verifyLogin = () => {

    const { user } = useAuthContext()
    const router = useRouter()

    React.useEffect(() => {
        if (user == null) router.push("/")
    }, [user, router])

}

export const setTheme = () => {
    const dispatch = useDispatch()


    useEffect(() => {
        // On page load, check if there's a saved theme in localStorage
        const savedTheme = localStorage.getItem('savedTheme');
        if (savedTheme) {
            dispatch(pageSlice.actions.setTheme(savedTheme));
        }
    }, [dispatch]);
}