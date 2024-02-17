import { AuthProvider } from "@/contexts/auth-context";
import { globalStyles } from "@/styles/global";
import type { AppProps } from 'next/app'

globalStyles();
export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}