import { styled } from 'lib/style'

export const Input = styled('input', {
  appearance: 'none',
  boxShadow: 'none',

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
  lineHeight: '$none',
  fontWeight: '$normal',

  transition: 'all $appearance',

  '&::placeholder': {
    color: 'hsla($foreground, 0.4)',
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
    borderBottom: '1px solid hsla($foreground, 0)',
  },

  variants: {
    error: {
      true: {
        borderBottomColor: '$accent',
      },
    },
  },
})
