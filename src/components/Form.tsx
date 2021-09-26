import { ChangeEvent, useState } from 'react'

import { Box, Text, Input, Label, Link, Select, Stack, Button } from 'UI'
import { useStore } from 'lib/store'

import { Priority, PriorityContext, PriorityRadio } from './Priority'

type FormProps = {
  onAddTeam: () => void
  onSuccess: () => void
}
export const Form = ({
  onAddTeam,
  onSuccess,
}: FormProps): JSX.Element | null => {
  const user = useStore((state) => state.user)
  const teams = useStore((state) => state.teams)
  const [selectedTeam, selectTeam] = useStore((state) => [
    state.selectedTeam,
    state.selectTeam,
  ])

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [steps, setSteps] = useState('')
  const [technical, setTechnical] = useState('')
  const [priority, setPriority] = useState<Priority>(Priority.low)

  const isValid =
    !!user &&
    !!selectedTeam &&
    !!title &&
    !!description &&
    !!steps &&
    !!technical &&
    !!priority

  const handleSubmit = async () => {
    if (!isValid) return

    try {
      setLoading(true)
      setError(false)

      const res = await fetch('/api/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          author: user,
          team: selectedTeam,
          title,
          description,
          steps,
          technical,
          priority,
        }),
      })

      if (res.ok) {
        return onSuccess()
      }

      throw new Error('Failed to create ticket')
    } catch (error) {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  if (teams.length === 0) {
    return null
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        handleSubmit()
      }}
    >
      <Stack
        direction="vertical"
        spacing="$40"
        css={{ alignItems: 'stretch', my: '$32' }}
      >
        <Box>
          <Label htmlFor="team" required>
            Team
          </Label>
          <Select
            name="team"
            id="team"
            value={selectedTeam || 'no-team'}
            onChange={(e) => {
              if (teams.some((team) => team.code === e.currentTarget.value)) {
                selectTeam(e.currentTarget.value)
              }
            }}
          >
            <option disabled value="no-team">
              Select a team
            </option>
            {teams.map((team) => (
              <option key={team.code} value={team.code}>
                {team.label}
              </option>
            ))}
          </Select>
          <Link
            color="subtle"
            role="button"
            tabIndex={0}
            css={{ display: 'inline-block', mt: '$8' }}
            onClick={() => {
              onAddTeam()
            }}
          >
            Add another team
          </Link>
        </Box>

        <Box>
          <Label htmlFor="title" required>
            Title
          </Label>
          <Input
            name="title"
            id="title"
            placeholder="Issue title"
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
          />
        </Box>

        <Box>
          <Label htmlFor="description" required>
            Description
          </Label>
          <Text as="p" css={{ color: '$secondary', mb: '$8' }}>
            Try to be as descriptive as possible.
          </Text>
          <Input
            as="textarea"
            rows={3}
            name="description"
            id="description"
            placeholder="Issue description"
            value={description}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setDescription(e.currentTarget.value)
            }
          />
        </Box>

        <Box>
          <Label htmlFor="steps" required>
            Steps to reproduce
          </Label>
          <Text as="p" css={{ color: '$secondary', mb: '$8' }}>
            Detailed instructions on how to reproduce this issue
          </Text>
          <Input
            as="textarea"
            rows={3}
            name="steps"
            id="steps"
            placeholder="Describe the steps to reproduce"
            value={steps}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setSteps(e.currentTarget.value)
            }
          />
        </Box>

        <Box>
          <Label htmlFor="technical" required>
            Technical Information
          </Label>
          <Text as="p" css={{ color: '$secondary', mb: '$8' }}>
            Your Operating System, Browser, Device, etc.
          </Text>
          <Input
            as="textarea"
            rows={3}
            name="technical"
            id="technical"
            placeholder="Add some technical Information"
            value={technical}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setTechnical(e.currentTarget.value)
            }
          />
        </Box>

        <Box>
          <Label htmlFor="priority" required>
            Priority
          </Label>

          <PriorityContext.Provider value={{ priority, setPriority }}>
            <Box>
              <PriorityRadio value={Priority.low} />
              <PriorityRadio value={Priority.medium} />
              <PriorityRadio value={Priority.high} />
              <PriorityRadio value={Priority.critical} />
            </Box>
          </PriorityContext.Provider>
        </Box>
      </Stack>

      {error && (
        <Text as="p" size="xs" css={{ mb: '$24', color: '$accent' }}>
          Something went wrong. Please try again or contact us.
        </Text>
      )}

      <Button css={{ mb: '$80' }} type="submit" disabled={!isValid || loading}>
        {loading ? 'Creating ticket...' : 'Create ticket'}
      </Button>
    </form>
  )
}
