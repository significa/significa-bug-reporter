import { useState } from 'react'

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
        <div>
          <h2>You have no teams</h2>
          <p>
            Ask your Project Manager for your team’s code so you can start
            reporting directly
          </p>
          <button onClick={() => setAddingTeam(true)}>Add Team</button>
        </div>
      ) : (
        <Form onAddTeam={() => setAddingTeam(true)} />
      )}
    </>
  )
}
