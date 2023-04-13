import { writable } from 'svelte/store';

type Team = {
  id: string;
  name: string;
};
type BugReporter = {
  userName: string | null;
  teams: Team[];
};
const isBrowser = typeof window !== 'undefined';

const getFromLocalStorage = (): BugReporter | undefined => {
  if (isBrowser) {
    const bugReporter = window.localStorage.getItem('bug-reporter') || '{}';
    if (bugReporter !== undefined && bugReporter !== null) {
      return JSON.parse(bugReporter);
    }
  }
};

const createBugReporter = () => {
  const { subscribe, update } = writable<BugReporter>(getFromLocalStorage());

  return {
    subscribe,
    setUser: (user: string | null) =>
      update((prev) => {
        return { user, ...prev };
      }),
    setTeams: (team: Team[]) =>
      update((prev) => {
        return { team, ...prev };
      })
  };
};

export const bug = createBugReporter();

bug.subscribe(($bug) => {
  if (isBrowser) {
    window.localStorage.setItem('bug-reporter', JSON.stringify($bug));
  }
});
