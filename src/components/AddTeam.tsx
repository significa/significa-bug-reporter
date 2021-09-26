import { useMemo, useState } from 'react'

import { Text, Box, Button, Flex, Input, Label, Modal, Stack } from 'UI'
import { useStore } from 'lib/store'

type AddTeamProps = {
  onAdd: (team: { code: string; label: string }) => void
  onCancel: () => void
}

export const AddTeam = ({ onCancel, onAdd }: AddTeamProps): JSX.Element => {
  const [code, setCode] = useState('')
  const [label, setLabel] = useState('')
  const teams = useStore((state) => state.teams)
  const teamAlreadyThere = useMemo(() => {
    return teams.some((team) => team.code === code)
  }, [code, teams])
  const isValidCode = false
  const isValid =
    !teamAlreadyThere && code.length > 0 && label.length > 0 && isValidCode

  /**
   * TODO: Validate team code
   * On code paste, check if team exists and load appropriate data.
   * Pre-fill team label with team name.
   *
   * Only allow to submit when data was successfully loaded.
   */

  return (
    <Modal isOpen onClose={onCancel} css={{ p: '$24' }}>
      <Text size="lg" fontWeight="medium">
        Add team
      </Text>

      <Text size="sm" lineHeight="normal" css={{ mt: '$8', mb: '$24' }}>
        Paste in the code provided and add a label so you can easily identify
        this team. This label is only for you.
      </Text>
      <Stack direction="vertical" spacing="$24" css={{ alignItems: 'stretch' }}>
        <Box>
          <Label htmlFor="code" required>
            Code
          </Label>
          <Input
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
            error={teamAlreadyThere}
            id="code"
            type="text"
            placeholder="Paste in the code"
            value={code}
            onChange={(e) => setCode(e.currentTarget.value)}
          />
          {teamAlreadyThere && (
            <Text size="xs" css={{ mt: '$8', color: '$accent' }}>
              Team already exists
            </Text>
          )}
        </Box>
        <Box>
          <Label htmlFor="label" required>
            Label
          </Label>
          <Input
            disabled={!isValidCode}
            id="label"
            type="text"
            placeholder="Type in a label so you can identify this team"
            value={label}
            onChange={(e) => setLabel(e.currentTarget.value)}
          />
        </Box>
      </Stack>
      <Flex css={{ mt: '$32' }}>
        <Button disabled={!isValid} onClick={() => onAdd({ code, label })}>
          Add team
        </Button>
        <Button variant="secondary" onClick={onCancel} css={{ ml: '$16' }}>
          Cancel
        </Button>
      </Flex>
    </Modal>
  )
}
