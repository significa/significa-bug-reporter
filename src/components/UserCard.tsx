import { useState } from 'react'

import { Box, Link, Text } from 'UI'
import { useStore } from 'lib/store'
import { greenTheme } from 'lib/style'

export const UserCard = (): JSX.Element | null => {
  const [loggingOut, setLoggingOut] = useState(false)
  const user = useStore((state) => state.user)
  const logout = useStore((state) => state.logout)

  if (!user) return null

  return (
    <Box
      className={greenTheme.toString()}
      css={{
        background: '$background',
        color: '$foreground',
        p: '$24',
        borderRadius: '$md',
      }}
    >
      <Text size="sm" fontWeight="medium" css={{ color: '$offset', mb: '$4' }}>
        Reporting as
      </Text>
      <Text size="lg" fontWeight="medium">
        {user}
      </Text>
      <Text size="sm" fontWeight="medium" css={{ mt: '$24' }}>
        {!loggingOut ? (
          <Link
            href="#"
            color="subtle"
            onClick={(e) => {
              e.preventDefault()
              setLoggingOut(true)
            }}
          >
            Log out
          </Link>
        ) : (
          <Link
            onMouseLeave={(e) => {
              e.preventDefault()
              setLoggingOut(false)
            }}
            href="#"
            color="subtle"
            onClick={() => {
              logout()
            }}
          >
            Click to confirm
          </Link>
        )}
      </Text>
    </Box>
  )
}
