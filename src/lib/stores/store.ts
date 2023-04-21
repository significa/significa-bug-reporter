import { writable } from 'svelte/store';

type BugReporter = {
  userName: string | null;
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
        return { ...prev, userName: user };
      })
  };
};

export const bugStore = createBugReporter();

bugStore.subscribe(($bug) => {
  if (isBrowser) {
    window.localStorage.setItem('bug-reporter', JSON.stringify($bug));
  }
});
