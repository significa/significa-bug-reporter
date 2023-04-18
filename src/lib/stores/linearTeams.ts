import { browser } from '$app/environment';
import { writable } from 'svelte/store';
import type { Team } from '../linear';
import { toast } from '@significa/svelte-ui';

const getDefaultTeams = () => {
  if (browser) {
    const localStoreTeams = window.localStorage.getItem('linear-teams');

    // localStoreTeams ver se existe, JSON.PARSE(localStoreTeams) pode dar erro fazer try catch,
    // verificar se é array se for fazer um map e verificar a estrutura se existe id, name, key
    // zod ???

    if (localStoreTeams) {
      return JSON.parse(localStoreTeams);
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

      if (res.status === 500) {
        toast.error({
          message: data.message,
          description:
            'Please verify if the code that you are inserting is the correct one and try again.',
          timeout: 0
        });
        return null;
      }

      update((value) => [...value, data]);
    }
  };
};

export const linearTeams = createTheme();

linearTeams.subscribe(($linearTeams) => {
  if (browser) {
    window.localStorage.setItem('linear-teams', JSON.stringify($linearTeams));
  }
});
