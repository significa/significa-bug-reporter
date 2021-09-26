import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'
import Head from 'next/head'

import { globalStyles } from 'UI'
import { darkTheme, lightTheme } from 'lib/style'

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  globalStyles()

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <ThemeProvider
        storageKey="bug-reporter-theme"
        value={{ light: lightTheme.toString(), dark: darkTheme.toString() }}
        attribute="class"
        disableTransitionOnChange
      >
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

export default App
