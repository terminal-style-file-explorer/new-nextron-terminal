import React from 'react'
import type { AppProps } from 'next/app'
import LoginPage from './login'

import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
