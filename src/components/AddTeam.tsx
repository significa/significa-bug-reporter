import { useState } from 'react'

type AddTeamProps = {
  onAdd: (team: { code: string; label: string }) => void
  onCancel: () => void
}

export const AddTeam = ({ onCancel, onAdd }: AddTeamProps): JSX.Element => {
  const [code, setCode] = useState('')
  const [label, setLabel] = useState('')

  /**
   * TODO: Validate team code
   * On code paste, check if team exists and load appropriate data.
   * Pre-fill team label with team name.
   *
   * Only allow to submit when data was successfully loaded.
   */

  return (
    <div>
      <h2>Add team</h2>
      <p>
        Paste in the code provided and add a label so you can easily identify
        this team
      </p>
      <label htmlFor="code">Code</label>
      <input
        id="code"
        type="text"
        placeholder="Paste in the code"
        value={code}
        onChange={(e) => setCode(e.currentTarget.value)}
      />
      <label htmlFor="label">Label</label>
      <input
        id="label"
        type="text"
        placeholder="Type in a label so you can identify this team"
        value={label}
        onChange={(e) => setLabel(e.currentTarget.value)}
      />
      <button onClick={() => onAdd({ code, label })}>Add team</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  )
}
