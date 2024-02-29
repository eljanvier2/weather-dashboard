import '@/styles/globals.css'
import '@/styles/weatherpage.css'
import '@/styles/weeklyforecast.css'
import '@/styles/othercities.css'
import type { AppProps } from 'next/app'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import React from 'react'

export default function App ({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
      <SpeedInsights />
    </>
  )
}
