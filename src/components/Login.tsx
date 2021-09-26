import { useState } from 'react'

import { Box, Button, Input, Label, Text } from 'UI'
import { useStore } from 'lib/store'

export const Login = (): JSX.Element => {
  const [name, setName] = useState('')
  const login = useStore((state) => state.login)

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()

        if (name.length >= 2) login(name)
      }}
    >
      <Box
        css={{
          border: '1px dashed $muted',
          p: '$24',
          borderRadius: '$md',
        }}
      >
        <Text as="h2" size="xxl" fontWeight="medium">
          G&apos;day
        </Text>
        <Text lineHeight="normal" css={{ my: '$16' }}>
          You can use this platform to report any issue directly to the team.
          Please try to include as much information as possible.
          <br />
          Ask your Project Manager for your codes to get started.
        </Text>
        <Box css={{ my: '$24' }}>
          <Label htmlFor="name">Start by telling us your name</Label>
          <Input
            type="text"
            id="name"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
          />
        </Box>
        <Button type="submit" disabled={name.length < 2}>
          Continue
        </Button>
      </Box>
    </form>
  )
}
