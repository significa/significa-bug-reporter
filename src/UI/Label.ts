import { styled } from 'lib/style'

export const Label = styled('label', {
  display: 'block',
  fontSize: '$sm',
  fontWeight: '$medium',

  mb: '$8',

  variants: {
    required: {
      true: {
        '&:after': {
          content: ' *',
          color: '$pink500',
        },
      },
    },
  },
})
