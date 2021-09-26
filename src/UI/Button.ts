import { styled } from 'lib/style'

export const Button = styled('button', {
  position: 'relative',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  appearance: 'none',
  boxShadow: 'none',
  border: 0,

  cursor: 'pointer',

  fontFamily: '$sans',
  fontSize: '$sm',
  lineHeight: '$none',
  whiteSpace: 'nowrap',
  textDecoration: 'none',

  p: '$12 $16',
  borderRadius: '$sm',

  outline: 'none',

  '&:focus-visible': {
    boxShadow: '$focus',
  },

  '&:disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },

  variants: {
    variant: {
      primary: {
        background: '$foreground',
        color: '$background',

        $$transform: '$space$2',
        $$shadow: '$space$6',
        transition:
          'transform $motion, box-shadow $motion, opacity $appearance',

        '@hover': {
          '&:hover:enabled': {
            outline: 0,
            transform: 'translate(-$$transform, -$$transform)',
            boxShadow: '$$shadow $$shadow 0 0 hsla($colors$foreground, 30%)',
          },
        },

        '&:active:enabled': {
          opacity: 0.8,
          boxShadow: 'unset',
          transform: 'unset',
        },
      },
      secondary: {
        background: '$background',
        color: '$foreground',

        transition:
          'box-shadow $motion, opacity $appearance, background $appearance, color $appearance',

        '@hover': {
          '&:hover:enabled': {
            color: 'hsla($foreground, 0.8)',
          },
        },

        '&:active:enabled': {
          color: 'hsla($foreground, 0.6)',
        },
      },
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
})
