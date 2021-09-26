import { forwardRef, SelectHTMLAttributes } from 'react'

import { styled, CSS } from 'lib/style'

import { inputStyle } from './Input'

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  error?: boolean
  css?: CSS
}

const Holder = styled('div', {
  position: 'relative',
})

const StyledSelect = styled('select', inputStyle)

const Svg = styled('svg', {
  position: 'absolute',
  right: '$16',
  top: '50%',
  transform: 'translateY(-50%)',
})

const Chevron = () => {
  return (
    <Svg width={9} height={6} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.071 1L4.536 4.536 1 1" stroke="currentColor" />
    </Svg>
  )
}

export const Select = forwardRef<HTMLSelectElement, Props>(function Select(
  { error, css, ...props },
  ref
) {
  return (
    <Holder css={css}>
      <StyledSelect ref={ref} error={error} {...props} />
      <Chevron />
    </Holder>
  )
})
