import { styled } from 'lib/style'

export const Link = styled('a', {
  position: 'relative',

  textDecoration: 'none',

  transition: 'background-size $smooth',

  backgroundRepeat: 'no-repeat',
  backgroundPosition: '100% 100%',

  '@hover': {
    '&:hover': {
      backgroundPosition: '0% 100%',
    },
  },

  variants: {
    color: {
      subtle: {
        color: '$foreground',
        backgroundImage: 'linear-gradient($offset, $offset)',
      },
      accent: {
        color: '$accent',
        backgroundImage: 'linear-gradient($accent, $accent)',
      },
    },
    thickness: {
      sm: {
        backgroundSize: '0 $space$2',

        '@hover': {
          '&:hover': {
            backgroundSize: '100% $space$2',
          },
        },
      },
      md: {
        backgroundSize: '0 $sizes$4',

        '@hover': {
          '&:hover': {
            backgroundSize: '100% $space$4',
          },
        },
      },
    },
  },

  defaultVariants: {
    thickness: 'sm',
    color: 'accent',
  },
})

export const SubtleLink = styled('a', {
  textDecoration: 'none',

  color: '$foreground',
  transition: 'color $appearance',

  '@hover': {
    '&:hover': {
      color: '$accent',
    },
  },
})
