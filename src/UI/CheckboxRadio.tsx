import { forwardRef, InputHTMLAttributes } from 'react'

import { styled, CSS } from 'lib/style'

type Props = InputHTMLAttributes<HTMLInputElement> & {
  css?: CSS
}

const Holder = styled('label', {
  boxSizing: 'content-box',
  display: 'flex',
  alignItems: 'center',
  minWidth: 'min-content',

  transition: 'background-color $appearance',

  '@hover': {
    cursor: 'pointer',

    '&:hover': {
      backgroundColor: '$subtle',
    },
  },
})

const Input = styled('input', {
  position: 'absolute',
  opacity: 0,
  zIndex: -1,
  width: 1,
  height: 1,
  overflow: 'hidden',
})

const FakeElement = styled('div', {
  position: 'relative',
  width: '1rem',
  height: '1rem',

  border: '1px solid $secondary',

  transition: 'all $motion',

  '&:after': {
    content: '""',
    position: 'absolute',

    width: 'calc(1rem / 2)',
    height: 'calc(1rem / 2)',

    left: 'calc(1rem / 4)',
    top: 'calc(1rem / 4)',

    backgroundColor: '$accent',
    transform: 'scale(0)',

    transition: 'transform $motion',
  },

  'input:checked ~ &': {
    borderColor: '$accent',

    '&:after': {
      transform: 'scale(1)',
    },
  },

  'input:focus-visible ~ &': {
    borderColor: '$accent',
    boxShadow: '$focus',
  },
})

export const Checkbox = forwardRef<HTMLInputElement, Props>(function Checkbox(
  { children: _, css, ...props },
  ref
) {
  return (
    <Holder css={css}>
      <Input ref={ref} type="checkbox" {...props} />
      <FakeElement
        aria-hidden="true"
        css={{
          borderRadius: '$sm',
          '&:after': { borderRadius: '$xs' },
        }}
      />
    </Holder>
  )
})

export const Radio = forwardRef<HTMLInputElement, Props>(function Checkbox(
  { children: _, css, ...props },
  ref
) {
  return (
    <Holder css={css}>
      <Input ref={ref} type="radio" {...props} />
      <FakeElement
        aria-hidden="true"
        css={{
          borderRadius: '$full',
          '&:after': { borderRadius: '$full' },
        }}
      />
    </Holder>
  )
})
