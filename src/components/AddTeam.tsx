import { useCallback, useEffect, useMemo, useState } from 'react'

import { Text, Box, Button, Flex, Input, Label, Modal, Stack } from 'UI'
import { useDebounce } from 'common/hooks/useDebounce'
import { usePrevious } from 'common/hooks/usePrevious'
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

  const { valid, validating } = useValidate({
    code,
    setLabel,
    skip: teamAlreadyThere,
  })

  const isValid =
    !validating &&
    !teamAlreadyThere &&
    code.length > 0 &&
    label.length > 0 &&
    !!valid

  let error: string | null = null
  if (teamAlreadyThere) {
    error = 'Team already exists'
  }
  if (valid === false) {
    error = 'Invalid code'
  }

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
            error={!!error}
            id="code"
            type="text"
            placeholder="Paste in the code"
            value={code}
            onChange={(e) => setCode(e.currentTarget.value)}
          />
          {validating ? (
            <Text size="xs" css={{ mt: '$8', color: '$secondary' }}>
              Validating code
            </Text>
          ) : (
            <>
              {error ? (
                <Text size="xs" css={{ mt: '$8', color: '$accent' }}>
                  {error}
                </Text>
              ) : (
                <Text size="xs" css={{ mt: '$8', color: '$secondary' }}>
                  Paste code to validate
                </Text>
              )}
            </>
          )}
        </Box>
        <Box>
          <Label htmlFor="label" required>
            Label
          </Label>
          <Input
            disabled={!valid}
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

const useValidate = ({
  code,
  setLabel,
  skip,
}: {
  code: string
  setLabel: (label: string) => void
  skip: boolean
}) => {
  const [valid, setValid] = useState<undefined | boolean>()
  const [validating, setValidating] = useState(false)
  const debouncedCode = useDebounce(code)
  const prevCode = usePrevious(debouncedCode)

  const checkCode = useCallback(async () => {
    if (!debouncedCode || skip || debouncedCode === prevCode) {
      return setValid(undefined)
    }

    setValidating(true)
    try {
      const res = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: debouncedCode }),
      })
      if (!res.ok) {
        throw new Error('Invalid code')
      }

      setValid(true)
      const json = await res.json()

      if (json.name) setLabel(json.name)
    } catch (error) {
      setValid(false)
    } finally {
      setValidating(false)
    }
  }, [debouncedCode, prevCode, setLabel, skip])

  useEffect(() => {
    checkCode()
  }, [checkCode])

  return { valid, validating }
}
