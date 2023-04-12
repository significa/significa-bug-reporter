import { browser } from '$app/environment';
import { writable } from 'svelte/store';

type Team = {
    id: string;
    name: string
}
type BugReporter = {
    userName: string;
    teams: Team[]
}
const getFromLocalStorage = (): BugReporter | undefined => {
  if (browser) {
    const bugReporter = window.localStorage.getItem('bug-reporter');
    if (bugReporter !== undefined && bugReporter !== null) {
      return JSON.parse(bugReporter);
    }
}
};

const createBugReporter = () => {
  const { subscribe, update } = writable<BugReporter>(getFromLocalStorage());

  return {
    subscribe,
    setUser: (user: string) => update((prev) => {return {user, ...prev}	}),
    //setTeams: (teams: Team[]) => update((prev) => {return {teams, ...prev}}),
  };
};

export const bug = createBugReporter();

bug.subscribe(($bug) => {
  if (browser) {
    window.localStorage.setItem('bug-reporter', JSON.stringify($bug));
  }
});