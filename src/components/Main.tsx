import { useState } from 'react'

import { Box, Button, Text } from 'UI'
import { useStore } from 'lib/store'

import { AddTeam } from './AddTeam'
import { Form } from './Form'

export const Main = (): JSX.Element => {
  const [addingTeam, setAddingTeam] = useState(false)
  const addTeam = useStore((state) => state.addTeam)
  const teams = useStore((state) => state.teams)
  const [success, setSuccess] = useState(false)

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
        <Card
          title="You have no teams"
          description="Ask your Project Manager for your team's code so you can start reporting any issue directly"
          button={{
            label: 'Add Team',
            onClick: () => setAddingTeam(true),
          }}
        />
      ) : (
        <>
          {success ? (
            <Card
              title="Thank you for your report"
              description="Our ticket has been received and will be triaged as soon as possible. Your Project Manager will get in touch if we need more info."
              button={{
                label: 'Create another ticket',
                onClick: () => setSuccess(false),
              }}
            />
          ) : (
            <Form
              onAddTeam={() => setAddingTeam(true)}
              onSuccess={() => setSuccess(true)}
            />
          )}
        </>
      )}
    </>
  )
}

type CardProps = {
  title: string
  description: string
  button: {
    label: string
    onClick: () => void
  }
}

const Card = ({ title, description, button }: CardProps): JSX.Element => {
  return (
    <Box
      css={{
        mt: '$16',
        p: '$24',
        border: '1px dashed $muted',
        borderRadius: '$md',
      }}
    >
      <Text as="h2" size="lg" fontWeight="medium">
        {title}
      </Text>
      <Text css={{ mt: '$8', mb: '$24' }} lineHeight="normal">
        {description}
      </Text>
      <Button onClick={button.onClick}>{button.label}</Button>
    </Box>
  )
}
