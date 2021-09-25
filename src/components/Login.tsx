import { useState } from 'react'

import { useStore } from 'lib/store'

export const Login = (): JSX.Element => {
  const [name, setName] = useState('')
  const login = useStore((state) => state.login)

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        login(name)
      }}
    >
      <label htmlFor="name">Start by telling us your name</label>
      <input
        type="text"
        id="name"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.currentTarget.value)}
      />
      <button type="submit" disabled={name.length < 2}>
        Continue
      </button>
    </form>
  )
}
