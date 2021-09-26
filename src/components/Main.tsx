import { useState } from 'react'

import { Box, Button, Text } from 'UI'
import { useStore } from 'lib/store'

import { AddTeam } from './AddTeam'
import { Form } from './Form'

export const Main = (): JSX.Element => {
  const [addingTeam, setAddingTeam] = useState(false)
  const addTeam = useStore((state) => state.addTeam)
  const teams = useStore((state) => state.teams)

  return (
    <>
      {addingTeam && (
        <AddTeam
          onCancel={() => setAddingTeam(false)}
          onAdd={(team) => {
            addTeam(team)
            setAddingTeam(false)
          }}
        />
      )}
      {teams.length === 0 ? (
        <Box
          css={{
            mt: '$16',
            p: '$24',
            border: '1px dashed $muted',
            borderRadius: '$md',
          }}
        >
          <Text as="h2" size="lg" fontWeight="medium">
            You have no teams
          </Text>
          <Text css={{ mt: '$8', mb: '$24' }} lineHeight="normal">
            Ask your Project Manager for your team&apos;s code so you can start
            reporting any issue directly
          </Text>
          <Button onClick={() => setAddingTeam(true)}>Add Team</Button>
        </Box>
      ) : (
        <Form onAddTeam={() => setAddingTeam(true)} />
      )}
    </>
  )
}
