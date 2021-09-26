import { globalCss } from 'lib/style'

export const globalStyles = globalCss({
  html: {
    boxSizing: 'border-box',
    textRendering: 'geometricPrecision',
    fontSmooth: 'auto',
    webkitFontSmoothing: 'antialiased',
  },
  '*, *:before, *:after': {
    boxSizing: 'inherit',
  },
  'body, h1, h2, h3, h4, h5, h6, p, ol, ul, figure': {
    margin: 0,
    padding: 0,
    fontWeight: 'normal',
  },
  'ul, li': {
    listStyle: 'none',
  },
  'img, figure': {
    width: '100%',
    height: 'auto',
  },
  'body, button, input': {
    fontFamily: '$sans',
  },
  body: {
    color: 'hsl($foreground)',
    backgroundColor: 'hsl($background)',
  },
  '::selection': {
    color: 'hsla($foreground, 80%)',
    backgroundColor: '$muted',
  },
})
