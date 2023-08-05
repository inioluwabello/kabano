"use client";
import React from "react";
import { Loading } from "../../components/LoadingBar/Loading";
import { SignInForm } from "../../components/Auth/SignInForm";
import { AuthIllustration } from "../../components/Auth/AuthIllustration";
import '../auth.css'
import { setTheme } from "@/app/util";
import { selectTheme, useSelector } from "@/lib/redux";

function Page() {
  setTheme();

  const theme = useSelector(selectTheme)

  return (
    <main className={`section ${theme}`}>
      <Loading />

      <div className="flex">
        <SignInForm />

        <AuthIllustration />
      </div>
    </main>
  );
}

export default Page;
