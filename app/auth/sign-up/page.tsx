"use client";
import React, { useEffect } from "react";
import { Loading } from "../../components/LoadingBar/Loading";
import { AuthIllustration } from "../../components/Auth/AuthIllustration";
import { pageSlice, selectTheme, useDispatch, useSelector } from "@/lib/redux";
import { SignUpForm } from "@/app/components/Auth/SignUpForm";
import '../auth.css'

function Page() {
    const dispatch = useDispatch()

    useEffect(() => {
        // On page load, check if there's a saved theme in localStorage
        const savedTheme = localStorage.getItem('savedTheme');
        if (savedTheme) {
            dispatch(pageSlice.actions.setTheme(savedTheme));
        }
    }, [dispatch]);

    const theme = useSelector(selectTheme)

    return (
        <main className={`section ${theme}`}>
            <Loading />

            <div className="auth-page flex">
                <SignUpForm />

                <AuthIllustration />
            </div>
        </main>
    );
}

export default Page;
