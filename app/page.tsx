'use client'

/* Components */
import { useRouter } from 'next/navigation'
import { Loading } from './components/LoadingBar/Loading'
import { useEffect } from 'react'

export default function IndexPage() {

  const router = useRouter()
  
  useEffect(() => {
    router.push("/auth/sign-in")
  })

  return <Loading />
}

export const metadata = {
  title: 'Kabano',
}
