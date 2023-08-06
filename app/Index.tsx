'use client'
import { useRouter } from 'next/navigation'
import { Loading } from './components/LoadingBar/Loading'
import { useEffect } from 'react'

export const Index = () => {
    const router = useRouter()

    useEffect(() => {
        // Run the routing logic only on the client side
        if (typeof window !== 'undefined') {
            router.push("/auth/sign-in");
        }
    }, []);

    return (<Loading />)
}