"use client";
import React from "react";
import { useRouter } from "next/navigation";
import signIn from "@/lib/firebase/auth/sign-in";
import { Loading } from "../components/LoadingBar/Loading";

function Page() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const handleForm = async (event: React.FormEvent) => {
    event.preventDefault();

    const { error } = await signIn(email, password);

    if (error) {
      alert('Login failed')
      return console.log(error);
    }

    return router.push("/admin");
  };

  return (
    <div className="wrapper">
      {
        loading &&
        <Loading />
      }
      <div className="form-wrapper">
        <h1 className="mt-60 mb-30">Sign in</h1>
        <form onSubmit={(e) => { 
            setLoading(true)
            handleForm(e)
          }} className="form">
          <label htmlFor="email">
            <p>Email</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              name="email"
              id="email"
              placeholder="example@mail.com"
            />
          </label>
          <label htmlFor="password">
            <p>Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              name="password"
              id="password"
              placeholder="password"
            />
          </label>
          <button type="submit">Sign in</button>
        </form>
      </div>
    </div>
  );
}

export default Page;
