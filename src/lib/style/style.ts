import {
  createStitches,
  CSS as StitchesCSS,
  PropertyValue,
} from '@stitches/react'

import { colorUtils } from './colorUtils'

const toRem = (px: number) => px / 16 + 'rem'

const palette = {
  white: '0, 0%, 100%',
  black: '0, 0%, 0%',

  gray50: '0, 0%, 98%',
  gray100: '40, 7%, 92%',
  gray200: '45, 6%, 86%',
  gray300: '45, 4%, 80%',
  gray400: '36, 4%, 75%',
  gray500: '20, 2%, 68%',
  gray600: '60, 1%, 60%',
  gray700: '120, 0%, 40%',
  gray800: '240, 1%, 20%',
  gray900: '210, 9%, 9%',

  pink50: '347, 49%, 80%',
  pink100: '345, 66%, 77%',
  pink200: '344, 78%, 73%',
  pink300: '344, 87%, 69%',
  pink400: '343, 94%, 66%',
  pink500: '343, 100%, 62%',
  pink600: '343, 62%, 51%',
  pink700: '343, 57%, 43%',
  pink800: '342, 53%, 35%',
  pink900: '342, 48%, 27%',

  green50: '154, 11%, 71%',
  green100: '154, 15%, 62%',
  green200: '158, 16%, 53%',
  green300: '159, 22%, 44%',
  green400: '159, 34%, 35%',
  green500: '160, 53%, 26%',
  green600: '160, 50%, 23%',
  green700: '161, 47%, 20%',
  green800: '162, 43%, 17%',
  green900: '164, 35%, 14%',
}

const light = {
  background: '$gray50',
  foreground: '$gray800',
  secondary: '$gray600',

  accent: '$pink500',
  muted: '$gray100',
}

const dark = {
  background: '$gray900',
  foreground: '$gray50',
  secondary: '$gray700',

  accent: '$pink500',
  muted: '$gray800',
}

const green = {
  background: '$green500',
  foreground: '$gray50',
  secondary: '$green200',

  accent: '$orange300',
  muted: '$green600',
}

const space = {
  0: '0',
  1: toRem(1),
  2: toRem(2),
  4: toRem(4),
  6: toRem(6),
  8: toRem(8),
  10: toRem(10),
  12: toRem(12),
  14: toRem(14),
  16: toRem(16),
  20: toRem(20),
  24: toRem(24),
  26: toRem(26),
  28: toRem(28),
  32: toRem(32),
  36: toRem(36),
  38: toRem(38),
  40: toRem(40),
  48: toRem(48),
  60: toRem(60),
  64: toRem(64),
  80: toRem(80),
  88: toRem(88),
  128: toRem(128),
} as const

const createSpaceUtil =
  (keys: string[]) => (value: PropertyValue<'margin'>) => {
    return keys.reduce((acc, key) => {
      return {
        ...acc,
        [key]: value,
      }
    }, {})
  }

const stitchesConfig = createStitches({
  theme: {
    colors: {
      ...palette,
      ...light,
    },
    fonts: {
      sans: 'Söhne, -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji',
      mono: 'menlo, monospace',
    },
    fontSizes: {
      xxs: toRem(12),
      xs: toRem(14),
      sm: toRem(16),
      rg: toRem(18),
      md: toRem(20),
      lg: toRem(24),
      xl: `clamp(${toRem(28)}, 5vw, ${toRem(32)})`,
      xxl: `clamp(${toRem(48)}, 8vw, ${toRem(56)})`,
      xxxl: `clamp(${toRem(64)}, 10vw, ${toRem(96)})`,
    },
    fontWeights: {
      normal: '400',
      medium: '600',
    },
    lineHeights: {
      none: '1',
      tighter: '1.15',
      tight: '1.25',
      normal: '1.375',
      loose: '1.5',
    },
    letterSpacings: {
      tighter: '-0.05em',
      tight: '-0.025em',
      none: '0',
      wide: '0.025em',
      wider: '0.05em',
    },
    space,
    sizes: {},
    borderWidths: {
      normal: '1px',
    },
    borderStyles: {
      normal: 'solid',
    },
    radii: {
      none: 0,
      sm: '0.0625rem',
      md: '0.125rem',
      lg: '0.35rem',
      pill: '999999px',
      full: '100%',
    },
    shadows: {
      focus: '0 0 0 3px hsla($colors$foreground, 0.3)',
    },
    transitions: {
      appearance: '0.15s ease',
      motion: '0.3s cubic-bezier(0.20, 1, 0.20, 1)',
      smooth: '0.4s cubic-bezier(0.90, 0, 0.05, 1)',
    },
    zIndices: {
      1: 100,
      2: 200,
      3: 300,
      4: 400,
      max: 999,
    },
  },
  media: {
    sm: '(min-width: 30em)',
    md: '(min-width: 48em)',
    lg: '(min-width: 62em)',
    xl: '(min-width: 80em)',
    xxl: '(min-width: 96em)',
    hover: '(hover: hover)',
  },
  utils: {
    m: createSpaceUtil(['margin']),
    mt: createSpaceUtil(['marginTop']),
    mr: createSpaceUtil(['marginRight']),
    mb: createSpaceUtil(['marginBottom']),
    ml: createSpaceUtil(['marginLeft']),
    mx: createSpaceUtil(['marginLeft', 'marginRight']),
    my: createSpaceUtil(['marginTop', 'marginBottom']),
    p: createSpaceUtil(['padding']),
    pt: createSpaceUtil(['paddingTop']),
    pr: createSpaceUtil(['paddingRight']),
    pb: createSpaceUtil(['paddingBottom']),
    pl: createSpaceUtil(['paddingLeft']),
    px: createSpaceUtil(['paddingLeft', 'paddingRight']),
    py: createSpaceUtil(['paddingTop', 'paddingBottom']),
    size: createSpaceUtil(['width', 'height']),

    ...colorUtils,
  },
})

export { space }

export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
} = stitchesConfig

export type CSS = StitchesCSS<typeof stitchesConfig>

export const darkTheme = createTheme({
  colors: dark,
})

export const lightTheme = createTheme({
  colors: light,
})

export const greenTheme = createTheme({
  colors: green,
})
