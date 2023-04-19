import { browser } from '$app/environment';
import { writable } from 'svelte/store';
import type { Team } from '../linear';
import { toast } from '@significa/svelte-ui';

const getDefaultTeams = () => {
  if (browser) {
    const localStoreTeams = window.localStorage.getItem('linear-teams');

    if (localStoreTeams) {
      try {
        JSON.parse(localStoreTeams);
      } catch (e) {
        throw new Error();
      }

      const parsedTeams = JSON.parse(localStoreTeams);

      if (Array.isArray(parsedTeams)) {
        return parsedTeams;
      } else {
        throw new Error();
      }
    }
  }
  return [];
};

const createTheme = () => {
  const { subscribe, update } = writable<Team[]>(getDefaultTeams());

  return {
    subscribe,
    fetch: async (code: string) => {
      const res = await fetch(`/api/teams?key=${code}`);
      const data = await res.json();

      if (res.status === 200) {
        update((value) => [...value, data]);
        toast.success({
          message: 'Team successfully added.'
        });
        return;
      }

      if (res.status === 404) {
        toast.error({
          message: data.message,
          description:
            'Please verify if the code that you are inserting is the correct one and try again.',
          timeout: 0
        });
        return null;
      }

      toast.error({
        message: 'Server Error',
        description: 'Something went wrong, please try again.',
        timeout: 0
      });
    },
    clearStore: () => update(() => [])
  };
};

export const linearTeams = createTheme();

linearTeams.subscribe(($linearTeams) => {
  if (browser) {
    window.localStorage.setItem('linear-teams', JSON.stringify($linearTeams));
  }
});
