import { styled } from 'lib/style'

export const Link = styled('a', {
  position: 'relative',

  textDecoration: 'none',

  transition: 'background-size $smooth',

  backgroundRepeat: 'no-repeat',
  backgroundPosition: '100% 105%',

  outline: 'none',

  '&:focus-visible': {
    boxShadow: '$focus',
  },

  '@hover': {
    cursor: 'pointer',

    '&:hover': {
      backgroundPosition: '0% 100%',
    },
  },

  variants: {
    color: {
      subtle: {
        color: '$foreground',
        backgroundImage:
          'linear-gradient(hsla($foreground, 0.3), hsla($foreground, 0.3))',
      },
      accent: {
        color: '$accent',
        backgroundImage: 'linear-gradient($accent, $accent)',
      },
    },
    thickness: {
      sm: {
        backgroundSize: '100% $space$2',

        '@hover': {
          '&:hover': {
            backgroundSize: '0 $space$2',
          },
        },
      },
      md: {
        backgroundSize: '100% $sizes$4',

        '@hover': {
          '&:hover': {
            backgroundSize: '0 $space$4',
          },
        },
      },
    },
  },

  defaultVariants: {
    thickness: 'sm',
    color: 'subtle',
  },
})
