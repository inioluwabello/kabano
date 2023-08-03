/* Components */
import { Providers } from '@/lib/providers'

/* Instruments */
import './styles/globals.css'
import { AuthContextProvider } from '@/lib/context/AuthContext'

export default function RootLayout(props: React.PropsWithChildren) {
  return (
    <Providers>
      <html lang="en">
        <body>

          <AuthContextProvider>{props.children}</AuthContextProvider>

        </body>
      </html>
    </Providers>
  )
}
