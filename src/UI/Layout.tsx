import { space, styled, CSS } from 'lib/style'

export const Box = styled('div', {})

export const Flex = styled('div', {
  display: 'flex',
})

export const Container = styled('div', {
  flexShrink: 0,
  width: '100%',

  mx: 'auto',
  px: '$24',

  '@md': {
    px: '$32',
  },

  '@lg': {
    px: '$48',
  },

  variants: {
    variant: {
      narrow: {
        maxWidth: '40rem',
      },
      wide: {
        maxWidth: '105rem',
      },
      full: {
        maxWidth: 'none',
      },
    },
  },

  defaultVariants: {
    variant: 'narrow',
  },
})

type WrapProps = React.ComponentProps<typeof StyledWrap> & {
  gap?: `$${keyof typeof space}`
}
export const Wrap = ({ css, gap = '$8', ...props }: WrapProps): JSX.Element => {
  return <StyledWrap css={{ $$wrapGap: `$space${gap}`, ...css }} {...props} />
}

const StyledWrap = styled('div', {
  display: 'inline-flex',
  flexWrap: 'wrap',
  margin: 'calc(-1 * $$wrapGap) 0 0 calc(-1 * $$wrapGap)',
  width: 'calc(100% + $$wrapGap)',

  '> *': {
    margin: '$$wrapGap 0 0 $$wrapGap',
  },
})

export const FlexCenter = styled('div', {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
})

type Direction = 'vertical' | 'horizontal'

type SpaceKey = `$${keyof typeof space}`

const spaceChildren = (
  direction: Direction,
  spacing: `$${keyof typeof space}`
) => {
  return {
    '& > *:not(:last-child)':
      direction === 'horizontal'
        ? {
            marginRight: spacing,
            marginBottom: 'unset',
          }
        : {
            marginBottom: spacing,
            marginRight: 'unset',
          },
  }
}

export const Stack = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',

  variants: {
    direction: {
      horizontal: {
        flexDirection: 'row',
      },
      vertical: {
        flexDirection: 'column',
      },
    },
    spacing: Object.fromEntries(
      Object.entries(space).map(([key]) => [`${key}`, {}])
    ) as Record<SpaceKey, CSS>,
  },

  compoundVariants: [
    ...Object.keys(space).map((key) => ({
      direction: 'horizontal' as const,
      spacing: `$${key}` as SpaceKey,
      css: spaceChildren('horizontal', `$${key}` as SpaceKey),
    })),
    ...Object.keys(space).map((key) => ({
      direction: 'vertical' as const,
      spacing: `$${key}` as SpaceKey,
      css: spaceChildren('vertical', `$${key}` as SpaceKey),
    })),
  ],

  defaultVariants: {
    direction: 'horizontal',
    spacing: '$8',
  },
})
