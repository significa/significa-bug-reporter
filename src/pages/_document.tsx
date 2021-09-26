import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import React from 'react'

import { getCssText } from 'lib/style'

export default class Document extends NextDocument {
  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          <style
            id="stitches"
            dangerouslySetInnerHTML={{ __html: getCssText() }}
          />
          <link
            rel="preload"
            href="/fonts/Sohne-Buch.woff"
            as="font"
            type="font/woff"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/Sohne-Buch.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/Sohne-Kraftig.woff"
            as="font"
            type="font/woff"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/Sohne-Kraftig.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <style
            dangerouslySetInnerHTML={{
              __html: `
@font-face {
  font-family: 'Söhne';
  font-weight: 400;
  font-display: swap;
  src: url(/fonts/Sohne-Buch.woff2) format('woff2'), url(/fonts/Sohne-Buch.woff) format('woff');
}
@font-face {
  font-family: 'Söhne';
  font-weight: 500;
  font-display: swap;
  src: url(/fonts/Sohne-Kraftig.woff2) format('woff2'), url(/fonts/Sohne-Kraftig.woff) format('woff');
}
`,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
