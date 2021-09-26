import { styled } from 'lib/style'

export const Text = styled('p', {
  lineHeight: '$none',

  variants: {
    size: {
      xxs: { fontSize: '$xxs' },
      xs: { fontSize: '$xs' },
      sm: { fontSize: '$sm' },
      md: { fontSize: '$md' },
      lg: { fontSize: '$lg' },
      xl: { fontSize: '$xl' },
      xxl: { fontSize: '$xxl' },
      xxxl: { fontSize: '$xxxl' },
    },
    lineHeight: {
      none: { lineHeight: '$none' },
      tighter: { lineHeight: '$tighter' },
      tight: { lineHeight: '$tight' },
      normal: { lineHeight: '$normal' },
      loose: { lineHeight: '$loose' },
    },
    fontWeight: {
      normal: { fontWeight: '$normal' },
      medium: { fontWeight: '$medium' },
    },
    letterSpacing: {
      tighter: { letterSpacing: '$tighter' },
      tight: { letterSpacing: '$tight' },
      none: { letterSpacing: '$none' },
      wide: { letterSpacing: '$wide' },
      wider: { letterSpacing: '$wider' },
    },
  },
})
