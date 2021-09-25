import { useStore } from 'lib/store'

type FormProps = {
  onAddTeam: () => void
}
export const Form = ({ onAddTeam }: FormProps): JSX.Element | null => {
  const teams = useStore((state) => state.teams)
  const [selectedTeam, selectTeam] = useStore((state) => [
    state.selectedTeam,
    state.selectTeam,
  ])

  if (teams.length === 0) {
    return null
  }

  return (
    <form>
      <div>
        <label htmlFor="team">Team</label>
        <select
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
        </select>
        <button type="button" onClick={onAddTeam}>
          Add another team
        </button>
      </div>

      {/* TODO: Rest of form */}

      <button type="submit">Report</button>
    </form>
  )
}
