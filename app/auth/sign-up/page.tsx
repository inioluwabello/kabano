"use client";
import React from "react";
import { Loading } from "../../components/LoadingBar/Loading";
import { AuthIllustration } from "../../components/Auth/AuthIllustration";
import { setTheme } from "@/app/util";
import { selectTheme, useSelector } from "@/lib/redux";
import { SignUpForm } from "@/app/components/Auth/SignUpForm";
import '../auth.css'

function Page() {
    setTheme();

    const theme = useSelector(selectTheme)

    return (
        <main className={`section ${theme}`}>
            <Loading />

            <div className="flex">
                <SignUpForm />

                <AuthIllustration />
            </div>
        </main>
    );
}

export default Page;
