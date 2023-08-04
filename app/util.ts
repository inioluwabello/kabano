import React from "react"
import { useAuthContext } from "@/lib/context/AuthContext"
import { useRouter } from "next/navigation";

export const verifyLogin = () => {

    const { user } = useAuthContext()
    const router = useRouter()

    React.useEffect(() => {
        if (user == null) router.push("/")
    }, [user, router])

}