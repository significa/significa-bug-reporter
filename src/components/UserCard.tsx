import { useEffect, useState } from 'react'

import { useStore } from 'lib/store'

export const UserCard = (): JSX.Element | null => {
  const [loggingOut, setLoggingOut] = useState(false)
  const user = useStore((state) => state.user)
  const logout = useStore((state) => state.logout)

  useEffect(
    function autoCancel() {
      let timeout: NodeJS.Timeout
      if (loggingOut) {
        timeout = setTimeout(() => {
          setLoggingOut(false)
        }, 2000)
      }

      return () => {
        clearTimeout(timeout)
      }
    },
    [loggingOut]
  )

  if (!user) return null

  return (
    <div>
      <p>Reporting as</p>
      <h2>{user}</h2>
      {!loggingOut ? (
        <button
          onClick={(e) => {
            e.preventDefault()
            setLoggingOut(true)
          }}
        >
          Log out
        </button>
      ) : (
        <button
          onClick={() => {
            logout()
          }}
        >
          Are you sure? Click to continue
        </button>
      )}
    </div>
  )
}
