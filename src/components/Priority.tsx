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
}>({
  priority: Priority.low,
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

const descriptions = {
  [Priority.low]:
    'A non-urgent bug, this bug does not effect core functionality of the product.',
  [Priority.medium]:
    'This bug effects functionality but on a non-core user journey.',
  [Priority.high]:
    'This bug is causing core-functionality problems but not breaking the product.',
  [Priority.critical]: 'The product can not function with this bug.',
}

export const PriorityRadio = ({ value }: PriorityProps): JSX.Element => {
  const { priority, setPriority } = useContext(PriorityContext)

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
