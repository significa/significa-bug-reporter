import create from 'zustand'
import { persist } from 'zustand/middleware'

type Team = { label: string; code: string }
type StoreState = {
  user: null | string
  teams: Team[]
  selectedTeam: string | null
  login: (name: string) => void
  logout: () => void
  addTeam: (team: Team) => void
  selectTeam: (code: string) => void
  removeTeam: (code: string) => void
}

export const useStore = create<StoreState>(
  persist(
    (set) => ({
      user: null,
      teams: [],
      selectedTeam: null,
      login: (name: string) => {
        set(() => ({ user: name }))
      },
      logout: () => {
        set(() => ({ user: null, teams: [], selectedTeam: null }))
      },
      addTeam: (team: Team) => {
        set((state) => ({
          teams: [...state.teams.filter((t) => t.code !== team.code), team],
          selectedTeam: team.code,
        }))
      },
      selectTeam: (code: string) => {
        set(() => ({ selectedTeam: code }))
      },
      removeTeam: (code: string) => {
        set((state) => {
          let selectedTeam: StoreState['selectedTeam'] = state.selectedTeam

          // If the team being removed is the selected one, select the first team
          if (selectedTeam && selectedTeam === code) {
            selectedTeam = state.teams.length > 0 ? state.teams[0].code : null
          }

          return {
            teams: state.teams.filter((team) => team.code !== code),
            selectedTeam: null,
          }
        })
      },
    }),
    {
      name: '_significa_bug_reporter_',
    }
  )
)
