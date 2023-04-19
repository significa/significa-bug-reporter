import { browser } from '$app/environment';
import { writable } from 'svelte/store';

import { toast } from '@significa/svelte-ui';
import { TeamSchema, type Team } from '$lib/zodSchema';

const getDefaultTeams = () => {
  try {
    if (browser) {
      const localStoreTeams = window.localStorage.getItem('linear-teams');

      if (localStoreTeams) {
        const parsedLocalStorage = JSON.parse(localStoreTeams);

        // zod validation
        const teams = TeamSchema.array().parse(parsedLocalStorage);
        return teams;
      }
    }
  } catch (err) {
    console.error(err);
  }
  // will return default state
  return [];
};

const createTheme = () => {
  const { subscribe, update } = writable<Team[]>(getDefaultTeams());

  return {
    subscribe,
    fetch: async (code: string) => {
      try {
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
      } catch (e) {
        throw new Error();
      }
    },
    clearStore: () => update(() => []),
    updateSore: (team: Team) =>
      update((prev) => {
        const exists = prev.find((val) => val.id === team.id);
        if (exists) {
          return [...prev];
        }
        return [...prev, team];
      })
  };
};

export const linearTeams = createTheme();

linearTeams.subscribe(($linearTeams) => {
  if (browser) {
    window.localStorage.setItem('linear-teams', JSON.stringify($linearTeams));
  }
});
