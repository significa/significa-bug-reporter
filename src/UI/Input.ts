import { styled } from 'lib/style'

export const inputStyle = {
  appearance: 'none',
  boxShadow: 'none',

  accentColor: '$accent',

  border: 'none',
  borderBottom: '1px solid hsla($foreground, 0.2)',
  p: '$8 $12',
  borderRadius: '$sm',

  width: '100%',

  backgroundColor: 'hsla($foreground, 0.05)',
  borderTopRightRadius: '$md',
  borderTopLeftRadius: '$md',

  color: '$foreground',
  fontFamily: '$sans',
  fontSize: '$sm',
  lineHeight: '$normal',
  fontWeight: '$normal',

  resize: 'vertical',

  transition: 'all $appearance',

  '&::placeholder': {
    color: 'hsla($foreground, 0.4)',
  },

  '@hover': {
    '&:hover:enabled': {
      borderBottomColor: 'hsla($foreground, 0.4)',
    },
  },

  '&:focus': {
    outline: 'none',
  },

  '&:disabled': {
    opacity: 0.5,
    borderBottomStyle: 'dashed',
  },

  '&:focus-visible': {
    boxShadow: '$focus',
    borderBottomColor: 'hsla($foreground, 0)',
  },

  variants: {
    error: {
      true: {
        borderBottomColor: '$accent',

        '@hover': {
          '&:hover:enabled': {
            borderBottomColor: '$accent',
          },
        },
      },
    },
  },
} as const

export const Input = styled('input', inputStyle)
