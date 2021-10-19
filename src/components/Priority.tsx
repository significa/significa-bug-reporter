import { createContext, useContext } from 'react'

import { Box, Flex, Radio, Text } from 'UI'

export enum Priority {
  low = 'low',
  medium = 'medium',
  high = 'high',
  critical = 'critical',
}

export const PriorityContext = createContext<{
  priority: Priority
  setPriority: (value: Priority) => void
  type: 'bug' | 'request'
}>({
  priority: Priority.low,
  type: 'bug',
  setPriority: () => {
    // noop
  },
})

type PriorityProps = {
  value: Priority
}

const labels = {
  [Priority.low]: 'Low',
  [Priority.medium]: 'Medium',
  [Priority.high]: 'High',
  [Priority.critical]: 'Critical',
}

const bugDescriptions = {
  [Priority.low]:
    'A non-urgent bug, this bug does not affect core functionality of the product.',
  [Priority.medium]:
    'This bug affects functionality but on a non-core user journey.',
  [Priority.high]:
    'This bug is causing core-functionality problems but not breaking the product.',
  [Priority.critical]: 'The product can not function with this bug.',
}

const requestDescriptions = {
  [Priority.low]: `A non-urgent request, to be tackled whenever there's time.`,
  [Priority.medium]:
    'This request is important but on a non-core user journey.',
  [Priority.high]:
    'This is a core-functionality request that needs to be tackled as soon as possible.',
  [Priority.critical]: 'The product can not function without this.',
}

export const PriorityRadio = ({ value }: PriorityProps): JSX.Element => {
  const { priority, setPriority, type } = useContext(PriorityContext)

  const descriptions = type === 'bug' ? bugDescriptions : requestDescriptions

  return (
    <Flex
      as="label"
      css={{
        border: '1px dashed $muted',
        borderTop: 0,
        p: '$16',

        '&:first-of-type': {
          borderTop: '1px dashed $muted',
          borderTopLeftRadius: '$md',
          borderTopRightRadius: '$md',
        },

        '&:last-of-type': {
          borderBottomLeftRadius: '$md',
          borderBottomRightRadius: '$md',
        },

        '@hover': {
          cursor: 'pointer',
          transition: 'background-color $appearance',

          '&:hover': { backgroundColor: 'hsla($foreground, 0.02)' },
        },
      }}
    >
      <Radio
        name="priority"
        value={value}
        checked={value === priority}
        onChange={(e) => setPriority(e.currentTarget.value as Priority)}
      />
      <Box css={{ ml: '$16' }}>
        <Text fontWeight="medium">{labels[value]}</Text>
        <Text lineHeight="normal" css={{ color: '$secondary', mt: '$8' }}>
          {descriptions[value]}
        </Text>
      </Box>
    </Flex>
  )
}
