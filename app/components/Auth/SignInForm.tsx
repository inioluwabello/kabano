import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { loginAsync, loginWithGithubAsync, loginWithGoogleAsync, pageSlice, selectLoginError, useDispatch, useSelector } from "@/lib/redux";

export const SignInForm = () => {

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [formSubmitted, setFormSubmitted] = useState(false)
    const [passwordVisible, setPasswordVisible] = useState(false)

    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(pageSlice.actions.resetLoginError())
    }, [])
    const loginError = useSelector(selectLoginError);

    const handleForm = async (event: React.FormEvent) => {
        event.preventDefault();

        setFormSubmitted(true);

        const payload = {
            email: email,
            password: password
        }
        await dispatch(loginAsync(payload)).then(() => {
            if (formSubmitted && loginError) {
                return;
            } else {
                router.push("/boards");
                return;
            }
        })
    };

    const handleGoogleSignIn = async () => {
        await dispatch(loginWithGoogleAsync()).then(() => {
            if (loginError) {
                return;
            } else {
                router.push("/boards");
                return;
            }
        })
    }

    const handleGithubSignIn = async () => {
        await dispatch(loginWithGithubAsync()).then(() => {
            if (loginError) {
                return;
            } else {
                router.push("/boards");
                return;
            }
        })
    }

    return (
        <div className="form-wrapper">

            {loginError && <div className="error-alert">{loginError}</div>}

            <div className="form-content">
                <h1 className="">Welcome! Sign In</h1>
                <p className="alt-text">Simplify your workflow and boost your productivity with <strong>Kabano</strong>. Get started for free.</p>

                <form onSubmit={handleForm} className="form">

                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                        type="email"
                        name="email"
                        id="email"
                        className="alt-text border"
                        placeholder="example@mail.com"
                    />

                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                        type={`${passwordVisible ? 'text' : 'password'}`}
                        name="password"
                        id="password"
                        className="alt-text border"
                        placeholder="password"
                    />

                    <div className="relative">
                        <div className="absolute password-toggle pointer alt-text"
                            onClick={() => setPasswordVisible(!passwordVisible)}>
                            {
                                !passwordVisible && 
                                <svg width="18" height="16" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M8.522 11.223a4.252 4.252 0 0 1-3.654-5.22l3.654 5.22ZM9 12.25A8.685 8.685 0 0 1 1.5 8a8.612 8.612 0 0 1 2.76-2.864l-.86-1.23A10.112 10.112 0 0 0 .208 7.238a1.5 1.5 0 0 0 0 1.524A10.187 10.187 0 0 0 9 13.75c.414 0 .828-.025 1.239-.074l-1-1.43A8.88 8.88 0 0 1 9 12.25Zm8.792-3.488a10.14 10.14 0 0 1-4.486 4.046l1.504 2.148a.375.375 0 0 1-.092.523l-.648.453a.375.375 0 0 1-.523-.092L3.19 1.044A.375.375 0 0 1 3.282.52L3.93.068a.375.375 0 0 1 .523.092l1.735 2.479A10.308 10.308 0 0 1 9 2.25c3.746 0 7.031 2 8.792 4.988a1.5 1.5 0 0 1 0 1.524ZM16.5 8a8.674 8.674 0 0 0-6.755-4.219A1.75 1.75 0 1 0 12.75 5v-.001a4.25 4.25 0 0 1-1.154 5.366l.834 1.192A8.641 8.641 0 0 0 16.5 8Z"
                                        fill="#828FA3"
                                    />
                                </svg>
                            }
                            {
                                passwordVisible && 
                                <svg width="16" height="11" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.815 4.434A9.055 9.055 0 0 0 8 0 9.055 9.055 0 0 0 .185 4.434a1.333 1.333 0 0 0 0 1.354A9.055 9.055 0 0 0 8 10.222c3.33 0 6.25-1.777 7.815-4.434a1.333 1.333 0 0 0 0-1.354ZM8 8.89A3.776 3.776 0 0 1 4.222 5.11 3.776 3.776 0 0 1 8 1.333a3.776 3.776 0 0 1 3.778 3.778A3.776 3.776 0 0 1 8 8.89Zm2.889-3.778a2.889 2.889 0 1 1-5.438-1.36 1.19 1.19 0 1 0 1.19-1.189H6.64a2.889 2.889 0 0 1 4.25 2.549Z" 
                                            fill="currentColor" />
                                </svg>
                            }
                        </div>
                    </div>

                    <div className="text-right forgot pointer">Forgot Password?</div>

                    <button className="border btn pry-bg" type="submit">Sign In</button>

                    <button className="border btn alt-text social-btn" 
                        onClick={handleGoogleSignIn}
                        type="submit">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512" width={16} height={16}>
                            <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" fill="currentColor" />
                        </svg>
                        {" "}Continue with Google</button>

                    <button className="border btn alt-text social-btn"
                        onClick={handleGithubSignIn}
                        type="submit">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" width={16} height={16}>
                            <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" fill="currentColor" />
                        </svg>
                        {" "}Continue with Github</button>
                </form>

                <p className="alt-text">Don't have an account? {" "}
                    <span className="link pointer"
                        onClick={() => { router.push("/auth/sign-up")}}
                    ><strong>Sign Up</strong></span></p>

            </div>
        </div>
    )
}